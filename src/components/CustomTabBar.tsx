/* eslint-disable @typescript-eslint/no-unused-vars */
// components/CustomTabBar.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '@theme';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { toggleDrawer } from '@store/slices/uiSlice';
import { useAppSelector } from '@hooks/useAppSelector';
import { RootState } from '@store/index';

const TAB_WIDTH = 64;
const ORANGE = colors.primary;
const WHITE = colors.white;

const getFallbackIcon = (routeName: string, color: string) => {
  const nameMap: Record<string, string> = {
    Products: 'storefront-outline',
    Profile: 'happy-outline',
    About: 'information-circle-outline',
    Wallet: 'wallet',
    MenuStack: 'compass'
    // add more screens if needed
  };
  return (
    <Ionicons name={nameMap[routeName] ?? 'ellipse'} color={color} size={24} />
  );
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const visible = useAppSelector(
    (stateRedux: RootState) => stateRedux.ui.isDrawerOpen,
  );
  const insets = useSafeAreaInsets();
  const scales = useRef(state.routes.map(() => new Animated.Value(1))).current;
  const dispatch = useAppDispatch();

  const handlePress = (
    index: number,
    routeName: string,
    isFocused: boolean,
  ) => {
    if (!isFocused) {
      Animated.sequence([
        Animated.spring(scales[index], {
          toValue: 1.2,
          useNativeDriver: true,
          speed: 20,
          bounciness: 10,
        }),
        Animated.spring(scales[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      navigation.navigate(routeName);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom: insets.bottom + 16,
          paddingHorizontal: state.routes.length * TAB_WIDTH * 0.08,
        },
      ]}
    >
      {/* <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.85}
        style={styles.touchable}
        onPress={() => dispatch(toggleDrawer())}
      >
        <Animated.View style={{ transform: [{ scale: scales[1] }] }}>
          <View style={visible ? styles.activeCircle : null}>
            <Entypo name="compass" color={visible ? WHITE : ORANGE} size={24} />
          
          </View>
        </Animated.View>
      </TouchableOpacity> */}
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconColor = isFocused ? WHITE : ORANGE;

        const iconElement =
          typeof options.tabBarIcon === 'function'
            ? options.tabBarIcon({
                focused: isFocused,
                color: iconColor,
                size: 24,
              })
            : getFallbackIcon(route.name, iconColor);

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            activeOpacity={0.85}
            style={styles.touchable}
            onPress={() => handlePress(index, route.name, isFocused)}
          >
            <Animated.View style={{ transform: [{ scale: scales[index] }] }}>
              <View style={isFocused ? styles.activeCircle : null}>
                {iconElement}
              </View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 40,
   
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    zIndex:20,
     elevation: 20, // Android shadow
  },
  touchable: {
    width: TAB_WIDTH,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
