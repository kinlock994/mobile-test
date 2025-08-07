import { colors } from '@theme/index';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  title: string;
  onPress: () => void;
};

export default function SingleMenuItem({
  title,
  onPress,
}: Props) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.menuItem}>
        <View style={styles.itemLeft}>
          <Text style={styles.menuText}>{title}</Text>
        </View>
        <Feather name="arrow-up-right" color="#000" size={24} />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: colors.primary,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  scroll: {
    flex: 1,
  },
});
