// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   userId: null,
//   userName: '',
//   balance: 0,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       state.isAuthenticated = true;
//       state.userId = action.payload.userId;
//       state.userName = action.payload.userName;
//     },
//     logoutUser: (state) => {
//       state.isAuthenticated = false;
//       state.userId = null;
//       state.userName = '';
//     },
//     updateUserInfo: (state, action) => {
//       state.userName = action.payload.userName;
//     },
//     updateBalance: (state, action) => {
//         state.balance = action.payload;
//       },
//   },
// });

// export const { loginUser, logoutUser, updateUserInfo, updateBalance } = userSlice.actions;

// export default userSlice.reducer;
