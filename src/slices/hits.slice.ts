import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API } from '../helpers/API';
import { IItem } from '../interfaces/Item.interface';

interface IHitsState {
   hits: Array<IItem>;
}

const initialState: IHitsState = {
   hits: [],
};

// загрузка хитов с api
const fetchHits = createAsyncThunk('hits/get', async () => {
   try {
      const { data } = await axios.get<Array<IItem>>(`${API}/top-sales`);
      return data;
   } catch (error) {
      if (error instanceof AxiosError) {
         throw new Error(error.response?.data.message);
      }
   }
});

const hitsSlice = createSlice({
   name: 'hits',
   initialState,
   reducers: {
      // записываем список хитов в хранилище
      getHits: (state, { payload }: PayloadAction<Array<IItem>>) => {
         payload.map((p) => {
            const existed = state.hits.find((i) => i.id === p.id); // ищем совпадения по id

            if (existed) {
               return; // запрещаем добавление одикаковых по id элементов
            }
            state.hits.push(...payload);
         });
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchHits.fulfilled, (state, action) => {
         state.hits = action.payload!;
      });
   },
});

const hitsActions = hitsSlice.actions;

export { fetchHits, hitsActions };
export default hitsSlice.reducer;
