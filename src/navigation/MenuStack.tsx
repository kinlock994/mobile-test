import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';

export type MenuStackParamsList = {
  MainTabs: undefined;
  MenuScreen: undefined;
};

const Stack = createNativeStackNavigator<MenuStackParamsList>();

export default function MenuStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppTabs} />
      <Stack.Screen name="MenuStack" component={MenuScreen} />
    </Stack.Navigator>
  );
}
