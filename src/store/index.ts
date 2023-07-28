import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts';
import searchStringReducer from './searchString';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    searchString: searchStringReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
