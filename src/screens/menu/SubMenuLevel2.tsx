/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData, findMenuItemById } from './menuData';
import MenuItem from '@components/MenuItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<MenuStackParamList, 'SubMenuLevel2'>;

export default function SubMenuLevel2({ navigation, route }: Props) {
  const { parentId, title } = route.params;
  const parent = findMenuItemById(mainMenuData, parentId);
  const children = parent?.children ?? [];

  const handlePress = (item: typeof parent) => {
    if (item) {
      if (item.children) {
        navigation.navigate('SubMenuLevel3', { parentId: item.id, title });
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}

        >
          <Ionicons name="chevron-back-circle-outline" size={20} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('')}
   
        >
          <Ionicons name="close" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, title]);

  return (
    <View>
      <FlatList
        data={children}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            onPress={() => handlePress(item)}
            hasDivider={true}
            children={item.children}
          />
        )}
      />
    </View>
  );
}
