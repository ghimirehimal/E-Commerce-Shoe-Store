import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Reducers/CartSlice';
import wishReducer from './Reducers/wishList';
import bannerReducer from './Reducers/bannerSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wish: wishReducer,
    banner: bannerReducer,
  },
});

