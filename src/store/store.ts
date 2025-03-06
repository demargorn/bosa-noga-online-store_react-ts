import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/search.slice';
import hitsReducer from '../slices/hits.slice';
import productsReducer from '../slices/products.slice';
import itemReducer from '../slices/item.slice';
import cartReducer from '../slices/cart.slice';

const store = configureStore({
   reducer: {
      search: searchReducer,
      hits: hitsReducer,
      products: productsReducer,
      item: itemReducer,
      cart: cartReducer,
   },
});

export type TypeDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export default store;
