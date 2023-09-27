// favoritesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an initial state
const initialState = {
  favorites: [], // An array of favorite creator objects
};

// Define an asynchronous thunk to fetch the user's favorite creators
export const fetchFavoriteCreators = createAsyncThunk(
  'favorites/fetchFavoriteCreators',
  async (_, { getState }) => {
    // You can implement logic here to fetch favorite creators from the server
    // For now, we'll use the data in the store
    const { favorites } = getState().favorites;
    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const creator = action.payload;
      state.favorites.push(creator);
    },
    removeFavorite: (state, action) => {
      const creatorId = action.payload;
      state.favorites = state.favorites.filter((creator) => creator.id !== creatorId);
    },
    updateFavoriteCount: (state, action) => {
      const { creatorId, count } = action.payload;
      const favoriteCreator = state.favorites.find((creator) => creator.id === creatorId);
      if (favoriteCreator) {
        favoriteCreator.favoriteCount = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteCreators.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const { addFavorite, removeFavorite, updateFavoriteCount } = favoritesSlice.actions;

export default favoritesSlice.reducer;
