import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData, findMenuItemById } from './menuData';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MenuStackParamList, 'SubMenuLevel2'>;

export default function SubMenuLevel2({ route, navigation }: Props) {
  const { parentId } = route.params;
  const parentItem = findMenuItemById(mainMenuData, parentId);

  if (!parentItem?.children) return <Text>No submenu found.</Text>;

  return (
    <View>
      <FlatList
        data={parentItem.children}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SubMenuLevel3', { parentId: item.id })}>
            <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
