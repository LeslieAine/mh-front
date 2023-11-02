// // purchaseSlice.js

// import { createSlice } from '@reduxjs/toolkit';
// import { updateBalance } from '../user/usersSlice'; // Import the userSlice action

// const initialState = {
//     purchases: [], // Array to store purchase history
// };

// const purchaseSlice = createSlice({
//   name: 'purchase',
//   initialState,
//   reducers: {
//     addPurchase: (state, action) => {
//       state.purchases.push(action.payload);
//     },
//   },
// });

// // Async action to handle a purchase
// export const purchaseContent = (contentId, userId, contentPrice) => async (dispatch, getState) => {
//   const userBalance = getState().user.balance; // Assuming you have user data in the state

//   if (userBalance >= contentPrice) {
//      // Calculate the updated balance after deduction
//      const updatedBalance = userBalance - contentPrice;

//      // Dispatch the updateBalance action to update the user's balance
//      dispatch(updateBalance(updatedBalance));

//     // Create a new purchase record
//     const newPurchase = {
//       contentId,
//       userId,
//       transactionDate: new Date(),
//     };

//     // Dispatch the addPurchase action to add the purchase to the history
//     dispatch(addPurchase(newPurchase));
//   } else {
//     // Handle insufficient balance (e.g., show an error message)
//   }
// };

// export const { addPurchase } = purchaseSlice.actions;

// export default purchaseSlice.reducer;
