import { colors } from '@theme/index';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
  title: string;
  icon?: any;
  children?: any;
  hasDivider?: boolean;
  onPress: () => void;
};

export default function MenuItem({
  title,
  icon,
  children,
  hasDivider,
  onPress,
}: Props) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.menuItem}>
        <View style={styles.itemLeft}>
          {icon && (
            <Image
              source={icon}
              style={styles.avatar}
            />
          )}

          <Text style={styles.menuText}>{title}</Text>
        </View>
        {children && <Icon name="chevron-right" color="#999" size={20} />}
      </TouchableOpacity>
      {hasDivider && <View style={styles.divider} />}
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
