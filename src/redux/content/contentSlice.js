// contentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const SHOW_POST = 'post/SHOW/:id';
// const BASE_URL = 'http://127.0.0.1:3000';
// Define an initial state
const initialState = {
    isLoading: false,
    success: false,
    error: null,
    list: [],
    content: {},
    response: null,
};

// Define an asynchronous thunk for fetching posts from your Rails API
// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/v1/posts'); // Use your Rails API endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch posts');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   });

// export const getContent = createAsyncThunk(SHOW_POST, async (id, thunkAPI) => {
//     const API_URL = `${BASE_URL}/api/v1/posts/${id}`;
//     const token = localStorage.getItem('token');
//     const requestOptions = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       return await axios.get(API_URL, requestOptions);
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.error);
//     }
//   });

export const fetchContent = createAsyncThunk('content/fetchContent', async (id) => {
    const url = `http://localhost:3000/api/v1/contents/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

//   export const addNewPost = createAsyncThunk('posts/addNewPost', async (postData) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/v1/posts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ post: { content: postData.content, user_id: postData.user_id } }), // Send post data in the "post" attribute
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add a new post');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   });

export const addContent = createAsyncThunk('content/add', async (contentProperties, { rejectWithValue }) => {
    // try {
    // const token = localStorage.getItem('token');
    //     console.log(token)
    //   const response = await axios.content('http://localhost:3000/api/v1/contents', contentProperties);
    //   return response.data;
    // } catch (error) {
    //   return rejectWithValue(error.response.data.error);
    // }
    try {
        const token = localStorage.getItem('token'); // Retrieve the user's token
        if (!token) {
          return rejectWithValue('User token is missing'); // Handle the case where the token is missing
        }
    
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        const response = await axios.post('http://localhost:3000/api/v1/contents', contentProperties, { headers });
    
        return response.data;
      } catch (error) {
        if (error.response) {
          return rejectWithValue(error.response.data.error);
        } else {
          return rejectWithValue('An error occurred while creating the content');
        }
      }
  });

  // Define an asynchronous thunk for fetching a post by ID from your Rails API
// export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`); // Use your Rails API endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch the post');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   });

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // addPost: (state, action) => {
    //   // Add a new post to the state
    //   state.posts.push(action.payload);
    // },
    // likePost: (state, action) => {
    //   // Find the post by ID and increment the likes
    //   const postId = action.payload;
    //   const post = state.posts.find((post) => post.id === postId);
    //   if (post) {
    //     post.likes += 1;
    //   }
    // },

    resetErrors: (state) => ({
        ...state,
        error: '',
        isLoading: false,
        success: false,
        response: null,
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => ({
        ...state,
      isLoading: true,
      error: '',
      }))
      .addCase(fetchContent.fulfilled, (state, action) => ({
        ...state,
      isLoading: false,
      success: true,
        content: action.payload,
      }))
      .addCase(fetchContent.rejected, (state, action) => ({
        ...state,
      isLoading: false,
      error: action.payload,
      }))

      // Add a new case for addContent
      .addCase(addContent.pending, (state) => ({
        ...state,
        isLoading: true,
        error: '',
      }))
  
      .addCase(addContent.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        success: true,
        response: action.payload,
      }))
  
      .addCase(addContent.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
});

export const { resetErrors } = contentSlice.actions;

export default contentSlice.reducer;
