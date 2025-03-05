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
      //загружаем список хитов
      getHits: (state, { payload }: PayloadAction<Array<IItem>>) => {
         payload.map((p) => {
            const existed = state.hits.find((i) => i.id === p.id); // ищем совпадения по id

            if (existed) {
               return; // запрещаем добавление одикаковых по id элементов
            }
            state.hits.push(...payload);
         });
      },
      clear: (state) => {
         state.items = [];
      },

      //загружаем список каталога
      getItems: (state, { payload }: PayloadAction<Array<IItem>>) => {
         payload.map((p) => {
            const existed = state.items.find((i) => i.id === p.id); // ищем совпадения по id

            if (existed) {
               return; // запрещаем добавление одикаковых по id элементов
            }
            state.items.push(...payload);
         });
      },
   },
});

export const { getItems, getHits, clear } = productsSlice.actions;
export default productsSlice.reducer;
