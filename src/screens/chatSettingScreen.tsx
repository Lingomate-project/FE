import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import PandaIcon from '../components/PandaIcon'; 

// 네비게이션 타입 정의
type RootStackParamList = {
  ChatSettings: { initialMode?: 'casual' | 'formal' };
  Chat: { 
    mode: 'casual' | 'formal';
    region: 'US' | 'UK' | 'AUS';
    gender: 'male' | 'female';
  };
};

type ChatSettingsRouteProp = RouteProp<RootStackParamList, 'ChatSettings'>;

export default function ChatSettingsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<ChatSettingsRouteProp>();

  // 초기값 설정 
  const initialMode = route.params?.initialMode || 'casual';

  // 상태 관리
  const [region, setRegion] = useState<'US' | 'UK' | 'AUS'>('US');
  const [mode, setMode] = useState<'casual' | 'formal'>(initialMode);
  const [gender, setGender] = useState<'male' | 'female'>('female');

  const handleSaveAndStart = () => {
    // 설정한 값을 가지고 채팅 화면으로 이동
    navigation.navigate('Chat', {
      mode,
      region,
      gender,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#000" size={30} />
        </TouchableOpacity>
        
       
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>LING</Text>
          <PandaIcon size="small" /> 
          <Text style={styles.logoText}>MATE</Text>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>회화 설정</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Section 1: Region (국가/발음) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Region / Accent</Text>
          <View style={styles.optionsWrapper}>
            <OptionButton 
              label="🇺🇸 United States" 
              isSelected={region === 'US'} 
              onPress={() => setRegion('US')} 
            />
            <OptionButton 
              label="🇬🇧 United Kingdom" 
              isSelected={region === 'UK'} 
              onPress={() => setRegion('UK')} 
            />
            <OptionButton 
              label="🇦🇺 Australia" 
              isSelected={region === 'AUS'} 
              onPress={() => setRegion('AUS')} 
            />
          </View>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style</Text>
          <View style={styles.optionsWrapper}>
            <OptionButton 
              label="😊 Casual English" 
              isSelected={mode === 'casual'} 
              onPress={() => setMode('casual')} 
            />
            <OptionButton 
              label="🎓 Formal English" 
              isSelected={mode === 'formal'} 
              onPress={() => setMode('formal')} 
            />
          </View>
        </View>

        {/* Section 3: Gender/Tone (성별) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Tone</Text>
          <View style={styles.option
