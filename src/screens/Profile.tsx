// src/screens/ProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const pandaImg = require('../assets/images/panda-mascot.png');

export default function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState<string>('사용자');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [stats, setStats] = useState<StatsData | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // ✅ 1. 프로필: 화면에 들어올 때마다 다시 로드
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedAvatar = await AsyncStorage.getItem('userAvatarUri');

        if (storedName) setUserName(storedName);
        if (storedAvatar) setAvatarUri(storedAvatar);
      } catch (e) {
        console.log('[Profile] 프로필 불러오기 실패:', e);
      }
    };

    // 처음 마운트될 때 한 번
    loadProfile();

    // 🔥 화면이 다시 포커스될 때마다 또 한 번
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });

    return unsubscribe;
  }, [navigation]);

  // ✅ 2. 통계: 마운트될 때 + 화면 포커스될 때마다 /api/stats 재요청
  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const res = await client.get('/api/stats');
        const data = res.data?.data || {};

        if (!isMounted) return;

        setStats({
          totalSessions: data.totalSessions ?? 0,
          totalMinutes: data.totalMinutes ?? 0,
          avgScore: data.avgScore ?? 0,
          bestScore: data.bestScore ?? 0,
          streak: data.streak ?? 0,
          newWordsLearned: data.newWordsLearned ?? 0,
        });
      } catch (e) {
        console.log('[Profile] /api/stats 호출 실패:', e);

        if (!isMounted) return;

        setStats({
          totalSessions: 0,
          totalMinutes: 0,
          avgScore: 0,
          bestScore: 0,
          streak: 0,
          newWordsLearned: 0,
        });
      } finally {
        if (isMounted) setLoadingStats(false);
      }
    };

    // 처음 들어왔을 때 한 번 호출
    fetchStats();

    // 🔥 화면이 다시 포커스될 때마다 새로 호출
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isMounted) return;
      setLoadingStats(true); // 로딩 상태로 바꿔주고
      fetchStats();          // 다시 /api/stats 요청
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigation]);

  // ✅ 3. 포인트 계산: 통계 화면과 동일한 규칙 사용
  const getTotalPoints = () => {
    if (!stats) return 0;
    const pandaCount = Math.floor(stats.totalSessions / 3); // 예: 3회 = 판다 1개
    return pandaCount * 10; // 판다 1개 = 10점
  };

  const streakValue = stats ? stats.streak : 0;
  const pointsValue = stats ? getTotalPoints() : 0;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* === 헤더 === */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft color="#2c303c" size={24} />
            </Pressable>

            <View style={styles.headerLogoRow}>
              <Text style={styles.headerLogoText}>LING</Text>
              <PandaIcon size="small" />
              <Text style={styles.headerLogoText}>MATE</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>마이페이지</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 프로필 카드 */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderTitleRow}>
                <Text style={styles.cardHeaderIcon}>👤</Text>
                <Text style={styles.cardHeaderText}>프로필</Text>
              </View>
            </View>

            <View style={styles.profileRow}>
              <View style={styles.profileAvatarWrapper}>
                <Image
                  source={avatarUri ? { uri: avatarUri } : pandaImg}
                  style={styles.profileAvatar}
                />
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <View style={styles.profilePlanRow}>
                  <View style={styles.planDot} />
                  <Text style={styles.profilePlanText}>베이직</Text>
                </View>
              </View>

              <Pressable
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.settingsButtonText}>설정</Text>
              </Pressable>
            </View>
          </View>

          {/* 통계 카드 */}
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📆</Text>
            <Text style={styles.statLabel}>연속 학습일</Text>
            <Text style={styles.statValue}>
              {loadingStats ? '-' : streakValue}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statLabel}>획득 포인트</Text>
            <Text style={styles.statValue}>
              {loadingStats ? '-' : pointsValue}
            </Text>
          </View>

          {/* 메뉴들 */}
          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate('StudyStats')}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuLabel}>학습 통계</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate('ChatHistory')}
          >
            <Text style={styles.menuIcon}>💬</Text>
            <Text style={styles.menuLabel}>회화 스크립트</Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8eaf0',
  },
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
    paddingHorizontal: 16,
    paddingTop: 10, // insets.top 위에 살짝 여백
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#2c303c',
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  headerLogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  headerSubtitle: {
    marginTop: 4,
    marginLeft: 48, // back 버튼 + 간격만큼 밀어줌
    fontSize: 11,
    color: '#6b7280',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    rowGap: 12,
  },
  card: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  cardHeaderIcon: {
    fontSize: 18,
    color: '#2c303c',
  },
  cardHeaderText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2c303c',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    marginTop: 4,
  },
  profileAvatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileAvatar: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  profileEmail: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  profilePlanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 4,
  },
  planDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6b7280',
  },
  profilePlanText: {
    fontSize: 11,
    color: '#6b7280',
  },
  settingsButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  settingsButtonText: {
    fontSize: 13,
    color: '#2c303c',
    fontWeight: '500',
  },
  statCard: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  statIcon: {
    fontSize: 20,
    color: '#2c303c',
  },
  statLabel: {
    fontSize: 13,
    color: '#2c303c',
  },
  statValue: {
    marginLeft: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  menuItem: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#2c303c',
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2c303c',
  },
  bottomPandaWrapper: {
    alignItems: 'center',
    paddingTop: 24,
  },
  bottomPanda: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
