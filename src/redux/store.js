import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';
import authReducer from './authentication/AuthenticationSlice';
import contentReducer from './content/contentSlice'
import favoritesReducer from './favorite/favoriteSlice'
import postsReducer from './posts/postsSlice'
import postReducer from './posts/postSlice'
import purchaseReducer from './purchase/purchaseSlice';
import messagesReducer from './messages/messagesSlice';
import contentsSlice from './content/contentsSlice';

const store = configureStore({
  reducer: {
    // user: userReducer,
    authentication: authReducer,
    content: contentReducer,
    contents: contentsSlice,
    favorites: favoritesReducer,
    posts: postsReducer,
    purchase: purchaseReducer,
    messages: messagesReducer,
    post: postReducer,
    // Add other reducers as needed
  },
});

export default store;
