// src/api/ai.ts
import { Platform } from 'react-native';
import client, { BASE_URL } from './Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBlobUtil from 'react-native-blob-util';

const ACCESS_TOKEN_KEY = 'accessToken';

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

const STT_URL =
  'http://lingomate-backend.ap-northeast-2.elasticbeanstalk.com/api/ai/stt';

/**
 * ✅ 디버깅 토글
 * - TEST_DROP_SAMPLERATE: sampleRate 필드 제거해서 서버 파싱 문제인지 확인
 * - TEST_FORCE_OCTET: 파일 mimetype을 application/octet-stream으로 강제
 *
 * ※ 둘 다 false로 두면 기존과 동일하게 동작
 */
const TEST_DROP_SAMPLERATE = false;
const TEST_FORCE_OCTET = false;

// file:// / filee:// 정리 + android file:// 보장
const ensureFileUri = (u: string) => {
  let raw = String(u ?? '').trim();
  raw = raw.replace(/^filee:\/\//, 'file://');
  if (!raw) return '';
  if (Platform.OS === 'android') {
    return raw.startsWith('file://') ? raw : `file://${raw}`;
  }
  return raw;
};

// RNBlobUtil.wrap()에는 "file://" 없는 실제 경로가 더 안전함
const stripFilePrefix = (u: string) => String(u ?? '').replace(/^file:\/\//, '');

export const aiApi = {
  // POST /api/ai/chat
  chat: (text: string) => client.post('/api/ai/chat', { text }),

  // POST /api/ai/feedback
  feedback: (text: string) => client.post('/api/ai/feedback', { text }),

  // POST /api/ai/tts
  tts: (
    text: string,
    accent: 'us' | 'uk' = 'us',
    gender: 'female' | 'male' = 'female',
  ) => client.post('/api/ai/tts', { text, accent, gender }),

  /**
   * ✅ STT PROBE
   * - 400이어도 "서버 도달" 확인용
   * - 토큰 포함
   */
  sttProbe: async () => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

    console.log('🧪 STT PROBE url:', STT_URL);
    console.log('🧪 BASE_URL json:', JSON.stringify(BASE_URL));
    console.log('🧪 token exists?:', !!token);

    const res = await fetch(STT_URL, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ping: true }),
    });

    const text = await res.text();
    console.log('🧪 STT PROBE status:', res.status);
    console.log('🧪 STT PROBE body head:', text.slice(0, 200));
    console.log('🧪 STT PROBE content-type:', res.headers?.get?.('content-type'));

    return { status: res.status, body: text };
  },

  /**
   * ✅ STT 업로드 (RNBlobUtil 멀티파트)
   * - 백엔드 field name: audio
   */
  stt: async (file: any, sampleRate = 16000) => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if (!file?.uri) throw new Error('STT file.uri missing');

    const fixedFile: UploadFile = {
      uri: ensureFileUri(String(file.uri)),
      name: String(file?.name ?? 'stt_record.wav').trim(),
      type: String(file?.type ?? 'audio/wav').trim(),
    };

    if (!fixedFile.uri) throw new Error(`STT invalid uri: ${fixedFile.uri}`);

    // ✅ RNBlobUtil.wrap은 file:// 없는 "실제 경로"가 안전
    const realPath = stripFilePrefix(fixedFile.uri).trim();

    console.log('🎙️ STT fixedFile:', fixedFile);
    console.log('🎙️ STT realPath:', realPath);
    console.log('🎙️ STT token exists?:', !!token);
    console.log('🔥 STT upload url:', STT_URL);
    console.log('🧩 STT toggles:', {
      TEST_DROP_SAMPLERATE,
      TEST_FORCE_OCTET,
    });

    // ✅ 파일 존재/사이즈 확인 (0이면 업로드 의미 없음)
    try {
      const stat = await RNBlobUtil.fs.stat(realPath);
      console.log('📦 STT file stat:', { path: stat.path, size: stat.size });
      if (!stat.size || Number(stat.size) <= 0) {
        throw new Error(`STT file is empty (size=${stat.size})`);
      }
    } catch (e: any) {
      console.log('❌ STT file stat failed:', String(e?.message ?? e));
      throw new Error(`STT cannot stat file: ${realPath}`);
    }

    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    const fileTypeToSend = TEST_FORCE_OCTET
      ? 'application/octet-stream'
      : fixedFile.type;

    // ✅ 멀티파트 파트 구성
    const parts: any[] = [
      {
        name: 'audio', // ✅ 서버 요구 필드명
        filename: fixedFile.name,
        type: fileTypeToSend,
        data: RNBlobUtil.wrap(realPath),
      },
    ];

    if (!TEST_DROP_SAMPLERATE) {
      parts.push({ name: 'sampleRate', data: String(sampleRate) });
    }

    const resp = await RNBlobUtil.fetch('POST', STT_URL, headers, parts);

    const status = resp.info().status;
    const bodyText = resp.data;

    console.log('✅ STT status:', status);
    console.log('✅ STT body head:', String(bodyText).slice(0, 300));

    if (status < 200 || status >= 300) {
      const head = String(bodyText).slice(0, 800);
      throw new Error(`STT ${status}: ${head}`);
    }

    try {
      return JSON.parse(bodyText);
    } catch {
      return { raw: bodyText };
    }
  },
};
