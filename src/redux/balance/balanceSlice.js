import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'


export const fetchBalance = createAsyncThunk('balance/fetchBalance', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/current_balance`, {
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

const balanceSlice = createSlice({
  name: 'about',
  initialState: {
    loading: false,
    balance: '',
    isLoading: false,
    success: false,
    response: null,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(fetchBalance.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        balance: action.payload,
      }))
      
  }
  })

export default balanceSlice.reducer;