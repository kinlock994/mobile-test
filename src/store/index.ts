import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { uiReducer } from './slices/uiSlice';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';
import Reactotron from './reactotronConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefault =>
    getDefault({ serializableCheck: false }).concat(
      authApi.middleware,
      productApi.middleware,
    ),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(Reactotron.createEnhancer?.()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
