/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import { bootstrapAuth, fetchProfileIfNeeded } from '@store/slices/authSlice';
import { useAppSelector, useAppDispatch } from '@hooks';
import CustomHeader from '@components/CustomHeader';
import { closeDrawer } from '@store/slices/uiSlice';
import MenuDrawer from '@components/MenuDrawer';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, bootstrapped, user } = useAppSelector(
    (state: any) => state.auth,
  );
  const visible = useAppSelector((state: any) => state.ui.isDrawerOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  // useEffect(() => {
  //   if (bootstrapped && isAuthenticated) {
  //     dispatch(fetchProfileIfNeeded());
  //   }
  // }, [dispatch, bootstrapped, isAuthenticated]);

  // if (!bootstrapped) {
  //   return <SplashScreen />;
  // }

  return (
    <>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="App"
            component={AppTabs}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
        
      </Stack.Navigator>
     
    </>
  );
}
