// src/screens/ReviewScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";

type CardItem = {
  corrected: string;     // 교정 문장 또는 추천 문장
  explanation: string;   // 설명 or 추천 이유
  type: "feedback" | "suggestion";
};

export default function ReviewScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();

  const reviewCards: CardItem[] = route.params?.reviewCards || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#2c303c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>복습하기</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* 카드 리스트 */}
        <ScrollView contentContainerStyle={styles.cardList}>
          {reviewCards.length > 0 ? (
            reviewCards.map((item, i) => (
              <View key={i} style={styles.card}>
                <View style={styles.cardBg} />
                <View style={styles.cardContentRow}>
                  <Text style={styles.cardTextEn}>{item.corrected}</Text>
                  <Text style={styles.cardTextKr}>{item.explanation}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>저장된 복습 데이터가 없습니다.</Text>
            </View>
          )}
        </ScrollView>

        {/* 하단 버튼 */}
        <View style={styles.bottomButtonsRow}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.btnText}>홈으로</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E5E7ED" },
  root: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#d5d8e0",
  },
  backButton: { width: 32 },
  headerTitle: { fontSize: 18, fontWeight: "600" },

  cardList: { padding: 20, rowGap: 12, paddingBottom: 120 },
  card: { minHeight: 60, justifyContent: "center" },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(191,195,208,0.5)",
    borderRadius: 12,
  },
  cardContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cardTextEn: { fontSize: 16, fontWeight: "600", flex: 1, marginRight: 10 },
  cardTextKr: { fontSize: 14, color: "#4B5563", maxWidth: "45%", textAlign: "right" },

  emptyContainer: { marginTop: 50, alignItems: "center" },
  emptyText: { color: "#6b7280", fontSize: 16 },

  bottomButtonsRow: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#2C303C",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontSize: 14 },
});
