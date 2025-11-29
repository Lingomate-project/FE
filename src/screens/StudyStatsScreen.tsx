// src/screens/StudyStatsScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import PandaIcon from '../components/PandaIcon';

type Props = {
  navigation: any;
};

export default function StudyStatsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>학습 통계</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== 요약 카드 6개 ===== */}
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>127</Text>
              <Text style={styles.summaryLabel}>총 대화 횟수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>21h</Text>
              <Text style={styles.summaryLabel}>총 학습 시간</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>83</Text>
              <Text style={styles.summaryLabel}>평균 점수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>15</Text>
              <Text style={styles.summaryLabel}>연속 학습일</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>97</Text>
              <Text style={styles.summaryLabel}>최고 점수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>53</Text>
              <Text style={styles.summaryLabel}>학습한 단어 및 문장</Text>
            </View>
          </View>

          {/* ===== 진행도 & 뱃지 ===== */}
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>진행도</Text>
            <Text style={styles.progressHint}>
              하루 3회 이상 대화시 10포인트
            </Text>

            {/* 1행 뱃지 (앞 3개는 PandaIcon) */}
            <View style={styles.badgeRow}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={styles.badgeBox}>
                  {idx < 3 && <PandaIcon size="medium" />}
                </View>
              ))}
            </View>

            {/* 2행 뱃지 */}
            <View style={styles.badgeRow}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={styles.badgeBox} />
              ))}
            </View>

            {/* 3행 뱃지 */}
            <View style={styles.badgeRow}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={styles.badgeBox} />
              ))}
            </View>
          </View>
        </ScrollView>
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

  // ===== 헤더 =====
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d5db',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#111827',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 32, // back 버튼 자리만큼 보정
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerRightBox: {
    width: 24,
    height: 22,
    backgroundColor: '#111827',
    borderRadius: 4,
  },

  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    rowGap: 24,
  },

  // ===== 요약 카드 =====
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  summaryCard: {
    width: '48%',
    height: 90,
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#111827',
  },

  // ===== 진행도 & 뱃지 =====
  progressSection: {
    marginTop: 8,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  progressHint: {
    fontSize: 12,
    color: '#6A6E79',
    marginBottom: 12,
    textAlign: 'right',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badgeBox: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 15,
    justifyContent: 'center',   // 카드 안에서 정중앙 배치
    alignItems: 'center',       // 카드 안에서 정중앙 배치
    overflow: 'hidden',
  },
});

