// src/screens/AccountManageScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';

type Props = {
  navigation: any;
};

export default function AccountManageScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        {/* 상단 헤더 */}
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>계정 관리</Text>
          <View style={{ width: 24 }} />{/* 오른쪽 정렬용 빈 공간 */}
        </View>

        {/* 옵션 리스트 */}
        <View style={styles.content}>
          {/* 로그아웃 */}
          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('LogoutModal')}
          >
            <Text style={styles.itemText}>로그아웃</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </Pressable>

          {/* 탈퇴하기 */}
          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('DeleteAccount')}
          >
            <Text style={styles.itemText}>탈퇴하기</Text>
            <Text style={styles.arrow}>{'>'}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  /* 헤더 */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backArrow: {
    fontSize: 22,
    color: '#2c303c',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c303c',
  },

  /* 내용 영역 */
  content: {
    marginTop: 40,
    rowGap: 16,
  },

  /* 각 옵션 카드 */
  itemBox: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(191,195,208,0.5)',
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 17,
    color: '#2c303c',
  },
  arrow: {
    fontSize: 20,
    color: '#2c303c',
  },
});
