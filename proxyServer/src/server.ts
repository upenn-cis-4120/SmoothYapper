import OpenAI from 'openai';
import express, { Request, Response } from 'express';
import { config as configDotenv } from 'dotenv';
import multer, { StorageEngine } from 'multer';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { tmpdir } from 'os';
import path, { join as pathJoin } from 'path';
import bodyParser from 'body-parser';
import { createClient } from 'redis';
import { v4 as uuidV4 } from 'uuid';

configDotenv();
const app = express();
const port: string | number = process.env.PORT || 3000;
const fileStorage = multer({ storage: multer.memoryStorage() });
const redisClient = createClient({ url: 'redis://localhost:6379' });
redisClient.connect();
const historyRecordLimit = 32;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is required.');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/transcribe', fileStorage.single('audio'), async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file || !file.buffer) {
    res.status(400).send('No file uploaded or no audio data found.');
    return;
  }

  try {
    const tempFilePath = pathJoin(tmpdir(), `upload-${Date.now()}.m4a`);
    await fsPromises.writeFile(tempFilePath, file.buffer);
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
    });

    console.log("Transcription: ", response);
    res.send(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing transcription.');
  }
});

interface ConversationEntry {
  content: string;
  role: 'user' | 'system' | 'assistant';
}

type ConversationHistory = ConversationEntry[];

app.post('/initChat', fileStorage.none() ,async (req: Request, res: Response) => {
  const scnario = req.body.scenario;
  if (!scnario) {
    res.status(400).send('Missing scenario.');
    return;
  } else {
    console.log("Scenario: ", scnario);
  }
  const sessionId = uuidV4();
  const conversationHistory: ConversationHistory = [{ content: scnario, role: 'system' }];
  redisClient.set(sessionId, JSON.stringify(conversationHistory));
  res.json({ sessionId });
});

app.post('/chat', fileStorage.none(), async (req: Request, res: Response) => {
  const sessionId = req.body.sessionId;
  const message = req.body.message;
  if (!sessionId || !message) {
    res.status(400).send('Missing sessionId or message.');
    return;
  }

  const sessionData = await redisClient.get(sessionId);
  if (!sessionData) {
    res.status(400).send('Session not found.');
    return;
  }
  const conversationHistory: ConversationHistory = JSON.parse(sessionData) || [];
  console.log("Conversation history: ", conversationHistory);
  conversationHistory.push({ content: message, role: 'user' });
  
  try {
    const response = await openai.chat.completions.create({
      messages: conversationHistory.map(entry => ({
        role: entry.role,
        content: entry.content,
      })),
      model: 'gpt-4o',
    });

    const aiMessage = response.choices[0].message.content || 'No response from chatGPT.';
    conversationHistory.push({ content: aiMessage, role: 'assistant' });
    while (conversationHistory.length > historyRecordLimit) {
      conversationHistory.shift();
    }

    await redisClient.set(sessionId, JSON.stringify(conversationHistory));
    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing chat.');
  }
});

app.post('/speech', fileStorage.none(), async (req: Request, res: Response): Promise<void> => {
  const files = req.files as Express.Multer.File[];
  if (files && files.length > 0) {
    res.status(400).json({
      error: 'Files not allowed for this endpoint. Please send only JSON data.',
      filesReceived: files.length
    });
    return;
  }
  const textInput = req.body.text;
  if (!textInput) {
    console.log("Request body: ", req.body);
    res.status(400).send('No text input found.');
    return;
  }
  const voice = req.body.voice || 'alloy';
  const responseFormat = req.body.format || 'mp3';
  const speed = req.body.speed || 1.0;
  const model = req.body.model || 'tts-1';
  const test = req.body.test || false;
  const speechFile = path.resolve(`${new Date().toISOString()}_test_speech.mp3`);

  try {
    const response = await openai.audio.speech.create({
      input: textInput,
      voice: voice,
      response_format: responseFormat,
      speed: speed,
      model: model,
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    if (!test) {
      await fsPromises.writeFile(speechFile, buffer);
    }
    res.json({ audio: buffer.toString('base64') });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing speech.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});