// src/screens/ChatScreen.tsx
import PandaIcon from '../components/PandaIcon';
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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft, Send, Mic } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GEMINI_API_KEY = '여기에_실제_API_KEY_입력';

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// history + prompt를 받아서 텍스트 응답만 뽑아주는 함수
async function callGemini(historyForGemini: any[], prompt: string): Promise<string> {
  const contents = [
    ...historyForGemini,
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 500,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Gemini API error response:', data);
    throw new Error('Gemini API Error');
  }

  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text ?? '')
      .join('') ?? '';

  return text || 'Sorry, I could not generate a response.';
}

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type RootStackParamList = {
  Home: undefined;
  Chat: { mode?: string };
};

export default function ChatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();

  const initialMode = route.params?.mode || 'casual';
  const [mode, setMode] = useState(initialMode);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! How are you today? Let's practice English!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 메시지 변경 시: 스크롤 + AsyncStorage 저장
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }

    const saveChatHistory = async () => {
      try {
        if (messages.length > 0) {
          await AsyncStorage.setItem(
            'last_chat_history',
            JSON.stringify(messages),
          );
        }
      } catch (e) {
        console.error('Failed to save chat history', e);
      }
    };

    saveChatHistory();
  }, [messages]);

  // 🔹 모드 변경 버튼 → Alert로 선택
  const handleModeChange = () => {
    Alert.alert(
      '회화 스타일 선택',
      '사용할 영어 스타일을 선택하세요.',
      [
        {
          text: '😊 Casual',
          onPress: () => setMode('casual'),
        },
        {
          text: '🎩 Formal',
          onPress: () => setMode('formal'),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };

  const handleFormSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const historyForGemini = newMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const prompt = `${input}

(Please reply in a ${mode} tone suitable for English learning. Keep it concise.)`;

      const responseText = await callGemini(historyForGemini, prompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      Alert.alert('Error', 'Failed to get response from AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.role === 'user' ? styles.userRow : styles.assistantRow,
      ]}>
      <View
        style={[
          styles.bubble,
          item.role === 'user' ? styles.userBubble : styles.assistantBubble,
        ]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}>
          <ChevronLeft color="#2c303c" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {mode === 'casual' ? '😊 Casual Mode' : '🎩 Formal Mode'}
        </Text>

        <TouchableOpacity onPress={handleModeChange}>
          <Text style={styles.modeButtonText}>모드 변경</Text>
        </TouchableOpacity>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <PandaIcon size="medium" />
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

      {/* 입력창 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Hello, how are you today?"
              placeholderTextColor="#9ca3af"
              multiline={false}
              onSubmitEditing={handleFormSubmit}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleFormSubmit}
            disabled={!input.trim() || isLoading}
            style={[
              styles.sendButton,
              (!input.trim() || isLoading) && styles.disabledButton,
            ]}>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    padding: 0,
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
