// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for the web

// import userReducer from './user/userSlice';
// import usersReducer from './user/usersSlice';
// import authReducer from './authentication/AuthenticationSlice';
// import contentReducer from './content/contentSlice';
// import favoritesReducer from './favorite/favoriteSlice';
// import postsReducer from './posts/postsSlice';
// import postReducer from './posts/postSlice';
// import purchaseReducer from './purchase/purchaseSlice';
// import contentsSlice from './content/contentsSlice';
// import conversationSlice from './conversations/conversationSlice';

// // Import combineReducers from redux
// import { combineReducers } from 'redux';

// // Combine your reducers using combineReducers
// const rootReducer = combineReducers({
//   user: userReducer,
//   users: usersReducer,
//   authentication: authReducer,
//   content: contentReducer,
//   contents: contentsSlice,
//   favorites: favoritesReducer,
//   posts: postsReducer,
//   post: postReducer,
//   conversation: conversationSlice,
// });

// // Persist configuration for root reducer
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Use persistReducer to create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create the Redux store with the persisted reducer
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // Create the persistor for persistGate
// const persistor = persistStore(store);

// export { store, persistor };




// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for the web

// import userReducer from './user/userSlice';
// import usersReducer from './user/usersSlice';
// import authReducer from './authentication/AuthenticationSlice';
// import contentReducer from './content/contentSlice';
// import favoritesReducer from './favorite/favoriteSlice';
// import postsReducer from './posts/postsSlice';
// import postReducer from './posts/postSlice';
// import purchaseReducer from './purchase/purchaseSlice';
// import contentsSlice from './content/contentsSlice';
// import conversationSlice from './conversations/conversationSlice';

// // Persist configuration for root reducer
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = {
//   user: userReducer,
//   users: usersReducer,
//   authentication: authReducer,
//   content: contentReducer,
//   contents: contentsSlice,
//   favorites: favoritesReducer,
//   posts: postsReducer,
//   post: postReducer,
//   conversation: conversationSlice,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };




import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import usersReducer from './user/usersSlice';
import authReducer from './authentication/AuthenticationSlice';
import contentReducer from './content/contentSlice'
import favoritesReducer from './favorite/favoriteSlice'
import postsReducer from './posts/postsSlice'
import postReducer from './posts/postSlice'
import purchaseReducer from './purchase/purchaseSlice';
// import messagesReducer from './messages/messagesSlice';
import contentsSlice from './content/contentsSlice';
import conversationSlice from './conversations/conversationSlice';
import followSlice from './follow/followSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    authentication: authReducer,
    content: contentReducer,
    contents: contentsSlice,
    favorites: favoritesReducer,
    posts: postsReducer,
    // purchase: purchaseReducer,
    // messages: messagesReducer,
    post: postReducer,
    conversation: conversationSlice,
    // Add other reducers as needed
    follow: followSlice,
  },
});

export default store;
