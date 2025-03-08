import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 *  срез поисковых запросов
 */

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
      /** запоминаем поисковую фразу */
      remember: (state, { payload }: PayloadAction<string>) => {
         state.search = payload;
      },
   },
});

const searchActions = searchSlice.actions;

export { searchActions };
export default searchSlice.reducer;
