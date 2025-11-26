import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft, Send, Mic } from 'lucide-react-native';

// 텍스트 디코딩 폴리필 (스트리밍 데이터 처리를 위해 필요)
import 'text-encoding-polyfill';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

// 네비게이션 타입 정의 (프로젝트 설정에 따라 다를 수 있음)
type RootStackParamList = {
  Home: undefined;
  Chat: { mode?: string };
};

export default function ChatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  
  // 파라미터가 없으면 기본값 'casual'
  const initialMode = route.params?.mode || 'casual';
  const [mode, setMode] = useState(initialMode);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello how are you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 메시지 추가될 때마다 스크롤 내리기
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'casual' ? 'formal' : 'casual'));
  };

  const handleFormSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 주의: 실제 에뮬레이터에서 localhost는 10.0.2.2 (Android) 또는 localhost (iOS)
      const apiUrl = Platform.OS === 'android' 
        ? 'http://10.0.2.2:3000/api/chat' 
        : 'http://localhost:3000/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mode,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      
      // --- 임시 응답 시뮬레이션 (백엔드 연동 전 테스트용) ---

      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Echo (${mode}): ${userMessage.content}`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
      // ----------------------------------------------------

    } catch (error) {
      console.error('Chat error:', error);
      Alert.alert('Error', 'Failed to send message');
      setIsLoading(false);
    }
  };

  // 렌더링 아이템 (FlatList용)
  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageRow, 
      item.role === 'user' ? styles.userRow : styles.assistantRow
    ]}>
      <View style={[
        styles.bubble,
        item.role === 'user' ? styles.userBubble : styles.assistantBubble
      ]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <ChevronLeft color="#2c303c" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === 'casual' ? '😊 Casual Mode' : '🎩 Formal Mode'}
        </Text>
        <TouchableOpacity onPress={toggleMode}>
          <Text style={styles.modeButtonText}>모드 변경</Text>
        </TouchableOpacity>
      </View>

      {/* Messages Area */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
               {/* 로컬 이미지를 사용할 경우 require('./path/to/image.png') 사용 */}
               {/* 여기서는 플레이스홀더로 대체 */}
              <Image
                source={{ uri: 'https://github.com/shadcn.png' }} 
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </View>
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
               <View style={styles.assistantBubble}>
                 <ActivityIndicator color="#6b7280" size="small" />
               </View>
            </View>
          ) : null
        }
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Hello, how are you today?"
              placeholderTextColor="#9ca3af"
              multiline={false}
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleFormSubmit}
            disabled={!input.trim() || isLoading}
            style={[styles.sendButton, (!input.trim() || isLoading) && styles.disabledButton]}
          >
            <Send color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaf0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c303c',
  },
  iconButton: {
    padding: 4,
  },
  modeButtonText: {
    fontSize: 12,
    color: '#2c303c',
    textDecorationLine: 'underline',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  mascotContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  mascotCircle: {
    width: 128,
    height: 128,
    backgroundColor: 'white',
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#2c303c',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mascotImage: {
    width: 100,
    height: 100,
  },
  messageRow: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#b8bcc9',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#d5d8e0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#2c303c',
    fontSize: 14,
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d5d8e0',
    borderTopWidth: 1,
    borderTopColor: '#c5c8d4',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#2c303c',
    fontSize: 14,
    padding: 0, // Android padding reset
  },
  micButton: {
    padding: 4,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2c303c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});