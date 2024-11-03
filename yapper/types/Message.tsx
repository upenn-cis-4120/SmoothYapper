export interface Message {
    id: number;
    type: 'received' | 'sent';
    text: string;
    timestamp: string;
    avatar: string;
}