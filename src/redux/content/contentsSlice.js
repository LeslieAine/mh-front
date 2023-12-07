import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContents = createAsyncThunk('contents/fetchContents', async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/user_content`, {
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
      .addCase(fetchContents.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        contents: action.payload,
      }))
  },
});

export default contentsSlice.reducer;
