import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DogScreen from '@screens/Dog/DogScreen';
import DogFoodScreen from '@screens/Dog/DogFoodScreen';
import DogDryFoodScreen from '@screens/Dog/DogDryFoodScreen';
import DogWetFoodScreen from '@screens/Dog/DogWetFoodScreen';
import DogTreatsScreen from '@screens/Dog/DogTreatsScreen';
import DogTreatsOfferScreen from '@screens/Dog/DogTreatsOfferScreen';


export type DogStackParamList = {
  DogAll: undefined;
  DogFoodScreen: undefined;
  DogDryFoodScreen: undefined;
  DogWetFoodScreen: undefined;
  DogTreatsScreen: undefined;
  DogTreatsOfferScreen: undefined;
  DogTreatsChewsScreen: undefined;
};

const Stack = createNativeStackNavigator<DogStackParamList>();

export default function DogStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DogAll" component={DogScreen} />
      <Stack.Screen name="DogFoodScreen" component={DogFoodScreen} />
      <Stack.Screen name="DogDryFoodScreen" component={DogDryFoodScreen} />
      <Stack.Screen name="DogWetFoodScreen" component={DogWetFoodScreen} />
      <Stack.Screen name="DogTreatsScreen" component={DogTreatsScreen} />
      <Stack.Screen name="DogTreatsOfferScreen" component={DogTreatsOfferScreen} />
      <Stack.Screen name="DogTreatsChewsScreen" component={DogTreatsOfferScreen} />
    </Stack.Navigator>
  );
}
