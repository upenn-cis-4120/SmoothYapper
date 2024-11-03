import { Message as MessageType } from "@/types/Message";

const Messages : MessageType[] = [
    {
        id: 1,
        type: 'received',
        text: 'Cna you briefly summarize the song Snooze by SZA?',
        timestamp: '2023-11-04T12:00:00Z',
        avatar: '@/assets/images/full-tom.jpg',
      },
      {
        id: 2,
        type: 'sent',
        text: '"Snooze" by SZA is a track from her album "SOS" that explores themes of love, self-worth, and relationship dynamics. In the song, SZA sings about the tension between wanting intimacy and needing personal space. She reflects on a relationship where she feels both indispensable and undervalued, expressing a desire for her partner to recognize her worth and meet her emotional needs.',
        timestamp: '2023-11-04T12:01:00Z',
        avatar: '@/assets/images/user.png',
      },
      {
        id: 3,
        type: 'received',
        text: 'Is that an old-school hip-hop?',
        timestamp: '2023-11-04T12:02:00Z',
        avatar: '@/assets/images/full-tom.jpg',
      },
      {
        id: 4,
        type: 'sent',
        text: 'No, "Snooze" by SZA isn\'t old-school hip-hop. It\'s more contemporary R&B with elements of pop. SZA\'s music typically features smooth, melodic vocals over beats that blend various genres, including soul, pop, and hip-hop, but it\'s rooted primarily in modern R&B.',
        timestamp: '2023-11-04T12:03:00Z',
        avatar: '@/assets/images/user.png',
      },
      {
        id: 5,
        type: 'received',
        text: 'But I really like it style and verse, can you give me some more similar recommendations?',
        timestamp: '2023-11-04T12:04:00Z',
        avatar: '@/assets/images/full-tom.jpg',      },
      {
        id: 6,
        type: 'sent',
        text: 'If you enjoy the style of SZA\'s "Snooze," here are a few artists and tracks you might also like: \n1. H.E.R. - Songs like "Focus" and "Best Part" (a duet with Daniel Caesar) blend R&B with soulful lyrics and smooth vocal delivery, similar to SZA\'s style.\n2. Jhené Aiko - Tracks like "While We\'re Young" and "Sativa" offer introspective lyrics with a laid-back, ethereal R&B sound. \n3. Summer Walker - Her songs "Come Thru" (with Usher) and "Playing Games" showcase a blend of vulnerability and modern R&B that aligns with the themes in SZA\'s music.\n3.Ari Lennox - Songs like "Shea Butter Baby" and "Whipped Cream" have a soulful, evocative style that complements the emotive and personal nature of SZA\'s tracks.\n4. Solange - Her album "A Seat at the Table," especially tracks like "Cranes in the Sky" and "Don\'t Touch My Hair," shares the reflective and bold approach to contemporary R&B.\nThese artists all share a modern, soulful approach to R&B with deep, personal lyrics and rich vocal performances that you might enjoy if you like SZA\'s music.',
        timestamp: '2023-11-04T12:05:00Z',
        avatar: '@/assets/images/full-tom.jpg',
      },
]

export default Messages;