// MenuDrawer.tsx (updated export to accept `visible` and `onClose`)
import { AppTabsParamList } from '@navigation/AppTabs';
import { navigationRef } from '@navigation/navigationRef';
import { colors } from '@theme/index';
import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
type Props = {
  visible: boolean;
  onClose: () => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = 80;
type MenuItem = {
  title: string;
  imgUrl?: string;
  screen?: keyof AppTabsParamList;
  subMenu?: MenuItem[];
};

const sampleMenu: MenuItem[] = [
  { title: 'Dashboard', imgUrl: '../assets/Panda.png', screen: 'Products' },
  {
    title: 'Settings',
    subMenu: [
      { title: 'Profile', screen: 'Profile' },
      {
        title: 'Security',
        subMenu: [
          { title: 'Info', screen: 'About' },
          { title: 'Wallet', screen: 'Wallet' },
        ],
      },
    ],
  },
];

export default function MenuDrawer({ visible, onClose }: Props) {
  const [menuStack, setMenuStack] = useState<MenuItem[][]>([sampleMenu]);
  const [titleStack, setTitleStack] = useState<string[]>(['Menu']);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const currentMenu = menuStack[menuStack.length - 1];
  const isSubMenu = menuStack.length > 1;
  const currentTitle = titleStack[titleStack.length - 1];
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) setMenuStack([sampleMenu]);
    });
  }, [visible, slideAnim]);

  const openSubMenu = (item: MenuItem) => {
    if (item.subMenu) {
      setMenuStack(prev => [...prev, item.subMenu!]);
      setTitleStack(prev => [...prev, item.title]);
    } else if (item.screen) {
      console.log(navigationRef);

      console.log(navigationRef.isReady());

      if (navigationRef.isReady()) {
        console.log('Ready');

        navigationRef.navigate(item.screen);
      }
      onClose(); // Close the drawer
    }
  };

  const goBack = () => {
    if (isSubMenu) {
      setMenuStack(prev => prev.slice(0, -1));
      setTitleStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <>
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.backdrop, { marginTop: insets.top - 15 }]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
            marginTop: insets.top - 15,
          },
        ]}
      >
        {/* Fixed Header */}
        <View style={styles.menuHeader}>
          {isSubMenu ? (
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Entypo name="chevron-left" color="#F97316" size={20} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}
          <Text style={styles.headerTitle}>{currentTitle}</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        {/* Scrollable Menu Items */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {currentMenu.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => openSubMenu(item)}
                style={styles.menuItem}
              >
                <View style={styles.itemLeft}>
                  {item.imgUrl ? (
                    <Image
                      source={require('../assets/Panda.png')}
                      style={styles.avatar}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: 'https://placekitten.com/50/50',
                      }}
                      style={styles.avatar}
                    />
                  )}

                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
                {item.subMenu && (
                  <Entypo name="chevron-right" color="#999" size={20} />
                )}
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - HEADER_HEIGHT,
    backgroundColor: '#fff',
    zIndex: 5,
    elevation: 5,
  },
  backdrop: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000055',
    zIndex: 5,
  },
  menuHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
  },
  backIcon: {
    fontSize: 24,
    color: colors.secondary,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  scroll: {
    flex: 1,
  },
});
