// src/screens/StudyStatsScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PandaIcon from '../components/PandaIcon';
import client from '../api/Client';

type Props = {
  navigation: any;
};

type StatsData = {
  totalSessions: number;
  totalMinutes: number;
  avgScore: number;
  bestScore: number;
  streak: number;
  newWordsLearned: number;
};

export default function StudyStatsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 1. 백엔드에서 학습 통계 가져오기
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await client.get('/api/stats');
        // 응답: { success: true, data: {...} }
        const data = res.data?.data;

        setStats({
          totalSessions: data.totalSessions ?? 0,
          totalMinutes: data.totalMinutes ?? 0,
          avgScore: data.avgScore ?? 0,
          bestScore: data.bestScore ?? 0,
          streak: data.streak ?? 0,
          newWordsLearned: data.newWordsLearned ?? 0,
        });
      } catch (e) {
        console.log('[StudyStats] /api/stats 호출 실패:', e);
        // 실패해도 화면이 완전히 죽지 않도록 기본값 세팅
        setStats({
          totalSessions: 0,
          totalMinutes: 0,
          avgScore: 0,
          bestScore: 0,
          streak: 0,
          newWordsLearned: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 🔢 2. 총 학습 시간 표기: 분 → "xxh" 형식
  const getTotalHoursLabel = () => {
    if (!stats) return '-';
    const hours = Math.floor(stats.totalMinutes / 60);
    const minutes = stats.totalMinutes % 60;

    if (hours > 0) {
      // 예: 21h, 21h 10m 이런 식으로
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  // 🐼 3. 진행도 팬더 개수 계산: "3회마다 팬더 1개"
  //     예: totalSessions = 7 → Math.floor(7/3) = 2마리
  const getPandaCount = () => {
    if (!stats) return 0;
    const count = Math.floor(stats.totalSessions / 3);
    // 현재 칸이 12개(3행×4열)이므로 최대 12로 제한
    return Math.min(count, 12);
  };

  const pandaCount = getPandaCount();

  // 로딩 상태 처리
  if (loading || !stats) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={['left', 'right', 'bottom']}
      >
        <View
          style={[
            styles.root,
            { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size="large" color="#2c303c" />
          <Text style={{ marginTop: 12, color: '#4b4b4b' }}>학습 통계를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // 상단은 insets.top으로 직접 처리
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* ===== 상단 헤더 (공통 스타일) ===== */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>학습 통계</Text>

          {/* 오른쪽 정렬용 더미 뷰 */}
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== 요약 카드 6개 (백엔드 데이터 기반) ===== */}
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.totalSessions}</Text>
              <Text style={styles.summaryLabel}>총 대화 횟수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{getTotalHoursLabel()}</Text>
              <Text style={styles.summaryLabel}>총 학습 시간</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.avgScore}</Text>
              <Text style={styles.summaryLabel}>평균 점수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.streak}</Text>
              <Text style={styles.summaryLabel}>연속 학습일</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.bestScore}</Text>
              <Text style={styles.summaryLabel}>최고 점수</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.newWordsLearned}</Text>
              <Text style={styles.summaryLabel}>학습한 단어 및 문장</Text>
            </View>
          </View>

          {/* ===== 진행도 & 뱃지 ===== */}
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>진행도</Text>
            <Text style={styles.progressHint}>
              하루 3회 이상 대화 시 10포인트 (3회마다 팬더 1개)
            </Text>

            {/* 1행 뱃지 (4칸) */}
            <View style={styles.badgeRow}>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={styles.badgeBox}>
                  {idx < pandaCount && <PandaIcon size="medium" />}
                </View>
              ))}
            </View>

            {/* 2행 뱃지 */}
            <View style={styles.badgeRow}>
              {[4, 5, 6, 7].map((idx) => (
                <View key={idx} style={styles.badgeBox}>
                  {idx < pandaCount && <PandaIcon size="medium" />}
                </View>
              ))}
            </View>

            {/* 3행 뱃지 */}
            <View style={styles.badgeRow}>
              {[8, 9, 10, 11].map((idx) => (
                <View key={idx} style={styles.badgeBox}>
                  {idx < pandaCount && <PandaIcon size="medium" />}
                </View>
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

  // ===== 헤더 (다른 화면과 통일) =====
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#2c303c',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c303c',
    textAlign: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
