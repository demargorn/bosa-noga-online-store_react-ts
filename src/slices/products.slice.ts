import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '@/interfaces/Item.interface';

/**
 *  срез загружаемых элементов
 */

interface IProductState {
   items: Array<IItem>;
}

const initialState: IProductState = {
   items: [],
};

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      /** загружаем список каталога */
      getItems: (state, { payload }: PayloadAction<Array<IItem>>) => {
         payload.map((p) => {
            const existed = state.items.some((i) => i.id === p.id); /** ищем совпадения по id */

            if (existed) {
               return; /** запрещаем добавление одикаковых по id элементов */
            }

            state.items.push(...payload);
         });
      },
      /** очищаем список */
      clear: (state) => {
         state.items = [];
      },
   },
});

const productActions = productsSlice.actions;

export { productActions };
export default productsSlice.reducer;
