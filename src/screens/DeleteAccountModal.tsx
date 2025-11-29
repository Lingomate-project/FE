// src/screens/DeleteConfirmModal.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  navigation: any;
};

export default function DeleteConfirmModal({ navigation }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        {/* 안내 문구 */}
        <Text style={styles.message}>
          회원 탈퇴 시 계정은 삭제되며 복구되지 않습니다.
          {'\n'}
          {'\n'}
          탈퇴하시겠습니까?
        </Text>

        {/* 버튼 영역 */}
        <View style={styles.buttonRow}>
          {/* 취소 버튼 */}
          <Pressable
            style={styles.buttonLeft}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>

          {/* 가운데 세로 라인 */}
          <View style={styles.verticalDivider} />

          {/* 확인 버튼 */}
          <Pressable
            style={styles.buttonRight}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 화면 전체를 덮는 반투명 배경
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 가운데 모달 박스
  modalBox: {
    width: 320,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  // 안내 문구
  message: {
    fontSize: 14,
    color: '#2c303c',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },

  // 버튼 영역 (위에 가로 선 포함)
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#D5D8E0',
  },

  // 왼쪽 버튼(취소)
  buttonLeft: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 오른쪽 버튼(확인)
  buttonRight: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 가운데 세로 구분선
  verticalDivider: {
    width: 1,
    backgroundColor: '#D5D8E0',
  },

  // 버튼 텍스트
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2c303c',
  },
});
