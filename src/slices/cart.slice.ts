import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../interfaces/Item.interface';

export interface IState {
   items: Array<IItem>;
   hits: Array<IItem>;
}

const initialState: IState = {
   items: [],
   hits: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      getItems: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id); // ищем совпадения по id
         if (existed) {
            return;
         }
         state.items.push(payload);
      },
      removeItem: (state, { payload }: PayloadAction<IItem>) => {
         state.items = state.items.filter((item) => item.id !== payload.id);
      },
      //загружаем список хитов
      getHits: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.hits.find((i) => i.id === payload.id); // ищем совпадения по id
         if (existed) {
            return;
         }
         state.hits.push(payload);
      },
   },
});

export const { getItems, getHits } = cartSlice.actions;
export default cartSlice.reducer;
