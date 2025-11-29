// src/screens/PremiumSubscribeModal.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  navigation: any;
};

export default function PremiumSubscribeModal({ navigation }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>프리미엄</Text>

        <Text style={styles.message}>
          프리미엄 회원 구독 시 회화 시간 및 회화 횟수 제한이 사라집니다.
          {"\n"}
          {"\n"}
          구독하시겠습니까?
        </Text>

        {/* 버튼 영역 */}
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.buttonLeft}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>

          <Pressable
            style={styles.buttonRight}
            onPress={() => {
              console.log('[RN] 프리미엄 구독 확인');
              // TODO: 실제 구독 처리 로직
              navigation.navigate('Subscription');
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
  // 화면 전체 어둡게
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 가운데 카드
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
