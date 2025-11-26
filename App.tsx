// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/login';
import ProfileScreen from './src/screens/Profile'; // ⬅ 추가

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Lingomate' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: '마이페이지', headerShown: false }} // 헤더 숨기고 자체 헤더 사용
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
