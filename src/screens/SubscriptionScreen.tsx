// src/screens/SubscriptionScreen.tsx

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

type Props = {
  navigation: any;
};

export default function SubscriptionScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* 🔙 상단 헤더 (뒤로가기 + 제목) */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>

          <Text style={styles.title}>구독 관리</Text>

          {/* 오른쪽 정렬용 더미 뷰 */}
          <View style={{ width: 32 }} />
        </View>

        {/* ===== 베이직 플랜 ===== */}
        <Pressable style={styles.card}>
          <View style={styles.cardLeft}>
            {/* 체크박스 모양 */}
            <View style={styles.checkbox} />

            <View>
              <Text style={styles.planName}>베이직</Text>
              <Text style={styles.planInfo}>회화 시간: 10분</Text>
              <Text style={styles.planInfo}>회화 횟수: 3번</Text>
            </View>
          </View>

          <Text style={styles.planPrice}>Free</Text>
        </Pressable>

        {/* ===== 프리미엄 플랜 ===== */}
        <Pressable
          style={styles.card}
        >
          <View style={styles.cardLeft}>
            {/* 왕관 뱃지 */}
            <View style={styles.premiumTag}>
              <Text style={styles.premiumBadge}>👑</Text>
            </View>

            <View>
              <Text style={styles.planName}>프리미엄</Text>
              <Text style={styles.planInfo}>회화 시간: ∞</Text>
              <Text style={styles.planInfo}>회화 횟수: ∞</Text>
            </View>
          </View>

          <Text style={styles.planPrice}>월 12,900₩</Text>
        </Pressable>

        {/* 하단 구독 관리 버튼 → SubscriptionSimpleScreen */}
        <Pressable
          style={styles.manageButton}
          onPress={() => navigation.navigate('SubscriptionSimple')}
        >
          <Text style={styles.manageButtonText}>구독 관리</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  /* 🔝 헤더 영역 */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 32,
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: '#2c303c',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c303c',
    textAlign: 'center',
  },

  /* 공통 카드 */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* 베이직 체크박스 */
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2c303c',
    marginRight: 12,
  },

  /* 플랜 텍스트 */
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c303c',
    marginBottom: 4,
  },
  planInfo: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c303c',
  },

  /* 프리미엄 왕관 뱃지 */
  premiumTag: {
    backgroundColor: '#FACC15',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumBadge: {
    fontSize: 14,
  },

  /* 하단 버튼 */
  manageButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
});
