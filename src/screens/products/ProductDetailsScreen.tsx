/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackParamList } from '@navigation/ProductsStack';
import { useGetProductByIdQuery } from '@store/api/productApi';
import { Card } from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AddToCartBar from '@components/AddToCardBar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import CustomTabBar from '@components/CustomTabBar';

type ScreenRoute = RouteProp<ProductsStackParamList, 'ProductDetail'>;

type NavigateRoute = NativeStackNavigationProp<
  ProductsStackParamList,
  'ProductEdit'
>;

export default function ProductDetailsScreen() {
  const { params } = useRoute<ScreenRoute>();
  const { data, isFetching, error, refetch } = useGetProductByIdQuery(
    params.id,
  );
  const navigation = useNavigation<NavigateRoute>();

  /** Add-to-cart handler */
  const handleAdd = useCallback(() => {
    // TODO: dispatch Redux action or any state update to add the item
    console.log('Add product to cart →', params.id);
  }, [params.id]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{paddingHorizontal: 12}}
  //         onPress={() => navigation.navigate('ProductEdit', {id: data.id})}>
  //         <Text style={{color: '#1E90FF', fontWeight: '600'}}>Edit</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, data]);
  useLayoutEffect(() => {
    const parent = navigation.getParent();
     console.log('Parent navigator:', parent?.getState().type); 

    if (parent && parent.getState().type === 'tab') { // Ensure it's the tab navigator
      // Set the AddToCartBar when this screen is focused
      parent.setOptions({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBar: (props: BottomTabBarProps) => <AddToCartBar price={10} onAdd={handleAdd} />,
      });

      // Cleanup function to restore the original CustomTabBar when leaving this screen
      return () => {
        parent.setOptions({
          tabBar: (props: BottomTabBarProps) => <CustomTabBar {...props} />,
        });
      };
    }
  }, [navigation, handleAdd]);
  if (isFetching && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load product.</Text>
        <Text style={styles.retry} onPress={() => refetch()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ padding: 0 }}>
        {data.image && (
          <Image
            source={{ uri: data.image }}
            style={{
              width: '100%',
              height: 220,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            resizeMode="cover"
          />
        )}

        <View style={{ padding: 16 }}>
          <Text style={styles.title}>{data.title}</Text>
          {data.description && (
            <Text style={styles.desc}>{data.description}</Text>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Created:</Text>
            <Text style={styles.metaVal}>
              {new Date(data.createdAt).toLocaleDateString()}
            </Text>
          </View>

          {data.updatedAt !== data.createdAt && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Updated:</Text>
              <Text style={styles.metaVal}>
                {new Date(data.updatedAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </ScrollView>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: '#ff4d4f', marginBottom: 8 },
  retry: { color: '#1E90FF', fontWeight: '600' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  desc: { fontSize: 16, color: '#555', marginBottom: 16 },
  metaRow: { flexDirection: 'row', marginTop: 4 },
  metaLabel: { fontWeight: '600', marginRight: 4, color: '#555' },
  metaVal: { color: '#333' },
});
