// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PandaIcon from '../components/PandaIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth0, authApi } from '../api/auth';

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // 1️⃣ Auth0 Universal Login 띄우기 (이메일/비번, 소셜 로그인 포함)
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        // 필요한 경우 additionalParameters에 값 추가 가능
        // additionalParameters: { prompt: 'login' },
      });

      console.log('Auth0 로그인 성공:', credentials);

      // 2️⃣ 토큰 로컬 저장 (백엔드 호출이나 재로그인에 사용)
      if (credentials.accessToken) {
        await AsyncStorage.setItem('accessToken', credentials.accessToken);
      }
      if (credentials.idToken) {
        await AsyncStorage.setItem('idToken', credentials.idToken);
      }

      // 3️⃣ 백엔드에 /api/auth/me 호출해서 내부 유저 정보 매핑 (선택)
      try {
        const meRes: any = await authApi.getMyAuthInfo();
        console.log('백엔드 /auth/me:', meRes);

        // 필요하면 여기서 userId, subscription 같은 값도 AsyncStorage에 저장
        // await AsyncStorage.setItem('userId', meRes.data.userId);
      } catch (e) {
        console.log('/api/auth/me 호출 실패(선택):', e);
      }

      // 4️⃣ 홈 화면으로 이동 (스택 초기화)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e: any) {
      console.log('Auth0 로그인 실패:', e);
      Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 상단 로고 */}
        <View style={styles.header}>
          <PandaIcon size="large" />
          <Text style={styles.title}>LingoMate</Text>
          <Text style={styles.subTitle}>영어 회화를 쉽고 자연스럽게</Text>
        </View>

        {/* 설명 텍스트 */}
        <View style={styles.body}>
          <Text style={styles.description}>
            Auth0로 안전하게 로그인하고{'\n'}
            나만의 AI 회화 튜터와 연습을 시작해 보세요.
          </Text>
        </View>

        {/* 로그인 버튼 */}
        <View style={styles.footer}>
          <Pressable
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.loginButtonText}>이메일 / 소셜로 로그인</Text>
            )}
          </Pressable>

          <Text style={styles.smallText}>
            로그인은 Auth0 보안 페이지에서 처리되며,{'\n'}
            비밀번호는 앱이나 서버에 저장되지 않습니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  footer: {
  marginBottom: 40,
},


  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  backArrow: {
    fontSize: 28,
    color: '#2C303C',
    marginBottom: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#2C303C',
  },

  subTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    color: '#2C303C',
    marginBottom: 40,
  },

  card: {
    backgroundColor: '#D5D8E0',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    marginTop: 12,
  },

  label: {
    color: '#2C303C',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#2C303C',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C5C8D4',
  },

  loginButton: {
    backgroundColor: '#2C303C',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
  },
  smallText: {
  marginTop: 12,
  fontSize: 12,
  color: '#6B7280',
  textAlign: 'center',
  lineHeight: 18,
},
});