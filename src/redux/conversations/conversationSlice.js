// conversationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userConversations: [],
    chat: [],
    errors: false,  
};

  export const loadConversations = createAsyncThunk('conversation/loadConversations', async (userId, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem('token'); // Retrieve the user's token
        if (!token) {
          return rejectWithValue('User token is missing'); // Handle the case where the token is missing
        }
    
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/rooms`, { headers });
    
        return response.data;
      } catch (error) {
        if (error.response) {
          return rejectWithValue(error.response.data.error);
        } else {
          return rejectWithValue('An error occurred while loading chatrooms');
        }
      }
  });

// export const receiveMessage = createAsyncThunk('conversation/receiveMessage', async (message, { getState }) => {
//     const state = getState()
//     const findConversation = state.conversation.userConversations.find(
//       (c) => c.id === message.conversation.id
//     );
//     const duplicateCheck = findConversation.messages.find(
//       (m) => m.id === message.id
//     );
  
//     if (duplicateCheck === undefined) {
//       findConversation.messages.push(message);
  
//       const filteredConversation = state.userConversations.filter(
//         (c) => c.id !== message.conversation.id
//       );
//       filteredConversation.unshift(findConversation);
  
//       // Update the state with the modified userConversations
//       return { userConversations: [...filteredConversation], errors: false };
//     } else {
//       // If the message is a duplicate, return the existing state
//       return state;
//     }
//   });

export const receiveMessage = createAsyncThunk('conversation/receiveMessage', async (message, { getState }) => {
    const state = getState();
    const findConversation = state.userConversations.find((c) => c.id === message.conversation.id);
    const duplicateCheck = findConversation.messages.find((m) => m.id === message.id);
  
    if (duplicateCheck === undefined) {
      // Create a new message object with the incoming message
      const newMessage = { ...message };
  
      // Create a new conversation object with the updated messages
      const updatedConversation = {
        ...findConversation,
        messages: [...findConversation.messages, newMessage],
      };
  
      // Create a new array of conversations with the updated conversation
      const updatedConversations = state.userConversations.map((c) =>
        c.id === updatedConversation.id ? updatedConversation : c
      );
  
      // Update the state with the modified userConversations
      return { userConversations: updatedConversations, errors: false };
    } else {
      // If the message is a duplicate, return the existing state
      return state;
    }
  });
  
  

export const createConversation = createAsyncThunk('conversation/createConversation', async (data, { getState }) => {
    // Create a new conversation and messages
    // Replace this with your actual API request logic
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userId = user.id
    const state = getState()

    const response = await fetch(`http://localhost:3000/api/v1/users/${userId}/rooms`, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((resp) => resp.json());
    // return response;

    if (response.errors) {
        return { errors: response.errors };
  } else {
    let existingConversation = state.userConversations.find(
      (c) => c.id === response.id
    );

    if (existingConversation) {
      let otherConversations = state.userConversations.filter(
        (c) => c.id !== existingConversation.id
      );

      // Handle conversation update when it already exists
      return {
        ...state,
        userConversations: [response, ...otherConversations],
        errors: false,
      };
    } else {
      // Handle conversation creation when it doesn't exist
      return {
        ...state,
        userConversations: [response, ...state.userConversations],
        errors: false,
      };
    }
  }

});

export const markAsSeen = createAsyncThunk('conversation/markAsSeen', async (user, conversation) => {
    // Mark the conversation as seen
    const token = localStorage.getItem('token');

    // Replace this with your actual API request logic
    const response = await fetch(`http://localhost:3000/api/v1/users/${user.id}/rooms/${conversation.id}`, {
        method: 'PATCH',
        // credentials: 'include',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversation),
    }).then((resp) => resp.json());
    return response;
});

export const sendMessage = createAsyncThunk('conversation/sendMessage', async (message) => {
    // Send a message within a specific conversation
    const token = localStorage.getItem('token');
    // Replace this with your actual API request logic
    const response = await fetch('http://localhost:3000/api/v1/chats', {
        method: 'POST',
        // credentials: 'include',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    }).then((resp) => resp.json());
    return response;
});


const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
    resetErrors: (state) => ({
        ...state,
        error: '',
        isLoading: false,
        success: false,
        response: null,
      }),
  },
    extraReducers: (builder) => {
        builder
            .addCase(loadConversations.pending, (state) => ({
                ...state,
            isLoading: true,
            error: '',
            }))
            .addCase(loadConversations.fulfilled, (state, action) => ({
                ...state,
            isLoading: false,
            success: true,
                userConversations: action.payload,
            }))
            .addCase(loadConversations.rejected, (state, action) => ({
                ...state,
            isLoading: false,
            error: action.payload,
            }))

            .addCase(createConversation.pending, (state) => ({
                ...state,
            isLoading: true,
            error: '',
            }))
            .addCase(createConversation.fulfilled, (state, action) => ({
                ...state,
            isLoading: false,
            success: true,
                userConversations: action.payload,
            }))
            .addCase(createConversation.rejected, (state, action) => ({
                ...state,
            isLoading: false,
            error: action.payload,
            }))
        
            // .addCase(markAsSeen.fulfilled, (state, action) => {
            //     // Handle marking the conversation as seen
            //     // Update the userConversations state accordingly
            //     state.errors = false;
            // })
            // .addCase(markAsSeen.rejected, (state, action) => {
            //     state.errors = action.error.message;
            // })

            .addCase(sendMessage.pending, (state) => ({
                ...state,
            isLoading: true,
            error: '',
            }))
            .addCase(sendMessage.fulfilled, (state, action) => ({
                ...state,
            isLoading: false,
            success: true,
                chat: action.payload,
            }))
            .addCase(sendMessage.rejected, (state, action) => ({
                ...state,
            isLoading: false,
            error: action.payload,
            }))

            .addCase(receiveMessage.pending, (state) => ({
                ...state,
            isLoading: true,
            error: '',
            }))
            .addCase(receiveMessage.fulfilled, (state, action) => ({
                ...state,
            isLoading: false,
            success: true,
                chat: action.payload,
            }))
            .addCase(receiveMessage.rejected, (state, action) => ({
                ...state,
            isLoading: false,
            error: action.payload,
            }))
            .addCase(markAsSeen.pending, (state) => ({
                ...state,
            isLoading: true,
            error: '',
            }))
            .addCase(markAsSeen.fulfilled, (state, action) => ({
                ...state,
            isLoading: false,
            success: true,
                chat: action.payload,
            }))
            .addCase(markAsSeen.rejected, (state, action) => ({
                ...state,
            isLoading: false,
            error: action.payload,
            }))
    },
});

export const { resetErrors } = conversationSlice.actions;

export default conversationSlice.reducer;
