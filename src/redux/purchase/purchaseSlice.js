import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'


export const userPurchases = createAsyncThunk('purchases/userPurchases', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/purchased_contents`, {
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

export const contentPurchases = createAsyncThunk('purchases/contentPurchases', async (contentId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/contents/${contentId}/purchases_on_content`, {
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

export const createPurchase = createAsyncThunk('purchases/createPurchase', async ({purchase, contentId}) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/contents/${contentId}/create`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purchase),
  });
  const data = await response.json();
  return data;
});

const purchaseSlice = createSlice({
    name: 'orders',
    initialState: {
      loading: false,
      contentPurchases: [],
      userPurchases: [],
      temp: [],
      message: '',
      isLoading: false,
      success: false,
      response: null,
      error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createPurchase.pending, (state) => ({
          ...state,
          loading: true,
          error: '',
        }))
        .addCase(createPurchase.fulfilled, (state, action) => ({
          // console.log(action.payload)
          ...state,
          loading: false,
          message: action.payload,
        }))
        .addCase(userPurchases.pending, (state) => ({
          ...state,
          loading: true,
          error: '',
        }))
        .addCase(userPurchases.fulfilled, (state, action) => ({
          // console.log(action.payload)
          ...state,
          loading: false,
          userPurchases: action.payload,
        }))
        .addCase(contentPurchases.pending, (state) => ({
          ...state,
          loading: true,
          error: '',
        }))
        .addCase(contentPurchases.fulfilled, (state, action) => ({
          // console.log(action.payload)
          ...state,
          loading: false,
          contentPurchases: action.payload,
        }))
    }
    })
  
  export default purchaseSlice.reducer;