// src/api/auth.ts
import Auth0 from 'react-native-auth0';
import client, { setAccessToken } from './Client';

export const auth0 = new Auth0({
  domain: 'dev-rc5gsyjk5pfptk72.us.auth0.com',
  clientId: 'k1naLtV7ldGAv6ufgUsNe6XlrOQynDpt',
});

// ✅ redirect URI는 네 AndroidManifest intent-filter랑 정확히 맞아야 함
export const REDIRECT_URI =
  'com.lingomateapp.auth0://dev-rc5gsyjk5pfptk72.us.auth0.com/android/com.lingomateapp/callback';

// ✅ 백엔드가 기대하는 Auth0 API Identifier (audience)
const AUDIENCE = 'https://api.lingomate.com'; // ← 백에서 쓰는 값으로 맞춰야 함

export async function login() {
  const res: any = await auth0.webAuth.authorize({
    scope: 'openid profile email',
    audience: AUDIENCE, // ✅ 이거 없으면 API용 accessToken이 아닐 수 있음
    // 라이브러리 버전에 따라 redirectUrl/redirectUri 둘 다 케이스가 있어서 안전하게 둘 다 세팅
    // @ts-ignore
    redirectUrl: REDIRECT_URI,
    // @ts-ignore
    redirectUri: REDIRECT_URI,
  });

  // ✅ API 요청에는 accessToken만 사용해야 함
  const accessToken = res?.accessToken ?? null;

  console.log('🔐 Auth0 login result keys:', Object.keys(res || {}));
  console.log('🔐 has accessToken?', accessToken ? 'YES' : 'NO');

  if (!accessToken) {
    throw new Error('Auth0 did not return accessToken. Check audience/redirect settings.');
  }

  await setAccessToken(accessToken);
  return res;
}

// ✅ 로그아웃
export async function logout() {
  // 1) 프론트 토큰 제거
  await setAccessToken(null);

  // 2) Auth0 세션 종료
  return auth0.webAuth.clearSession({
    // @ts-ignore
    returnTo: REDIRECT_URI,
    // @ts-ignore
    redirectUrl: REDIRECT_URI,
    federated: false,
  });
}

// ✅ 백엔드 API
export const authApi = {
  getMyAuthInfo: () => client.get('/api/auth/me'),
  registerIfNeeded: () => client.post('/api/auth/register-if-needed'),
};

