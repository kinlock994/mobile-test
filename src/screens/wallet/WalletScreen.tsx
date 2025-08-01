// HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import MenuDrawer from '../../components/MenuDrawer';

export default function WalletScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuText}>{menuOpen ? '✕' : '☰'}</Text>
        </TouchableHighlight>
        <Text style={styles.headerTitle}>Wallet Screen</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Wallet screen.</Text>
      </View>
      <MenuDrawer visible={menuOpen} onClose={() => setMenuOpen(false)} />
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
