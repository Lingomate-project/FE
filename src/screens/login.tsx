// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PandaIcon from '../components/PandaIcon';

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('[RN] Google login initiated');
    navigation.navigate('Home'); // 웹의 router.push('/home')
  };
 
  const handleSignup = () => {
  console.log('[RN] Signup button clicked');
  navigation.navigate('Signup');
  };

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
              <Text style={styles.subtitle}>AI와 함께하는 외국어 회화</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputs}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="이메일"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {/* Login Button */}
            <Pressable style={styles.loginButton} onPress={handleGoogleLogin}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </Pressable>

            {/* Signup */}
            <View style={styles.signupSection}>
              <Text style={styles.signupText}>계정이 없으신가요?</Text>

              <Pressable style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>회원가입</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8eaf0',
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
    rowGap: 16,
  },
  logoSection: {
    alignItems: 'center',
    rowGap: 8,
    marginBottom: 8,
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
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  inputs: {
    rowGap: 8,
    marginTop: 4,
  },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
  },
  loginButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
  signupSection: {
    marginTop: 8,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 6,
  },
  signupButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3d424f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
});
