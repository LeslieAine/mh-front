import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

const initialState = {
    isLoading: false,
    success: false,
    error: null,
    list: [],
    user: {},
    response: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
    const url = `http://localhost:3000/api/v1/users/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });


  const userSlice = createSlice({
    name: 'user',
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
        .addCase(fetchUser.pending, (state) => ({
          ...state,
        isLoading: true,
        error: '',
        }))
        .addCase(fetchUser.fulfilled, (state, action) => ({
          ...state,
        isLoading: false,
        success: true,
          user: action.payload,
        }))
        .addCase(fetchUser.rejected, (state, action) => ({
          ...state,
        isLoading: false,
        error: action.payload,
        }))
    }
  
  });
  
  export const { resetErrors } = userSlice.actions;
  
  export default userSlice.reducer;
  