/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '@screens/profile/ProfileScreen';
import ProductsStack from './ProductsStack';
import CustomTabBar from '@components/CustomTabBar';
import { useAppSelector } from '@hooks/useAppSelector';
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
  const user = useAppSelector(state => state.auth.user);
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
    </>
  );
}
