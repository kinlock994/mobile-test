/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@navigation/MenuStack';
import { mainMenuData } from './menuData';
import MenuItem from '@components/MenuItem';
import SingleMenuItem from '@components/SingleMenuItem';

type Props = NativeStackScreenProps<MenuStackParamList, 'MainMenu'>;

const exploreData = [
  { id: 'vet', title: 'Vets for Pets' },
  { id: 'grooming', title: 'Pets Grooming' },
  { id: 'insurance', title: 'Pet Insurance' },
  { id: 'support', title: 'Support' },
  { id: 'findUs', title: 'Find Us' },
];

export default function MainMenu({ navigation }: Props) {
  return (
    <ScrollView>
      <FlatList
        data={mainMenuData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            icon={item.icon}
            children={item.children}
            isDirect={item.isDirect}
            onPress={() =>
              navigation.navigate('SubMenuLevel1', {
                parentId: item.id,
                title: item.title,
              })
            }
            hasDivider={true}
          />
        )}
      />
      <View
        style={{
          backgroundColor: '#F9F9F9',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          More to Explore
        </Text>
        <FlatList
          data={exploreData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SingleMenuItem
              title={item.title}
              onPress={() => navigation.navigate('MainMenu')}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}
