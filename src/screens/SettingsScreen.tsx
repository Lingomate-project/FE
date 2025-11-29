import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';

export default function SettingsScreen({ navigation }: any) {
  const [pushEnabled, setPushEnabled] = useState(false);

  const togglePush = () => {
    setPushEnabled(prev => !prev);
    console.log('[RN] 푸시 알림 상태:', !pushEnabled ? 'ON' : 'OFF');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <View style={styles.bg} />

        {/* 프로필 */}
        <View style={styles.profileWrapper}>
          <View style={styles.profileCircle} />
          <View style={styles.profileInner} />
        </View>
        <Text style={styles.profileSubtitle}>사진 변경</Text>

        {/* 이름 / 변경하기 */}
        <Text style={styles.nameLabel}>이름</Text>
        <View style={styles.nameDivider} />
        <Pressable>
          <Text style={styles.nameAction}>변경하기</Text>
        </Pressable>

        {/* ===== 카드들 (이름 밑으로 전부 내려감) ===== */}
        <View style={styles.cardsContainer}>
          {/* 비밀번호 변경 */}
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={styles.cardLabel}>비밀번호 변경</Text>
          </Pressable>

          {/* 푸시 알림 */}
          <Pressable style={styles.card} onPress={togglePush}>
            <Text style={styles.cardLabel}>푸시 알림</Text>

            <View
              style={[
                styles.toggleTrack,
                pushEnabled && styles.toggleTrackOn,
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  pushEnabled && styles.toggleThumbOn,
                ]}
              />
            </View>
          </Pressable>

          {/* 구독 */}
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.cardLabel}>구독</Text>
          </Pressable>

          {/* 계정 관리 */}
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('AccountManage')}
          >
            <Text style={styles.cardLabel}>계정 관리</Text>
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
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E5E7ED',
  },

  // 프로필
  profileWrapper: {
    position: 'absolute',
    width: 98,
    height: 98,
    left: 155,
    top: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCircle: {
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: '#2c303c',
  },
  profileInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    position: 'absolute',
  },
  profileSubtitle: {
    position: 'absolute',
    left: 170,
    top: 250,
    color: '#6A6E79',
    fontSize: 17,
  },

  // 이름 row
  nameLabel: {
    position: 'absolute',
    left: 43,
    top: 310,
    fontSize: 17,
    color: '#2c303c',
  },
  nameDivider: {
    position: 'absolute',
    width: 350,
    top: 350,
    left: 19,
    borderBottomWidth: 1,
    borderColor: '#6A6E79',
  },
  nameAction: {
    position: 'absolute',
    left: 306,
    top: 310,
    fontSize: 17,
    color: '#6A6E79',
  },

  // 카드 컨테이너 (이름 밑으로 전체 내려감)
  cardsContainer: {
    marginTop: 380,
    paddingHorizontal: 20,
    rowGap: 12,
  },

  // 카드 스타일
  card: {
    width: '100%',
    height: 61,
    backgroundColor: 'rgba(191, 195, 208, 0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardLabel: {
    fontSize: 17,
    color: '#2c303c',
  },

  // 토글
  toggleTrack: {
    width: 36,
    height: 20,
    backgroundColor: '#D2D5DA',
    borderRadius: 10,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  toggleTrackOn: {
    backgroundColor: '#2c303c',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    left: 2,
    top: 2,
  },
  toggleThumbOn: {
    left: 18, // 36 - 16 - 2
  },
});
