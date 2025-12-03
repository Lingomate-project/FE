// src/screens/ChangePasswordScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

// ⚠️ 실제 Auth0 도메인으로 교체해야 함
const AUTH0_RESET_URL = 'https://dev-rc5gsyjk5pfptk72.us.auth0.com/u/reset-password';

export default function ChangePasswordScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const handleOpenResetPage = async () => {
    try {
      const url =
        email.trim().length > 0
          ? `${AUTH0_RESET_URL}?email=${encodeURIComponent(email.trim())}`
          : AUTH0_RESET_URL;

      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert(
          '오류',
          '비밀번호 재설정 페이지를 열 수 없습니다. 잠시 후 다시 시도해 주세요.',
        );
        return;
      }

      await Linking.openURL(url);
    } catch (e) {
      console.log('open reset page error:', e);
      Alert.alert(
        '오류',
        '비밀번호 재설정 화면으로 이동하는 중 문제가 발생했습니다.',
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* === 헤더 === */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ChevronLeft color="#2c303c" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>비밀번호 변경</Text>

          {/* 오른쪽 정렬용 더미 뷰 */}
          <View style={{ width: 32 }} />
        </View>

        {/* === 본문 === */}
        <View style={styles.content}>

          <View style={styles.formArea}>
            <Text style={styles.inputLabel}>이메일 (선택)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="이메일"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Pressable style={styles.submitButton} onPress={handleOpenResetPage}>
            <Text style={styles.submitButtonText}>
              비밀번호 재설정 페이지로 이동
            </Text>
          </Pressable>
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
  root: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  // === ChatScreen과 통일한 헤더 스타일 ===
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c303c',
  },

  // === 본문 ===
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 24,
  },

  formArea: {
    marginTop: 16,
  },

  inputLabel: {
    fontSize: 12,
    color: '#2c303c',
    marginBottom: 8,
  },

  inputBox: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 20,
  },

  submitButton: {
    marginTop: 32,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
});