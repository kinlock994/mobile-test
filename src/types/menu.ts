// src/types/menu.ts
export interface MenuItem {
    id: string;
    title: string;
    children?: MenuItem[];
}