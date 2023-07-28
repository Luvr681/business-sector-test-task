import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IPost, KeysMatching } from '../types';
import { sortPostsBy } from '../lib/sortPostsBy';

export interface IPostsState {
  posts: IPost[];
};

const initialState: IPostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sortPosts(state, action: PayloadAction<KeysMatching<IPost, string>>) {
      state.posts = sortPostsBy(state.posts, action.payload);
    },
    setPosts(state, action: PayloadAction<IPost[]>) {
      state.posts = action.payload;
    },
  },
});

export const { setPosts, sortPosts } = postsSlice.actions;
export default postsSlice.reducer;
