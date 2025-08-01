/* eslint-disable @typescript-eslint/no-unused-vars */
// components/CustomHeader.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@theme';
import { useNavigation } from '@react-navigation/native';

type Props = BottomTabHeaderProps & {
  avatar?: string | number; // remote URL or local asset
  onAvatarPress?: (e: GestureResponderEvent) => void;
  onCartPress?: (e: GestureResponderEvent) => void;
};

const ORANGE = colors.primary;
const RADIUS = 18;

const CustomHeader: React.FC<Props> = ({
  navigation,
  avatar,
  onAvatarPress,
  onCartPress,
}) => {
  const insets = useSafeAreaInsets();
  const currentNavigation = useNavigation();

  const navigateIfExists = (screen: string) => {
    if (navigation.getState().routeNames.includes(screen as never)) {
      navigation.navigate(screen as never);
    }
  };

  const handleBackPress = () => {
    currentNavigation.goBack();
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          marginTop: insets.top,
        },
      ]}
    >
      <View style={styles.actionGroup}>
        <HeaderIcon
          name="person-circle-outline"
          onPress={onAvatarPress ?? (() => navigateIfExists('Profile'))}
        />
      </View>

      {/* Title – middle */}
      <TouchableOpacity onPress={handleBackPress} style={styles.title}>
        <Image source={require('../assets/Hedgehog.png')} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.actionGroup}>
        <HeaderIcon
          name="cart-outline"
          onPress={onCartPress ?? (() => navigateIfExists('Cart'))}
        />
      </View>
    </View>
  );
};

/** Small circular orange-accent buttons */
const HeaderIcon = ({
  name,
  onPress,
}: {
  name: string;
  onPress: (e: GestureResponderEvent) => void;
}) => (
  <TouchableOpacity style={styles.iconBtn} onPress={onPress} hitSlop={hitSlop}>
    <Ionicons name={name} size={22} color={ORANGE} />
  </TouchableOpacity>
);

const hitSlop = { top: 8, bottom: 8, left: 8, right: 8 };

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 4, 
    zIndex: 20,
    elevation: 20
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  actionGroup: {
    flexDirection: 'row',
  },
  iconBtn: {
    backgroundColor: '#fff7ed', // subtle orange tint
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonWrapper: {
    padding: 10, // Adjust padding as needed
  },
});

export default CustomHeader;
