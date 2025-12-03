// src/api/phrases.ts
import client from './client';

export type PhraseItem = {
  id: number;
  en: string;
  kr: string;
};

export const phrasesApi = {
  // GET /api/phrases
  getPhrases: () => client.get<PhraseItem[]>('/api/phrases'),
};
