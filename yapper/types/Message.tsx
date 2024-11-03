export interface Message {
    id: number;
    type: 'received' | 'sent';
    text: string;
    sentences: Sentences[];
    timestamp: string;
    avatar: string;
}

export interface Sentences {
    index: number;
    content: string;
    highlight: boolean;
}