import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReviewScreen() {
  return (
    <View style={styles.root}>
      {/* 배경 그라데이션 대신 연한 회색 → 흰색 */}
      <View style={styles.gradientBg} />

      {/* 상단 제목 */}
      <Text style={styles.title}>복습하기</Text>

      {/* 카드 리스트 */}
      {cards.map((item, index) => (
        <View key={index} style={[styles.card, { top: item.top }]}>
          <View style={styles.cardBg} />
          <Text style={[styles.cardText, { left: 35 }]}>{item.en}</Text>
          <Text style={[styles.cardText, { left: 230 }]}>{item.kr}</Text>
        </View>
      ))}

      {/* 버튼 1 */}
      <View style={styles.btnLeft} />
      <Text style={styles.btnLeftText}>스크립트</Text>

      {/* 버튼 2 */}
      <View style={styles.btnRight} />
      <Text style={styles.btnRightText}>홈으로</Text>

      {/* 상단 오른쪽 작은 사각형 */}
      <View style={styles.smallBox} />
    </View>
  );
}

const cards = [
  { en: 'Way to go.', kr: '잘했어', top: 179 },
  { en: 'I’m sold.', kr: '설득됐어', top: 262 },
  { en: 'Give her my best.', kr: '안부 전해줘', top: 345 },
  { en: 'Good for you.', kr: '잘됐다/좋겠다', top: 428 },
  { en: 'Time flies', kr: '시간 빠르다', top: 511 },
  { en: 'It’s up to you.', kr: '너가 결정해', top: 594 },
  { en: ' I mean it.', kr: '진심이야', top: 677 },
];

const styles = StyleSheet.create({
  root: {
    width: 412,
    height: 917,
    backgroundColor: 'white',
  },

  gradientBg: {
    position: 'absolute',
    width: 412,
    height: 917,
    backgroundColor: '#E5E7ED',
  },

  title: {
    position: 'absolute',
    left: 146,
    top: 71,
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },

  /* 카드 공통 */
  card: {
    position: 'absolute',
    width: 370,
    height: 61,
    left: 21,
  },

  cardBg: {
    position: 'absolute',
    width: 370,
    height: 61,
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 15,
  },

  cardText: {
    position: 'absolute',
    top: 20,
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },

  /* 하단 버튼 (스크립트) */
  btnLeft: {
    position: 'absolute',
    left: 56,
    top: 825,
    width: 114.5,
    height: 35,
    backgroundColor: '#2C303C',
    borderRadius: 10,
  },
  btnLeftText: {
    position: 'absolute',
    left: 85,
    top: 832,
    fontSize: 14,
    color: '#D5D8E0',
  },

  /* 하단 버튼 (홈으로) */
  btnRight: {
    position: 'absolute',
    left: 251,
    top: 825,
    width: 114.5,
    height: 35,
    backgroundColor: '#2C303C',
    borderRadius: 10,
  },
  btnRightText: {
    position: 'absolute',
    left: 286.14,
    top: 832,
    fontSize: 14,
    color: '#D5D8E0',
  },

  /* 상단 작은 사각형 */
  smallBox: {
    position: 'absolute',
    left: 245,
    top: 76,
    width: 24,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
});
