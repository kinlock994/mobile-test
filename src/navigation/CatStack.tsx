import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatScreen from '@screens/Cat/CatScreen';
import CatFoodScreen from '@screens/Cat/CatFoodScreen';
import CatDryFoodScreen from '@screens/Cat/CatDryFoodScreen';
import CatWetFoodScreen from '@screens/Cat/CatWetFoodScreen';
import CatTreatsScreen from '@screens/Cat/CatTreatsScreen';
import CatHealthCareScreen from '@screens/Cat/CatHealthCareScreen';
import CatTreatsOfferScreen from '@screens/Cat/CatTreatsOfferScreen';



export type CatStackParamList = {
  CatAll: undefined;
  CatFoodScreen: undefined;
  CatDryFoodScreen: undefined;
  CatWetFoodScreen: undefined;
  CatTreatsScreen: undefined;
  CatTreatsOfferScreen: undefined;
  CatHealthCareScreen: undefined;
};

const Stack = createNativeStackNavigator<CatStackParamList>();

export default function CatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CatAll" component={CatScreen} />
      <Stack.Screen name="CatFoodScreen" component={CatFoodScreen} />
      <Stack.Screen name="CatDryFoodScreen" component={CatDryFoodScreen} />
      <Stack.Screen name="CatWetFoodScreen" component={CatWetFoodScreen} />
      <Stack.Screen name="CatTreatsScreen" component={CatTreatsScreen} />
      <Stack.Screen name="CatTreatsOfferScreen" component={CatTreatsOfferScreen} />
      <Stack.Screen name="CatHealthCareScreen" component={CatHealthCareScreen} />
    </Stack.Navigator>
  );
}
