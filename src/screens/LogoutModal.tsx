// src/screens/LogoutModal.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  navigation: any;
};

export default function LogoutModal({ navigation }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        {/* 타이틀 */}
        <Text style={styles.title}>로그아웃</Text>

        {/* 메시지 */}
        <Text style={styles.message}>로그아웃 하시겠습니까?</Text>

        {/* 버튼 영역 */}
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.buttonLeft}
            onPress={() => navigation.goBack()}   // 팝업 닫기
          >
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>

          <Pressable
            style={styles.buttonRight}
            onPress={() => {
              console.log('[RN] 로그아웃 확인');
              navigation.navigate('Login');       // ✅ 로그인 화면으로 이동
            }}
          >
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: 320,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c303c',
    marginBottom: 12,
  },

  message: {
    fontSize: 14,
    color: '#4b4b4b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#D5D8E0',
  },

  buttonLeft: {
    flex: 1,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderColor: '#D5D8E0',
    alignItems: 'center',
  },

  buttonRight: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2c303c',
  },
});
