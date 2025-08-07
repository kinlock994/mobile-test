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
import CatStack from './CatStack';
import DogStack from './DogStack';

export type AppTabsParamList = {
  Products: undefined;
  Profile: undefined;
  About: undefined;
  Wallet: undefined;
  MenuStack: undefined;
  Dog: undefined;
  Cat: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export default function AppTabs() {
  const user = useAppSelector(state => state.auth.user);
  return (
    <>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          header: props => <CustomHeader {...props} avatar={user?.avatar} />,
        })}
      >
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="MenuStack" component={MenuStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Dog"
          component={DogStack}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Cat"
          component={CatStack}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </>
  );
}
