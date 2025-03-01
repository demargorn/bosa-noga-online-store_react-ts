import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cart.slice';

const store = configureStore({
   reducer: {
      cart: cartReducer,
   },
});

export type TypeDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export default store;
