import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginCreator = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/creators/sign_in', credentials);
      const token = response.data.status.token;

  // Store the token in local storage
    localStorage.setItem('token', token);
    // console.log(response.data.status.token)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signupCreator = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/creators/', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutCreator = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/logout');
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const getCreatorFromLocalStorage = () => {
  const creator = localStorage.getItem('creator');
  return creator ? JSON.parse(creator) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    creator: getCreatorFromLocalStorage(),
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginCreator.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(loginCreator.fulfilled, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.creator = payload;
        localStorage.setItem('creator', JSON.stringify(payload));
      })
      .addCase(loginCreator.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      })
      .addCase(logoutCreator.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(logoutCreator.fulfilled, (state) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.creator = null;
        localStorage.removeItem('creator');
      })
      .addCase(logoutCreator.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      });
  },
});

export default authSlice.reducer;
