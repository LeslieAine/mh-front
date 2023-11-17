import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/users');
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
