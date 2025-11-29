// src/screens/SignupScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import PandaIcon from '../components/PandaIcon';

type Props = {
  navigation: any;
};

export default function SignupScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Logo + Title */}
            <View style={styles.logoSection}>
              <View style={styles.logoRow}>
                <Text style={styles.logoText}>LING</Text>
                <PandaIcon size="small" />
                <Text style={styles.logoText}>MATE</Text>
              </View>
              <Text style={styles.desc}>AI와 함께하는 외국어 회화</Text>
            </View>

            {/* 입력 박스들 (아이디 / 이메일 / 비밀번호 / 비밀번호 확인) */}
            <TextInput
              style={styles.inputBoxId}
              placeholder="아이디"
              placeholderTextColor="#9ca3af"
            />
            

            <TextInput
              style={styles.inputBoxEmail}
              placeholder="이메일"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            

            <TextInput
              style={styles.inputBoxPw}
              placeholder="비밀번호"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
            

            <TextInput
              style={styles.inputBoxPwCheck}
              placeholder="비밀번호 확인"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
            

            {/* 회원가입 버튼 박스 */}
            <Pressable
              style={styles.signupButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.signupButtonText}>회원가입</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e7ed', // 배경 (login이랑 톤 맞춤)
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#d5d8e0',
    borderRadius: 24,
    padding: 24,
  },

  // 로고 영역
  logoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  desc: {
    marginTop: 8,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },

  // ====== 입력 박스들 공통 스타일 ======
  // 위로 갈수록 marginTop 을 조금씩 조정하고 싶으면 여기 값만 바꾸면 됨.
inputBoxId: {
  height: 48,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#2c303c',
  marginTop: 4,
  marginBottom: 8,   // ★ 여기!
},
inputLabelId: {
  fontSize: 12,
  color: '#2c303c',
  marginTop: 4,
  marginBottom: 8,
},

inputBoxEmail: {
  height: 48,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#2c303c',
  marginBottom: 8,   // ★ 여기!
},
inputLabelEmail: {
  fontSize: 12,
  color: '#2c303c',
  marginTop: 4,
  marginBottom: 8,
},

inputBoxPw: {
  height: 48,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#2c303c',
  marginBottom: 8,   // ★ 여기!
},
inputLabelPw: {
  fontSize: 12,
  color: '#2c303c',
  marginTop: 4,
  marginBottom: 8,
},

inputBoxPwCheck: {
  height: 48,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#2c303c',
  marginBottom: 12,  // ★ 마지막은 버튼이랑 좀 더 띄움
},
inputLabelPwCheck: {
  fontSize: 12,
  color: '#2c303c',
  marginTop: 4,
  marginBottom: 16,
},

  // 회원가입 버튼
  signupButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
});
