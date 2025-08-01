import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData, findMenuItemById } from './menuData';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MenuStackParamList, 'SubMenuLevel3'>;

export default function SubMenuLevel3({ route }: Props) {
  const { parentId } = route.params;
  const parentItem = findMenuItemById(mainMenuData, parentId);

  if (!parentItem?.children) return <Text>No further submenu.</Text>;

  return (
    <View>
      <FlatList
        data={parentItem.children}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
        )}
      />
    </View>
  );
}
