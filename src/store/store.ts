import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/products.slice';
import cartReducer from '../slices/cart.slice';

const store = configureStore({
   reducer: {
      cart: cartReducer,
      products: productsReducer,
   },
});

export type TypeDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export default store;
