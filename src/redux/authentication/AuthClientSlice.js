import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginClient = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/clients/sign_in', credentials);
      const token = response.data.status.token;

  // Store the token in local storage
    localStorage.setItem('token', token);
    console.log(response.data.status.token)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const signupClient = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/clients/', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutClient = createAsyncThunk(
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

const getClientFromLocalStorage = () => {
  const client = localStorage.getItem('client');
  return client ? JSON.parse(client) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    client: getClientFromLocalStorage(),
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginClient.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(loginClient.fulfilled, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.client = payload;
        localStorage.setItem('client', JSON.stringify(payload));
      })
      .addCase(loginClient.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      })
      .addCase(logoutClient.pending, (state) => {
        const tempState = state;
        tempState.isLoading = true;
        tempState.error = null;
      })
      .addCase(logoutClient.fulfilled, (state) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.client = null;
        localStorage.removeItem('client');
      })
      .addCase(logoutClient.rejected, (state, { payload }) => {
        const tempState = state;
        tempState.isLoading = false;
        tempState.error = payload;
      });
  },
});

export default authSlice.reducer;
