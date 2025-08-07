// /data/menuData.ts

export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
  isDirect?: boolean,
  targetScreen?: string; // Final screen name
  tabTarget?: {
    tab: string; // e.g. 'HomeTab'
    screen: string; // e.g. 'CreateProduct'
    params?: any;
  };
}

export const mainMenuData: MenuItem[] = [
  {
    id: 'dog',
    title: 'Dog',
    icon: 'https://cdn.petsathome.com/public/images/assets/dog-category/dog-avatar.png',
    children: [
      {
        id: 'dogAll',
        title: 'Dog',
        targetScreen: 'Dog',
      },
      {
        id: 'dogFood',
        title: 'Dog Food',
        children: [
          {
            id: 'dogAllFood',
            title: 'View All Dog Food',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogFoodScreen',
              params: { fromMenuId: 'dogAllFood' },
            },
          },
          {
            id: 'dogDryFood',
            title: 'Dry Dog Food',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogDryFoodScreen',
              params: { fromMenuId: 'dogDryFood' },
            },
          },
          {
            id: 'dogWetFood',
            title: 'Wet Dog Food',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogWetFoodScreen',
              params: { fromMenuId: 'dogWetFood' },
            },
          },
        ],
      },
      {
        id: 'dogTreats',
        title: 'Dog Treats',
        children: [
          {
            id: 'dogAllTreats',
            title: 'View All Dog Treats',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogTreatsScreen',
              params: { fromMenuId: 'dogAllTreats' },
            },
          },
          {
            id: 'dogTreatsOffer',
            title: 'Dog Treats Offer',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogTreatsOfferScreen',
              params: { fromMenuId: 'dogTreatsOffer' },
            },
          },
          {
            id: 'dogTreatsChews',
            title: 'Dog Chews',
            tabTarget: {
              tab: 'Dog',
              screen: 'DogTreatsChewsScreen',
              params: { fromMenuId: 'dogTreatsChews' },
            },
          },
        ],
      },
      {
        id: 'dogBed',
        title: 'Dog Beds',
        tabTarget: {
          tab: 'Products',
          screen: 'ProductCreate',
          params: { fromMenuId: 'dogBed' },
        },
      },
      {
        id: 'dogToys',
        title: 'Dog Toys',
        tabTarget: {
          tab: 'Products',
          screen: 'ProductCreate',
          params: { fromMenuId: 'dogFood' },
        },
      },
    ],
  },
  {
    id: 'cat',
    title: 'Cat',
    icon: 'https://cdn.petsathome.com/public/images/assets/cat-category/cat-avatar.png',
    children: [
      {
        id: 'catAll',
        title: 'Cat',
        targetScreen: 'Cat',
      },
      {
        id: 'catFood',
        title: 'Cat Food',
        children: [
          {
            id: 'catAllFood',
            title: 'View All Cat Food',
            tabTarget: {
              tab: 'Cat',
              screen: 'CatFoodScreen',
              params: { fromMenuId: 'catAllFood' },
            },
          },
          {
            id: 'catDryFood',
            title: 'Dry Cat Food',
            tabTarget: {
              tab: 'Dog',
              screen: 'CatDryFoodScreen',
              params: { fromMenuId: 'catDryFood' },
            },
          },
          {
            id: 'catWetFood',
            title: 'Wet Dog Food',
            tabTarget: {
              tab: 'Dog',
              screen: 'CatWetFoodScreen',
              params: { fromMenuId: 'catWetFood' },
            },
          },
        ],
      },
      {
        id: 'catTreats',
        title: 'Cat Treats',
        children: [
          {
            id: 'catAllTreats',
            title: 'View All Cat Treats',
            tabTarget: {
              tab: 'Cat',
              screen: 'CatTreatsScreen',
              params: { fromMenuId: 'catAllTreats' },
            },
          },
          {
            id: 'catTreatsOffer',
            title: 'Cat Treats Offer',
            tabTarget: {
              tab: 'Cat',
              screen: 'CatTreatsOfferScreen',
              params: { fromMenuId: 'catTreatsOffer' },
            },
          },
          {
            id: 'catHealthCat',
            title: 'Cat Healthcare Treats',
            tabTarget: {
              tab: 'Cat',
              screen: 'CatHealthCareScreen',
              params: { fromMenuId: 'catHealthCat' },
            },
          },
        ],
      },
      {
        id: 'catBeds',
        title: 'Cat Beds',
        children: [
          {
            id: 'menu-b-1-1',
            title: 'Submenu B1-1',
            targetScreen: 'Wallet',
          },
        ],
      },
      {
        id: 'catLitter',
        title: 'Cat Litter',
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
    id: 'smallAnimal',
    title: 'Small Animal',
    icon: 'https://cdn.petsathome.com/public/images/assets/small-animal-category/small-animal-avatar.png',
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
  {
    id: 'fish',
    title: 'Fish',
    icon: 'https://cdn.petsathome.com/public/images/assets/fish-category/fish-avatar.png',
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
  {
    id: 'reptile',
    title: 'Reptile',
    icon: 'https://cdn.petsathome.com/public/images/assets/reptile-category/reptile.png',
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
  {
    id: 'bird',
    title: 'Bird & Wildlife',
    icon: 'https://cdn.petsathome.com/public/images/assets/bird-wildlife-category/bird-avatar.png',
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
  {
    id: 'petsClub',
    title: 'Pets Club & Offers',
    icon: 'https://cdn.petsathome.com/public/images/assets/pets-club/pets-club-tag.png',
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
  {
    id: 'subscriptions',
    title: 'Food subscriptions',
    targetScreen: 'Products',
    isDirect: true,
  },
  {
    id: 'brandaz',
    title: 'Brands A-Z',
    targetScreen: 'Products',
    isDirect: true,
  },
  {
    id: 'healthPlan',
    title: 'Health plan subscriptions',
    targetScreen: 'Products',
    isDirect: true,
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
