// store/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDrawerOpen: false,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { toggleDrawer, openDrawer, closeDrawer } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
