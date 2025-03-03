import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../interfaces/Item.interface';

interface ICartState {
   items: Array<IItem>;
}

const initialState: ICartState = {
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      // увеличиваем количество продукта в корзине
      add: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id);
         // если не существует - добавляем новый
         if (!existed) {
            state.items.push({ ...payload, count: 1 });
            return;
         }
         // если существует - находим и добавляем единицу
         state.items.map((i) => {
            if (i.count! < 10) {
               i.count! += 1;
            }
            return i;
         });
      },

      // уменьшаем количество продукта в корзине
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
         return;
      },
      // удаляем продукт из корзины
      deleteItem: (state, { payload }: PayloadAction<IItem>) => {
         state.items = state.items.filter((i) => i.id !== payload.id);
      },
   },
});

export const { add, remove, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
