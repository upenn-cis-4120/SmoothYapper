interface Topic {
    id: number;
    rank: string;
    thumbnail: string;
    duration: string;
    title: string;
    description: string;
    url: string;
    recommendations: Recommendation[];
  }

  interface Recommendation {
    phrase: string;
    reason: string;
    sampleSentence: string;
  }
  
  const thumbnail1 = require('@/assets/images/Trending1-thumbnail.png');
  const thumbnail2 = require('@/assets/images/Trending2-thumbnail.png');
  const thumbnail3 = require('@/assets/images/Trending3-thumbnail.png');
  const thumbnail4 = require('@/assets/images/Trending4-thumbnail.png');
  const thumbnail5 = require('@/assets/images/Trending5-thumbnail.png');
  
  
  const topics: Topic[] = [
    {
      id: 1,
      rank: "Trending #1",
      thumbnail: thumbnail1, // Replace with actual URL
      duration: "41:20",
      title: "Jack Paul vs. Mike Tyson FIGHT",
      description: "Watch the highlights of Jake Paul’s unanimous decision victory over Mike Tyson...",
      url: "https://www.youtube.com/watch?v=Aja2KfuoqGA",
      recommendations: [
        {
          phrase: "Did you catch the fight?",
          reason: "A casual and engaging way to start a conversation about the event.",
          sampleSentence: "Did you catch the fight? Tyson looked incredible out there!",
        },
        {
          phrase: "Jake Paul vs. Mike Tyson, wild right?",
          reason: "An intriguing comment to spark curiosity and invite thoughts.",
          sampleSentence: "Jake Paul vs. Mike Tyson, wild right? What did you think of the matchup?",
        },
        {
          phrase: "Tyson still packs a punch.",
          reason: "Highlights Tyson's legendary skills while encouraging further discussion.",
          sampleSentence: "Tyson still packs a punch. Did you see that second-round hit?",
        },
        {
          phrase: "Jake Paul’s really climbing up.",
          reason: "Acknowledges Jake Paul’s progression in boxing, which can lead to further discussion.",
          sampleSentence: "Jake Paul’s really climbing up. He’s not backing down from these big names.",
        },
        {
          phrase: "That was a packed arena!",
          reason: "Focuses on the fight’s atmosphere, inviting the other person to talk about the event's energy.",
          sampleSentence: "That was a packed arena! The energy must have been insane!",
        },
    ]
    },
    {
      id: 2,
      rank: "Trending #2",
      thumbnail: thumbnail2, // Replace with actual URL
      duration: "51:20",
      title: "Man. City vs. Sparta Praha: Extended Highlights",
      description: "Man. City battles it out in an exciting match.",
      url: "https://www.youtube.com/watch?v=Et5dJgBeJRY",
      recommendations: [
        {
          phrase: "Did you see Haaland's backheel goal?",
          reason: "Highlights a standout moment, prompting discussion.",
          sampleSentence: "Did you see Haaland's backheel goal? That was pure class!",
        },
        {
          phrase: "City's defense was rock solid.",
          reason: "Acknowledges the team's strong defensive performance.",
          sampleSentence: "City's defense was rock solid. Sparta Praha couldn't break through at all.",
        },
        {
          phrase: "Foden's early goal set the tone.",
          reason: "Recognizes the impact of an early lead.",
          sampleSentence: "Foden's early goal set the tone for the match. It put City in control right from the start.",
        },
        {
          phrase: "Sparta's keeper had a tough night.",
          reason: "Comments on the goalkeeper's challenging game.",
          sampleSentence: "Sparta's keeper had a tough night. City was relentless with their attacks.",
        },
        {
          phrase: "Guardiola's tactics were spot on.",
          reason: "Praises the manager's effective strategy.",
          sampleSentence: "Guardiola's tactics were spot on. The team executed the game plan perfectly.",
        },
      ],
    },
    {
      id: 3,
      rank: "Trending #3",
      thumbnail: thumbnail3, // Replace with actual URL
      duration: "12:34",
      description: "Got injured in an accident? You could be one  click away from a claim...",
      title: "Is Being Fact a Choice?",
      url: "https://www.youtube.com/watch?v=u4gEBRSKi2E",
      recommendations: [
        {
          phrase: "The discussion was eye-opening.",
          reason: "Acknowledges the depth of the conversation.",
          sampleSentence: "The discussion was eye-opening. It made me rethink some of my own beliefs.",
        },
        {
          phrase: "Both sides had valid points.",
          reason: "Recognizes the value in diverse perspectives.",
          sampleSentence: "Both sides had valid points. It's important to consider different experiences.",
        },
        {
          phrase: "The personal stories were impactful.",
          reason: "Highlights the emotional aspect of the dialogue.",
          sampleSentence: "The personal stories were impactful. They added a real human element to the debate.",
        },
        {
          phrase: "It's a complex issue with no easy answers.",
          reason: "Acknowledges the multifaceted nature of the topic.",
          sampleSentence: "It's a complex issue with no easy answers. There's so much to consider.",
        },
        {
          phrase: "The conversation was respectful and insightful.",
          reason: "Appreciates the manner in which the discussion was conducted.",
          sampleSentence: "The conversation was respectful and insightful. It's refreshing to see such civil discourse.",
        },
      ],
      
    },
    {
      id: 4,
      rank: "Trending #4",
      thumbnail: thumbnail4, // Replace with actual URL
      duration: "2:46",
      title: "squabble up",
      description: "Kendrick Lamar “GNX” is available now: https://my-gnx.com/.",
      url: "https://www.youtube.com/watch?v=fuV4yQWdn_4",
      recommendations: [
        {
          phrase: "Kendrick's new track is fire.",
          reason: "Expresses enthusiasm for the song, inviting agreement or discussion.",
          sampleSentence: "Kendrick's new track is fire. Have you heard 'squabble up' yet?",
        },
        {
          phrase: "The beat in 'squabble up' is infectious.",
          reason: "Highlights the song's production quality, prompting conversation about its musical elements.",
          sampleSentence: "The beat in 'squabble up' is infectious. I can't get it out of my head!",
        },
        {
          phrase: "Kendrick's lyrics are always on point.",
          reason: "Praises the artist's lyrical prowess, encouraging discussion about the song's message.",
          sampleSentence: "Kendrick's lyrics are always on point. 'squabble up' is no exception.",
        },
        {
          phrase: "The music video for 'squabble up' is visually stunning.",
          reason: "Comments on the video's aesthetics, opening up a conversation about its artistic direction.",
          sampleSentence: "The music video for 'squabble up' is visually stunning. Did you catch all the symbolism?",
        },
        {
          phrase: "Kendrick never disappoints with his releases.",
          reason: "Expresses consistent admiration for the artist, inviting others to share their opinions.",
          sampleSentence: "Kendrick never disappoints with his releases. 'squabble up' is another hit.",
        },
      ],
    },
    {
      id: 5,
      rank: "Trending #5",
      thumbnail: thumbnail5, // Replace with actual URL
      duration: "1:47",
      title: "Squid Game: Season 2 | Official Trailer | Netflix",
      description: "Let the new games begin. Squid Game Season 2 arrives December 26.",
      url: "https://www.youtube.com/watch?v=Ed1sGgHUo88",
      recommendations: [
        {
          phrase: "Did you catch the new Squid Game teaser?",
          reason: "Initiates conversation about the latest release.",
          sampleSentence: "Did you catch the new Squid Game teaser? It looks intense!",
        },
        {
          phrase: "Gi-hun is back for Season 2.",
          reason: "Highlights the return of a central character.",
          sampleSentence: "Gi-hun is back for Season 2. I wonder what challenges he'll face this time.",
        },
        {
          phrase: "The games seem even more dangerous now.",
          reason: "Comments on the escalating stakes in the series.",
          sampleSentence: "The games seem even more dangerous now. It's going to be a wild ride.",
        },
        {
          phrase: "The visuals in the teaser are stunning.",
          reason: "Appreciates the aesthetic quality of the production.",
          sampleSentence: "The visuals in the teaser are stunning. Netflix really upped their game.",
        },
        {
          phrase: "I can't wait for the December 26 release.",
          reason: "Expresses anticipation for the upcoming season.",
          sampleSentence: "I can't wait for the December 26 release. It's marked on my calendar!",
        },
      ],
    }
  ];

export default topics;