// src/screens/ChatHistoryScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Users,
  Clock,
  MoreHorizontal,
} from 'lucide-react-native';
import { conversationApi } from '../api/conversation';

type ChatItem = {
  sessionId: string;
  title: string;
  messageCount: number;
  createdAt: string;
};

type Props = {
  navigation: any;
};

// createdAt → "5 min ago" 같은 문자열로 변환
function formatTimeAgo(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} hr${diffHour > 1 ? 's' : ''} ago`;
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
}

export default function ChatHistoryScreen({ navigation }: Props) {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await conversationApi.getHistory(1, 50);
      // 명세서 응답: { data: [ ... ], meta: { page, limit, total } }
      const list = (res?.data ?? res) as any[];
      const meta = (res as any).meta;

      const mapped: ChatItem[] = list.map(item => ({
        sessionId: item.sessionId,
        title: item.title ?? 'Untitled',
        messageCount: item.messageCount ?? 0,
        createdAt: item.createdAt,
      }));

      setChats(mapped);
      setTotalCount(meta?.total ?? mapped.length);
    } catch (e) {
      console.log('loadHistory error', e);
      Alert.alert('오류', '대화 내역을 불러오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadHistory();
    } finally {
      setRefreshing(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePressItem = (item: ChatItem) => {
    // Script 화면으로 sessionId 전달
    navigation.navigate('Script', { sessionId: item.sessionId });
  };

  const handleClearAll = () => {
    if (!chats.length) return;

    Alert.alert(
      '대화 내역 비우기',
      '모든 대화 내역이 삭제됩니다. 계속할까요?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await conversationApi.deleteAll();
              setChats([]);
              setTotalCount(0);
            } catch (e) {
              console.log('deleteAll error', e);
              Alert.alert(
                '오류',
                '대화 내역을 삭제하는 중 문제가 발생했습니다.',
              );
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: ChatItem }) => (
    <Pressable style={styles.card} onPress={() => handlePressItem(item)}>
      <View style={styles.cardInner}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.cardMetaRow}>
          <View style={styles.metaGroup}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.messageCount}</Text>
          </View>

          <View style={[styles.metaGroup, { marginLeft: 12 }]}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{formatTimeAgo(item.createdAt)}</Text>
          </View>

          <View style={{ flex: 1 }} />

          <MoreHorizontal size={18} color="#9CA3AF" />
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>대화 내역</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 상단 타이틀 */}
        <View style={styles.titleBlock}>
          <Text style={styles.chatsLabel}>
            Chats ({totalCount ?? chats.length})
          </Text>
        </View>

        {/* 로딩 표시 */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={item => item.sessionId}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>저장된 대화 내역이 없습니다.</Text>
              </View>
            }
          />
        )}

        {/* 하단 "대화 내역 비우기" 버튼 */}
        <View style={styles.bottom}>
          <Pressable
            style={[
              styles.clearButton,
              !chats.length && { opacity: 0.4 },
            ]}
            onPress={handleClearAll}
            disabled={!chats.length}
          >
            <Text style={styles.clearButtonText}>대화 내역 비우기</Text>
          </Pressable>
        </View>
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

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    backgroundColor: '#E5E7ED',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  titleBlock: {
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  chatsLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    rowGap: 10,
  },

  card: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  bottom: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  clearButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(191, 195, 208, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#111827',
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  
});
