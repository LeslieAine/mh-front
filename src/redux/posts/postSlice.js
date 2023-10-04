// postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Define an asynchronous thunk for fetching posts from an API, for example
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/api/posts'); // Replace with your API endpoint
  const data = await response.json();
  return data;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      // Add a new post to the state
      state.posts.push(action.payload);
    },
    likePost: (state, action) => {
      // Find the post by ID and increment the likes
      const postId = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action) => {
      // Find the post by ID and add a new comment
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;

export default postSlice.reducer;
