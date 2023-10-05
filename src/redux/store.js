import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import authReducer from './authentication/AuthenticationSlice';
import contentReducer from './content/contentSlice'
import favoritesReducer from './favorite/favoriteSlice'
import postReducer from './posts/postSlice'
import purchaseReducer from './purchase/purchaseSlice';
import messagesReducer from './messages/messagesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    authentication: authReducer,
    content: contentReducer,
    favorites: favoritesReducer,
    posts: postReducer,
    purchase: purchaseReducer,
    messages: messagesReducer
    // Add other reducers as needed
  },
});

export default store;
