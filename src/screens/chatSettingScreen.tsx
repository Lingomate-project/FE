import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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

// 옵션 버튼용 타입
type OptionButtonProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const OptionButton: React.FC<OptionButtonProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

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

        {/* Section 2: Style */}
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
          <View style={styles.optionsWrapper}>
            <OptionButton
              label="👩 Female"
              isSelected={gender === 'female'}
              onPress={() => setGender('female')}
            />
            <OptionButton
              label="👨 Male"
              isSelected={gender === 'male'}
              onPress={() => setGender('male')}
            />
          </View>
        </View>

        {/* 저장 + 시작 버튼 */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndStart}
          activeOpacity={0.9}
        >
          <Text style={styles.saveButtonText}>저장하고 대화 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionLabel: {
    fontSize: 14,
    color: '#333333',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#000000',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
