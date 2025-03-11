import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '@/interfaces/Item.interface';

/**
 * срез карточки товара
 */

interface IItemState {
   items: Array<IItem>;
}

const initialState: IItemState = {
   items: [],
};

const itemSlice = createSlice({
   name: 'item',
   initialState,
   reducers: {
      /** увеличиваем количество продукта */
      add: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id);
         /** если не существует - добавляем новый */
         if (!existed) {
            state.items.push({ ...payload, count: 1 });
            return;
         }

         /** если существует - находим и добавляем единицу */
         state.items.map((i) => {
            if (!i.count || i.count! < 10) {
               i.count! += 1;
            }
            return i;
         });
      },

      /** уменьшаем количество продукта */
      remove: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id);
         if (!existed) {
            return;
         }

         state.items.map((i) => {
            if (i.count! > 1) {
               i.count! -= 1;
            }
            return i;
         });
      },
   },
});

const itemActions = itemSlice.actions;

export { itemActions };
export default itemSlice.reducer;
