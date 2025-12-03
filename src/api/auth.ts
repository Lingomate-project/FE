// src/api/auth.ts

import client from './client';
import Auth0 from 'react-native-auth0';

// 🔥 Auth0 인스턴스 생성 (프로젝트 전역에서 사용)
export const auth0 = new Auth0({
  domain: 'dev-rc5gsyjk5pfptk72.us.auth0.com',
  clientId: 'k1naLtV7ldGAv6ufgUsNe6XlrOQynDpt',   // 반드시 실제 Client ID로 변경해야 함
});

// 🔥 백엔드 API 요청 (Auth0 아님)
export const authApi = {
  /**
   * GET /api/auth/me
   * JWT(accessToken)를 백엔드로 보내서 계정 매핑 정보 조회
   */
  getMyAuthInfo: () => client.get('/api/auth/me'),
};
