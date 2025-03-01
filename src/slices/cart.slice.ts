import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      add: (state, { payload }: PayloadAction<number>) => {
         state.items.push(payload);
      },
   },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
