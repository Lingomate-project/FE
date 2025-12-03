// src/api/stats.ts
import client from './Client';

export const statsApi = {
  // GET /api/stats
  getStats: () => client.get('/api/stats'),
};
