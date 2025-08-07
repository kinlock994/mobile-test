import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DogTreatsOfferScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dog Treats Offer</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Dog Treats Offer screen.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuButton: {
    marginRight: 20,
  },
  menuText: {
    fontSize: 26,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
});
