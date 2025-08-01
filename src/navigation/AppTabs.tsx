/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabHeaderProps,
} from '@react-navigation/bottom-tabs';
import ProfileScreen from '@screens/profile/ProfileScreen';
import ProductsStack from './ProductsStack';
import CustomTabBar from '@components/CustomTabBar';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import MenuDrawer from '@components/MenuDrawer';
import { closeDrawer } from '@store/slices/uiSlice';
import AboutScreen from '@screens/about/AboutScreen';
import CustomHeader from '@components/CustomHeader';
import WalletScreen from '@screens/wallet/WalletScreen';
import MenuStack from './MenuStack';

export type AppTabsParamList = {
  Products: undefined;
  Profile: undefined;
  About: undefined;
  Wallet: undefined;
  MenuStack: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export default function AppTabs() {
  const visible = useAppSelector((state: any) => state.ui.isDrawerOpen);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          header: props => <CustomHeader {...props} avatar={user?.avatar} />,
        }}
      >
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="MenuStack" component={MenuStack} />
      </Tab.Navigator>
      <MenuDrawer visible={visible} onClose={() => dispatch(closeDrawer())} />
    </>
  );
}
