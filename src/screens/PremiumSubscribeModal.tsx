// src/screens/PremiumSubscribeModal.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import * as RNIap from 'react-native-iap';

const Iap: any = RNIap; // 👈 타입 때문에 빡치지 말고 그냥 any로

// 실제 구글 콘솔에 등록한 구독 ID로 바꿔줘
const productIds = ['premium_subscription_monthly'];

type Props = {
  navigation: any;
};

export default function PremiumSubscribeModal({ navigation }: Props) {
  // 🔌 IAP 연결
  useEffect(() => {
    const init = async () => {
      try {
        await Iap.initConnection();
        console.log('[IAP] 연결 성공');
      } catch (e) {
        console.log('[IAP] 연결 실패:', e);
      }
    };

    init();

    return () => {
      Iap.endConnection && Iap.endConnection();
    };
  }, []);

  const handleSubscribe = async () => {
    try {
      console.log('[IAP] 상품 정보 요청');
      // ⭐ 구독 상품 정보 가져오기
      const products = await Iap.getSubscriptions(productIds);

      if (!products || products.length === 0) {
        Alert.alert('오류', '구독 상품을 찾을 수 없습니다.');
        return;
      }

      console.log('[IAP] 구매 요청 시작');
      // ⭐ 실제 구독 결제 호출
      const purchase = await Iap.requestSubscription(productIds[0]);

      console.log('[IAP] 구매 성공:', purchase);

      Alert.alert('성공', '프리미엄 구독이 활성화되었습니다!');
      // TODO: 필요하면 여기서 백엔드에 구독 정보 보내기

      navigation.navigate('Subscription');
    } catch (e: any) {
      console.log('[IAP] 구매 실패:', e);

      if (e?.code === 'E_USER_CANCELLED') {
        Alert.alert('취소됨', '구독이 취소되었습니다.');
      } else {
        Alert.alert('결제 오류', '구독에 실패했습니다.');
      }
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>프리미엄</Text>

        <Text style={styles.message}>
          프리미엄 회원 구독 시 회화 시간 및 회화 횟수 제한이 사라집니다.
          {'\n'}
          {'\n'}
          구독하시겠습니까?
        </Text>

        <View style={styles.buttonRow}>
          <Pressable
            style={styles.buttonLeft}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>취소</Text>
          </Pressable>

          <Pressable
            style={styles.buttonRight}
            onPress={handleSubscribe}
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