import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData, findMenuItemById } from './menuData';

type Props = NativeStackScreenProps<MenuStackParamList, 'SubMenuLevel1'>;

export default function SubMenuLevel1({ navigation, route }: Props) {
  const parent = findMenuItemById(mainMenuData, route.params.parentId);
  const children = parent?.children ?? [];

  const handlePress = (item: typeof parent) => {
    if (item) {
      if (item.children) {
        navigation.navigate('SubMenuLevel2', { parentId: item.id });
      } else if (item.targetScreen) {
        navigation.navigate(item.targetScreen as any, { fromMenuId: item.id });
      } else if (item.tabTarget) {
        navigation.navigate(item.tabTarget.tab as any, {
          screen: item.tabTarget.screen,
          params: item.tabTarget.params,
        });
      }
    }
  };

  return (
    <View>
      <FlatList
        data={children}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
