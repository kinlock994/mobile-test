/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '@screens/products/ProductListScreen';
import ProductDetailScreen from '@screens/products/ProductDetailsScreen';
import ProductCreateScreen from '@screens/products/ProductCreateScreen';
import ProductEditScreen from '@screens/products/ProductEditScreen';
// import CustomHeader from '@components/CustomHeader';
import { useAppSelector } from '@hooks/useAppSelector';
import CustomHeader from '@components/CustomHeader';

export type ProductsStackParamList = {
  ProductList: undefined;
  ProductDetail: { id: string };
  ProductCreate: undefined;
  ProductEdit: { id: string };
};

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export default function ProductsStack() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProductCreate" component={ProductCreateScreen} />
      <Stack.Screen
        name="ProductEdit"
        component={ProductEditScreen}
        options={{ title: 'Edit product', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
