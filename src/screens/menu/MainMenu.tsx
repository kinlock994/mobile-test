import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData } from './menuData';

type Props = NativeStackScreenProps<MenuStackParamList, 'MainMenu'>;

export default function MainMenu({ navigation }: Props) {
  return (
    <View>
      <FlatList
        data={mainMenuData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SubMenuLevel1', { parentId: item.id })}>
            <Text style={{ fontSize: 18, padding: 10 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
