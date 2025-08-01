import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MenuStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<MenuStackParamsList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppTabs} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
    </Stack.Navigator>
  );
}
