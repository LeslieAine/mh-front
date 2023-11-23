import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'


export const fetchAbout = createAsyncThunk('about/fetchAbout', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/abouts`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
});

export const editAbout = createAsyncThunk('about/editAbout', async ({about, userId}) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/abouts`, {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(about),
  });
  const data = await response.json();
  return data;
});



const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    loading: false,
    about: [],
    isLoading: false,
    success: false,
    response: null,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(fetchAbout.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        about: action.payload,
      }))
      .addCase(editAbout.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(editAbout.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        about: action.payload,
      }))
      
  }
  })

export default aboutSlice.reducer;