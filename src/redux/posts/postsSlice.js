import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/posts');
  const data = await response.json();
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.posts = action.payload;
      });
  },
});

export default postsSlice.reducer;
