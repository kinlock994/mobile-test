import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { mainMenuData, findMenuItemById } from './menuData';
import { MenuStackParamList } from '@navigation/MenuStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MenuStackParamList, 'SubMenuLevel1'>;

export default function SubMenuLevel1({ route, navigation }: Props) {
  const { parentId } = route.params;
  const parentItem = findMenuItemById(mainMenuData, parentId);

  if (!parentItem?.children) return <Text>No submenu found.</Text>;

  return (
    <View>
      <FlatList
        data={parentItem.children}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SubMenuLevel2', { parentId: item.id })}>
            <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
