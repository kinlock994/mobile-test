// MenuStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '@screens/menu/MainMenu';
import SubMenuLevel1 from '@screens/menu/SubMenuLevel1';
import SubMenuLevel2 from '@screens/menu/SubMenuLevel2';
import SubMenuLevel3 from '@screens/menu/SubMenuLevel3';

export type MenuStackParamList = {
  MainMenu: undefined;
  SubMenuLevel1: { parentId: string, title?: string, fromTab?: string };
  SubMenuLevel2: { parentId: string, title?: string, fromTab?: string };
  SubMenuLevel3: { parentId: string, title?: string, fromTab?: string };
};

const Stack = createNativeStackNavigator<MenuStackParamList>();

export default function MenuStack() {
  return (
    <Stack.Navigator initialRouteName="MainMenu">
      <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Shop by Pets' }} />
      <Stack.Screen name="SubMenuLevel1" component={SubMenuLevel1}  />
      <Stack.Screen name="SubMenuLevel2" component={SubMenuLevel2}  />
      <Stack.Screen name="SubMenuLevel3" component={SubMenuLevel3}  />
    </Stack.Navigator>
  );
}
