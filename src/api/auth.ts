// src/api/auth.ts

import client from './Client';
import Auth0 from 'react-native-auth0';

// Auth0 인스턴스 생성 (프로젝트 전역에서 사용)
export const auth0 = new Auth0({
  domain: 'dev-rc5gsyjk5pfptk72.us.auth0.com',
  clientId: 'k1naLtV7ldGAv6ufgUsNe6XlrOQynDpt',
});

// React Native에서 사용할 콜백 URI
const REDIRECT_URI = 'com.lingomateapp.auth0://dev-rc5gsyjk5pfptk72.us.auth0.com/android/com.lingomateapp/callback';

// 로그인 함수
export async function login() {
  return auth0.webAuth.authorize({
    scope: 'openid profile email',
    // @ts-ignore
    redirectUri: REDIRECT_URI,
  });
}

// 로그아웃 함수

export async function logout() {
  return auth0.webAuth.clearSession({
    // @ts-ignore
    returnTo: REDIRECT_URI,
    federated: false,
  });
}

// 백엔드 API 요청
export const authApi = {
  getMyAuthInfo: () => client.get('/api/auth/me'),
};
