// menuData.ts
export interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}

export const mainMenuData: MenuItem[] = [
  {
    id: '1',
    title: 'Menu A',
    children: [
      {
        id: '1-1',
        title: 'Submenu A1',
        children: [
          {
            id: '1-1-1',
            title: 'Submenu A1-1',
            children: [
              { id: '1-1-1-1', title: 'Submenu A1-1-1' },
              { id: '1-1-1-2', title: 'Submenu A1-1-2' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Menu B',
    children: [
      {
        id: '2-1',
        title: 'Submenu B1',
        children: [
          {
            id: '2-1-1',
            title: 'Submenu B1-1',
            children: [{ id: '2-1-1-1', title: 'Submenu B1-1-1' }],
          },
        ],
      },
    ],
  },
];

// Recursive fetch function
export const findMenuItemById = (items: MenuItem[], id: string): MenuItem | undefined => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuItemById(item.children, id);
      if (found) return found;
    }
  }
  return undefined;
};
