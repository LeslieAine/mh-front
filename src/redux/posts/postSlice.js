// postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SHOW_POST = 'post/SHOW/:id';
const BASE_URL = 'http://127.0.0.1:3000';
// Define an initial state
const initialState = {
    isLoading: false,
    success: false,
    error: null,
    list: [],
    post: {},
    response: null,
};


export const getPost = createAsyncThunk(SHOW_POST, async (id, thunkAPI) => {
    const API_URL = `${BASE_URL}/api/v1/posts/${id}`;
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return await axios.get(API_URL, requestOptions);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.error);
    }
  });

export const fetchPost = createAsyncThunk('post/fetchPost', async (id) => {
    const url = `http://localhost:3000/api/v1/posts/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });


export const addPost = createAsyncThunk('post/add', async (postProperties, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem('token'); // Retrieve the user's token
        if (!token) {
          return rejectWithValue('User token is missing'); // Handle the case where the token is missing
        }
    
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        const response = await axios.post('http://localhost:3000/api/v1/posts', postProperties, { headers });
    
        return response.data;
      } catch (error) {
        if (error.response) {
          return rejectWithValue(error.response.data.error);
        } else {
          return rejectWithValue('An error occurred while creating the post');
        }
      }
  });

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
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
      .addCase(fetchPost.pending, (state) => ({
        ...state,
      isLoading: true,
      error: '',
      }))
      .addCase(fetchPost.fulfilled, (state, action) => ({
        ...state,
      isLoading: false,
      success: true,
        post: action.payload,
      }))
      .addCase(fetchPost.rejected, (state, action) => ({
        ...state,
      isLoading: false,
      error: action.payload,
      }))

      // Add a new case for addPost
      .addCase(addPost.pending, (state) => ({
        ...state,
        isLoading: true,
        error: '',
      }))
  
      .addCase(addPost.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        success: true,
        response: action.payload,
      }))
  
      .addCase(addPost.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      }))
  },
});

export const { resetErrors } = postSlice.actions;

export default postSlice.reducer;
