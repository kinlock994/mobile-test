// /data/menuData.ts

export interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
  targetScreen?: string; // Final screen name
  tabTarget?: {
    tab: string; // e.g. 'HomeTab'
    screen: string; // e.g. 'CreateProduct'
    params?: any;
  };
}

export const mainMenuData: MenuItem[] = [
  {
    id: 'menu-a',
    title: 'Menu A',
    children: [
      {
        id: 'menu-a-1',
        title: 'Submenu A1',
        targetScreen: 'Profile', 
      },
      {
        id: 'menu-a-2',
        title: 'Go to Create Product (in HomeTab)',
        tabTarget: {
          tab: 'Products',
          screen: 'ProductCreate',
          params: { fromMenuId: 'menu-a-2' },
        },
      },
    ],
  },
  {
    id: 'menu-b',
    title: 'Menu B',
    children: [
      {
        id: 'menu-b-1',
        title: 'Submenu B1',
        children: [
          {
            id: 'menu-b-1-1',
            title: 'Submenu B1-1',
            targetScreen: 'Wallet',
          },
        ],
      },
    ],
  },
  {
    id: 'menu-c',
    title: 'Menu C',
    children: [
      {
        id: 'menu-c-1',
        title: 'Submenu C1',
        children: [
          {
            id: 'menu-c-1-1',
            title: 'Submenu C1-1',
            children: [
              {
                id: 'menu-c-1-1-1',
                title: 'Submenu C1-1-1',
                targetScreen: 'Products',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const findMenuItemById = (
  items: MenuItem[],
  id: string,
): MenuItem | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuItemById(item.children, id);
      if (found) return found;
    }
  }
  return undefined;
};
