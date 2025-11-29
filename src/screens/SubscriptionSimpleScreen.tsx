import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function SubscriptionSimpleScreen({ navigation }: any) {
  return (
    <View style={styles.safeArea}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>구독 관리</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 본문 영역 */}
      <View style={styles.content}>
        {/* 프리미엄 구독 */}
        <Pressable style={styles.itemBox}
          onPress={() => navigation.navigate('PremiumSubscribeModal')}
        >
          <Text style={styles.itemText}>프리미엄 구독</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </Pressable>

        {/* 프리미엄 구독 취소 */}
        <Pressable style={styles.itemBox}
          onPress={() => navigation.navigate('PremiumCancelModal')}
          >
          <Text style={styles.itemText}>프리미엄 구독 취소</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  /* ===== 헤더 ===== */
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  backIcon: {
    fontSize: 22,
    color: '#2c303c',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c303c',
  },

  /* ===== 콘텐츠 영역 ===== */
  content: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  itemBox: {
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#2c303c',
  },
  arrow: {
    fontSize: 18,
    color: '#2c303c',
  },
});
