import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
   search: string;
}

const initialState: ISearchState = {
   search: '',
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      remember: (state, { payload }: PayloadAction<string>) => {
         state.search = payload;
      },
      getState: (state) => state,
   },
});

export const { remember, getState } = searchSlice.actions;
export default searchSlice.reducer;
