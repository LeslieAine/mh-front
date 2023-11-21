import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { original } from 'immer'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/posts');
  const data = await response.json();
  return data;
});

export const addLike = createAsyncThunk('posts/addLike', async (postId, userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
});

export const deleteLike = createAsyncThunk('posts/deleteLike', async ({ postId, likeId }) => {
    const token = localStorage.getItem('token');
//   console.log(postId, likeId)

  const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/likes/${likeId}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 204) {
    // No Content, handle it accordingly
    return { postId, likeId };
    }
  const data = await response.json();
  return data;
});


export const addBookmark = createAsyncThunk('posts/addBookmark', async (postId, userId) => {
    const token = localStorage.getItem('token');

  const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/bookmarks`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
});

export const deleteBookmark = createAsyncThunk('posts/deleteBookmark', async ({ postId, bookmarkId }) => {
    const token = localStorage.getItem('token');
//   console.log(postId, likeId)

  const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/likes/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 204) {
    // No Content, handle it accordingly
    return { postId, bookmarkId };
    }
  const data = await response.json();
  return data;
});


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    posts: [],
    likedPosts: [],
    isLoading: false,
    success: false,
    response: null,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        // console.log(action.payload)
        ...state,
        loading: false,
        posts: action.payload,
      }))
      .addCase(deleteLike.rejected, (state, action) => {
        console.log(action.meta.arg.likeId); // Log the payload
        return {
            ...state,
            loading: false,
            // likedPosts: action.payload
        };
    })
      .addCase(addLike.fulfilled, (state, action) => {
        // console.log(original(state.posts))
        // console.log(action)

        const newLike= {id: action.payload.id, user_id: action.payload.user_id, post_id: action.payload.post_id};
        return{
            ...state,
            posts: state.posts.map((post) => {
                if(post.id === action.payload.post_id){
                    return {...post, likes: post.likes.concat(newLike)}
                    // return {
                    //     ...post, 
                    //     likes: action.payload}
                    }
                else{
                    return post
                }
            })
        }
      })  
      .addCase(deleteLike.fulfilled, (state, action) => {
        const postId = action.meta.arg.postId;
        const likeId = action.meta.arg.likeId;
        const post = state.posts.find((post) => post.id === postId);
        const index = post.likes.findIndex(like => like.id === likeId);
        const newlikesArray = [...post.likes.slice(0, index), ...post.likes.slice(index + 1)]

        return{
            ...state,
            posts: state.posts.map((post) => {
                if(post.id === action.payload.postId){
                    return {...post, likes: newlikesArray}
                    }
                else{
                    return post
                }
            })
            
        }
        
    })
    .addCase(addBookmark.fulfilled, (state, action) => {
        const newBookmark= {id: action.payload.id, user_id: action.payload.user_id, post_id: action.payload.post_id};
        return{
            ...state,
            posts: state.posts.map((post) => {
                if(post.id === action.payload.post_id){
                    return {...post, likes: post.bookmarks.concat(newBookmark)}
                    }
                else{
                    return post
                }
            })
        }
      })  
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        const postId = action.meta.arg.postId;
        const bookmarkId = action.meta.arg.bookmarkId;
        const post = state.posts.find((post) => post.id === postId);
        const index = post.bookmarks.findIndex(bookmark => bookmark.id === bookmarkId);
        const newbookmarkArray = [...post.bookmarks.slice(0, index), ...post.bookmarks.slice(index + 1)]

        return{
            ...state,
            posts: state.posts.map((post) => {
                if(post.id === action.payload.postId){
                    return {...post, likes: newbookmarkArray}
                    }
                else{
                    return post
                }
            })
            
        }
        
    })
  }
  })

export default postsSlice.reducer;






// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await fetch('http://127.0.0.1:3000/api/v1/posts');
//   const data = await response.json();
//   return data;
// });

// export const addLike = createAsyncThunk('posts/addLike', async ({ postId, userId }) => {
//     const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/like`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId }),
//     });
//     const data = await response.json();
//     return data;
//   });

//   export const deleteLike = createAsyncThunk('posts/deleteLike', async ({ postId, likeId }) => {
//     const response = await fetch(`http://127.0.0.1:3000/api/v1/posts/${postId}/like/${likeId}`, {
//       method: 'DELETE',
//     });
//     const data = await response.json();
//     return data;
//   });
  

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: {
//     loading: false,
//     posts: [],
//     likedPosts: [],
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         const newState = state;
//         newState.loading = true;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         const newState = state;
//         newState.loading = false;
//         newState.posts = action.payload;
//       })
//       .addCase(addLike.fulfilled, (state, action) => {
//         const { postId, like } = action.payload;
//         const postIndex = state.posts.findIndex((post) => post.id === postId);
//         state.posts[postIndex].likes.push(like);
//         state.likedPosts.push(state.posts[postIndex]);
//       })
//       .addCase(deleteLike.fulfilled, (state, action) => {
//         const { postId, likeId } = action.payload;
//         const postIndex = state.posts.findIndex((post) => post.id === postId);
//         const likeIndex = state.posts[postIndex].likes.findIndex((like) => like.id === likeId);
//         state.posts[postIndex].likes.splice(likeIndex, 1);
//         state.likedPosts = state.likedPosts.filter((post) => post.id !== postId);
//       });
//   },
// });

// export default postsSlice.reducer;
