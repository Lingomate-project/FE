// src/api/ai.ts
import client from './client';

export const aiApi = {
  // POST /api/ai/chat
  chat: (text: string) =>
    client.post('/api/ai/chat', { text }),

  // POST /api/ai/tts
  tts: (text: string, voice?: string) =>
    client.post('/api/ai/tts', { text, voice }),

  // POST /api/ai/feedback
  feedback: (text: string) =>
    client.post('/api/ai/feedback', { text }),
};
