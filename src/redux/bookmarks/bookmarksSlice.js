// // bookmarksSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// export const bookmarksSlice = createSlice({
//   name: 'bookmarks',
//   initialState: [],
//   reducers: {
//     toggleBookmark: (state, action) => {
//       const postId = action.payload;
//       const index = state.indexOf(postId);

//       if (index !== -1) {
//         // If post is already bookmarked, remove it from bookmarks
//         state.splice(index, 1);
//       } else {
//         // If post is not bookmarked, add it to bookmarks
//         state.push(postId);
//       }
//     },
//   },
// });

// export const { toggleBookmark } = bookmarksSlice.actions;

// export default bookmarksSlice.reducer;
