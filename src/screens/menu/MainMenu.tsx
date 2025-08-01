import React from 'react';
import { View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData } from './menuData';
import MenuItem from '@components/MenuItem';

type Props = NativeStackScreenProps<MenuStackParamList, 'MainMenu'>;

export default function MainMenu({ navigation }: Props) {
  return (
    <View>
      <FlatList
        data={mainMenuData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            icon={item.icon}
            children={item.children}
            onPress={() =>
              navigation.navigate('SubMenuLevel1', { parentId: item.id })
            }
            hasDivider={true}
          />
        )}
      />
    </View>
  );
}
