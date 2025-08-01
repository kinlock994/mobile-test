/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Product,
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from '@store/api/productApi';
import { ProductsStackParamList } from '@navigation/ProductsStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductCard from '@components/ui/ProductCard';
import { colors } from '@theme/index';

const PER_PAGE = 10;

type ScreenRoute = NativeStackNavigationProp<
  ProductsStackParamList,
  'ProductList'
>;

export default function ProductListScreen() {
  const navigation = useNavigation<ScreenRoute>();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);
  const [hasNext, setHasNext] = useState(true);

  const {
    data: firstPage,
    isFetching: loadingFirst,
    isError: firstError,
    refetch: refetchFirst,
  } = useGetProductsQuery({ page: 1, per_page: PER_PAGE });

  const [fetchMore, { isFetching: loadingMore }] = useLazyGetProductsQuery();

  useEffect(() => {
    if (firstPage?.products) {
      setItems(firstPage.products);
      setHasNext(firstPage.meta.current_page < firstPage.meta.total_pages);
    }
  }, [firstPage]);

  const onRefresh = useCallback(() => {
    setPage(1);
    refetchFirst();
  }, [refetchFirst]);

  const loadMore = async () => {
    if (!hasNext || loadingMore) return;
    const nextPage = page + 1;
    const res = await fetchMore({
      page: nextPage,
      per_page: PER_PAGE,
    }).unwrap();
    setItems(prev => [...prev, ...res.products]);
    setPage(nextPage);
    setHasNext(res.meta.current_page < res.meta.total_pages);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', {id: item.id})}
    >
      <ProductCard
        title={item.title}
        subtitle={item.description}
        imageUrl={item.image}
      />
    </TouchableOpacity>
  );

  if (loadingFirst && !items.length) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (firstError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Could not load products.</Text>
        <TouchableOpacity onPress={refetchFirst}>
          <Text style={styles.retry}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={p => p.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 24 }}
        refreshing={loadingFirst}
        onRefresh={onRefresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  desc: { color: '#555' },
  error: { color: '#ff4d4f', marginBottom: 8 },
  retry: { color: '#1E90FF', fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  fabText: { color: '#fff', fontSize: 30, lineHeight: 32 },
});
