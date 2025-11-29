import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import PandaIcon from '../components/PandaIcon'; // ← 네 프로젝트 구조 맞추면 됨

export default function ChangePasswordScreen({ navigation }: any) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        {/* 뒤로가기 */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        {/* 타이틀 */}
        <Text style={styles.title}>비밀번호 변경</Text>

        {/* 입력창 */}
        <View style={styles.formArea}>
          <Text style={styles.inputLabel}>현재 비밀번호</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="현재 비밀번호"
            placeholderTextColor="#9ca3af"
            value={currentPw}
            onChangeText={setCurrentPw}
          />

          <Text style={styles.inputLabel}>새 비밀번호</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="새 비밀번호"
            placeholderTextColor="#9ca3af"
            value={newPw}
            onChangeText={setNewPw}
          />

          <Text style={styles.inputLabel}>새 비밀번호 확인</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#9ca3af"
            value={newPwCheck}
            onChangeText={setNewPwCheck}
          />
        </View>

        {/* 버튼 */}
        <Pressable style={styles.submitButton}
        onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.submitButtonText}>비밀번호 변경</Text>
        </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  /* 뒤로가기 */
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: '#2c303c',
  },

  /* 제목 */
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
    color: '#2c303c',
    textAlign: 'center',
  },

  /* 입력박스 영역 */
  formArea: {
    marginTop: 40,
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

  /* 버튼 */
  submitButton: {
    marginTop: 40,
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
