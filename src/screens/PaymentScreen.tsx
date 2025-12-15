import React from 'react';
import IMP from 'iamport-react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert, View, ActivityIndicator } from 'react-native';

export default function PaymentScreen() {
  const navigation = useNavigation();

  // 결제 결과 처리 함수
  const callback = (response: any) => {
    console.log('결제 응답:', response);

    // imp_success가 true면 결제 성공
    if (response.imp_success === 'true' || response.imp_success === true) {
      Alert.alert('결제 성공', '프리미엄 구독이 시작되었습니다!', [
        { 
          text: '확인', 
          onPress: () => {
            navigation.navigate('Subscription' as never); 
          }
        },
      ]);
    } else {
      Alert.alert('결제 실패', response.error_msg);
      navigation.goBack();
    }
  };

  return (
    <IMP.Payment
      userCode={'imp16572580'}
      loading={<View style={{flex: 1, justifyContent:'center'}}><ActivityIndicator size="large" color="#FEE500" /></View>}
      data={{
        pg: 'kakaopay',
        pay_method: 'card',
        name: 'LingoMate 프리미엄 구독',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: 100,
        buyer_email: 'test@lingomate.com',
        buyer_name: '테스트유저',
        buyer_tel: '010-1234-5678',
        app_scheme: 'lingomate',
        escrow: false,  // 👈 ✅ 이거 추가함! (에러 해결)
      }}
      callback={callback}
    />
  );
}