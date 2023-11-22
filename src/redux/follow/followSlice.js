import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await fetch('http://127.0.0.1:3000/api/v1/posts');
//   const data = await response.json();
//   return data;
// });

export const followUser = createAsyncThunk('users/followUser', async (userId) => {
    const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/follow`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // body: {},
  });
//   const data = await response.json();
//   return data;
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const data = await response.json();
        return data 
        } catch (error) {
        console.error('Error during followUser:', error);
        throw error;
        }
});

export const unfollowUser = createAsyncThunk('users/unfollowUser', async (userId) => {
    const token = localStorage.getItem('token');
//   console.log(postId, likeId)

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/unfollow`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
//   if (response.status === 204) {
//     // No Content, handle it accordingly
//     return { postId, likeId };
//     }
  const data = await response.json();
  return data;
});


export const listFollowers = createAsyncThunk('users/listFollowers', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/followers`, {
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

export const listFollowees = createAsyncThunk('users/listFollowees', async (userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/users/${userId}/followees`, {
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


const followSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    followers: [],
    following: [],
    message: [],
    isLoading: false,
    success: false,
    response: null,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
    //   .addCase(followUser.fulfilled, (state, action) => ({
    //     // console.log(action.payload)
    //     ...state,
    //     loading: false,
    //     message: action.payload,
    //   }))
    // .addCase(followUser.fulfilled, (state, action) => {
    //     const newFollow= {id: action.payload.id, email: action.payload.email, username: action.payload.username};
    //     return{
    //         ...state,
    //         followers: followers.concat(newFollow)
    //   })  
    .addCase(followUser.fulfilled, (state, action) => {
        // console.log(action.payload)
        const newFollow = {
            id: action.payload.follower.id,
            email: action.payload.follower.email,
            username: action.payload.follower.username
        };
    
        return {
            ...state,
            followers: state.followers.concat(newFollow)
        };
    })
      .addCase(unfollowUser.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
    //   .addCase(unfollowUser.fulfilled, (state, action) => ({
    //     // console.log(action.payload)
    //     ...state,
    //     loading: false,
    //     message: action.payload,
    //   }))
      .addCase(unfollowUser.fulfilled, (state, action) => {
        // console.log(action.payload)
        const userId = action.payload.unfollower.id;
        const followers = state.followers;
        const index = followers.findIndex(follower => follower.id === userId);
        const newfollowersArray = [...followers.slice(0, index), ...followers.slice(index + 1)]

        return{
            ...state,
            followers: newfollowersArray
            
        }
        
    })
    //   .addCase(listFollowers.pending, (state) => ({
    //     ...state,
    //     loading: true,
    //     error: '',
    //   }))
      .addCase(listFollowers.pending, (state, action) => {
        // console.log(original(state.authentication)); // Log the payload
        return {
            ...state,
            loading: true,
            // likedPosts: action.payload
        };
    })
      .addCase(listFollowers.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        followers: action.payload,
      }))
      .addCase(listFollowers.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            // likedPosts: action.payload
        };
    })
      .addCase(listFollowees.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(listFollowees.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        following: action.payload,
      }))
  }
  })

export default followSlice.reducer;
