import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ISearchStringState {
  searchString: string;
};

const initialState: ISearchStringState = {
  searchString: ''
};

const searchStringSlice = createSlice({
  name: 'searchString',
  initialState,
  reducers: {
    setSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchString } = searchStringSlice.actions;
export default searchStringSlice.reducer;

