// src/api/stats.ts
import client from './client';

export const statsApi = {
  // GET /api/stats
  getStats: () => client.get('/api/stats'),
};
