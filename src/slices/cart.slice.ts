import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../interfaces/Item.interface';

/**
 *  срез корзины товаров
 */

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
      /** добавляем или увеличиваем количество продукта */
      add: (state, { payload }: PayloadAction<IItem>) => {
         const existed = state.items.find((i) => i.id === payload.id);
         /** если не существует - добавляем новый */
         if (!existed) {
            state.items.push(payload);
            return;
         }

         /** если существует - находим и добавляем единицу */
         state.items.map((i) => {
            if (i.count! < 10) {
               i.count! += 1;
            }
            return i;
         });

         /** добавляем в local storage по кнопке в карточке товара, тк отсюда почему-то срабатывает только по двойному нажатию на кнопку "Добавить в корзину"*/
      },

      /** удаляем продукт из корзины */
      deleteItem: (state, { payload }: PayloadAction<IItem>) => {
         state.items = state.items.filter((i) => i.id !== payload.id);
         localStorage.removeItem(payload.id.toString());
      },

      /** очищаем корзину */
      clean: (state) => {
         state.items = [];
         localStorage.clear();
      },
   },
});

const cartActions = cartSlice.actions;

export { cartActions };
export default cartSlice.reducer;
