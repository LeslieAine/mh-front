// postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  selectedPost: null, // Initialize selectedPost as null
};

// Define an asynchronous thunk for fetching posts from your Rails API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/posts'); // Use your Rails API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  });

  export const addNewPost = createAsyncThunk('posts/addNewPost', async (postData) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: postData }), // Send post data in the "post" attribute
      });
      if (!response.ok) {
        throw new Error('Failed to add a new post');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  });

  // Define an asynchronous thunk for fetching a post by ID from your Rails API
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`); // Use your Rails API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch the post');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
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
      })

      // Add a new case for fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.status = 'loading'; // You can use a separate loading state if needed
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming you have a separate selectedPost state to store the fetched post
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, likePost, addComment } = postSlice.actions;

export default postSlice.reducer;
