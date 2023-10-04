// contentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk action to fetch content data
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { dispatch }) => {
    try {
      // Simulate an API call (replace with your actual API call)
      const response = await fetch('/api/content');
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    contentList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        // Handle pending state (e.g., show loading indicator)
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        // Handle fulfilled state (e.g., update content list)
        state.loading = false;
        state.contentList = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        // Handle rejected state (e.g., show error message)
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;
