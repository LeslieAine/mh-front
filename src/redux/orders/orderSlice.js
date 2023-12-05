import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'


export const madeOrders = createAsyncThunk('orders/madeOrders', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/made_orders`, {
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

export const clientFulfilled = createAsyncThunk('orders/clientFulfilled', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/client_fulfilled_orders`, {
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

export const creatorFulfilled = createAsyncThunk('orders/creatorFulfilled', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/creator_fulfilled_orders`, {
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

export const receivedOrders = createAsyncThunk('orders/receivedOrders', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/received_orders`, {
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

export const createOrder = createAsyncThunk('orders/createOrder', async ({order}) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/orders`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  const data = await response.json();
  return data;
});

export const acceptOrder = createAsyncThunk('orders/acceptOrder', async (orderId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/orders/${orderId}/accept`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
});

export const rejectOrder = createAsyncThunk('orders/rejectOrder', async (orderId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/orders/${orderId}/reject`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
});

export const fulfillOrder = createAsyncThunk('orders/fulfillOrder', async ({content, orderId}) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/orders/${orderId}/fulfill`, {
    method: 'PATCH',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });
  const data = await response.json();
  return data;
});



const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    madeOrders: [],
    receivedOrders: [],
    clientFulfilledOrders: [],
    creatorFulfilledOrders: [],
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
      .addCase(acceptOrder.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(acceptOrder.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        message: action.payload,
      }))
      .addCase(rejectOrder.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(rejectOrder.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        message: action.payload,
      }))
      .addCase(madeOrders.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(madeOrders.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        madeOrders: action.payload,
      }))
      .addCase(clientFulfilled.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(clientFulfilled.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        clientFulfilledOrders: action.payload,
      }))
      .addCase(creatorFulfilled.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(creatorFulfilled.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        creatorFulfilledOrders: action.payload,
      }))
      .addCase(receivedOrders.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(receivedOrders.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        receivedOrders: action.payload,
      }))
      .addCase(fulfillOrder.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(fulfillOrder.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        temp: action.payload,
      }))
    //   .addCase(fulfillOrder.fulfilled, (state, action) => {
    //     // console.log(action.payload)
    //     const newOrder = {
    //         id: action.payload.id,
    //         title: action.payload.title,
    //         description: action.payload.description,
    //         length: action.payload.length,
    //         price: action.payload.price,
    //         user_id: action.payload.user_id,
    //         ordered_by_id: action.payload.ordered_by_id,
    //         accepted_by_id: action.payload.accepted_by_id,
    //         fulfilled: action.payload.fulfilled
    //     };
    
    //     return {
    //         ...state,
    //         fulfilledOrders: state.fulfilledOrders.concat(newOrder)
    //     };
    // })
  }
  })

export default orderSlice.reducer;