/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useGetProfileQuery } from '@store/api/authApi';
import { useAppDispatch } from '@hooks';
import { signOut } from '@store/slices/authSlice';
import { removeTokens } from '@services/storage';

import { Card, Button } from '@components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppTabsParamList } from '@navigation/AppTabs';

// type Props = NativeStackScreenProps<AppTabsParamList, 'Profile'>;

export default function ProfileScreen() {
  const { data, isFetching, error, refetch } = useGetProfileQuery();
  const dispatch = useAppDispatch();
  const onLogout = async () => {
    dispatch(signOut());
    await removeTokens();
  };

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
        <Text style={styles.error}>Failed to load profile</Text>
        <Button title="Retry" onPress={() => refetch()} />
        <Button title="Log out" onPress={onLogout} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{data?.displayName}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
        <Text style={styles.value}>{data?.email}</Text>

        <Button title="Log out" onPress={onLogout} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { color: '#555', fontSize: 14, fontWeight: '500' },
  value: { fontSize: 16, marginTop: 4 },
  error: { color: '#ff4d4f', marginBottom: 12 },
});
