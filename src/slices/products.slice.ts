import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../interfaces/Item.interface';

interface IProductState {
   items: Array<IItem>;
   hits: Array<IItem>;
}

const initialState: IProductState = {
   items: [],
   hits: [],
};

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      getItems: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id); // ищем совпадения по id
         // запрещаем добавление одинаковых элементов
         if (existed) {
            return;
         }
         state.items.push(payload);
      },
      
      //загружаем список хитов
      getHits: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.hits.find((i) => i.id === payload.id); // ищем совпадения по id
         // запрещаем добавление одинаковых элементов
         if (existed) {
            return;
         }
         state.hits.push(payload);
      },
   },
});

export const { getItems, getHits } = productsSlice.actions;
export default productsSlice.reducer;
