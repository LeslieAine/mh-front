import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContents = createAsyncThunk('contents/fetchContents', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/contents');
  const data = await response.json();
  return data;
});

const contentsSlice = createSlice({
  name: 'contents',
  initialState: {
    loading: false,
    contents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        const newState = state;
        newState.loading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        const newState = state;
        newState.loading = false;
        newState.contents = action.payload;
      });
  },
});

export default contentsSlice.reducer;
