// src/api/conversation.ts
import client from './client';

export type ScriptMessage = {
  from: 'user' | 'ai';
  text: string;
};

export const conversationApi = {
  // POST /api/conversation/start
  startSession: () => client.post('/api/conversation/start'),

  // POST /api/conversation/finish
  finishSession: (sessionId: string, script: ScriptMessage[]) =>
    client.post('/api/conversation/finish', { sessionId, script }),

  // GET /api/conversation/history?page=1&limit=20 ...
  getHistory: (page = 1, limit = 20) =>
    client.get(`/api/conversation/history?page=${page}&limit=${limit}`),

  // GET /api/conversation/:sessionId
  getConversation: (sessionId: string) =>
    client.get(`/api/conversation/${sessionId}`),

  // DELETE /api/conversation/delete  (단일 삭제)
  deleteById: (sessionId: string) =>
    client.delete('/api/conversation/delete', {
      data: { sessionId },
    }),

  // DELETE /api/conversation/delete  (전체 삭제)
  deleteAll: () =>
    client.delete('/api/conversation/delete', {
      data: { all: true },
    }),
};
