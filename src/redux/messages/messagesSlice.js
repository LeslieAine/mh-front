// // messagesSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Define an initial state
// const initialState = {
//   messages: [], // An array of message objects
// };

// // Define an asynchronous thunk to fetch messages
// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async (_, { getState }) => {
//     // You can implement logic here to fetch messages from the server
//     // For now, we'll use the data in the store
//     const { messages } = getState().messages;
//     return messages;
//   }
// );

// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState,
//   reducers: {
//     sendMessage: (state, action) => {
//       const newMessage = action.payload;
//       state.messages.push(newMessage);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchMessages.fulfilled, (state, action) => {
//       state.messages = action.payload;
//     });
//   },
// });

// export const { sendMessage } = messagesSlice.actions;

// export default messagesSlice.reducer;
