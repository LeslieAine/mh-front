export default function UserReducer(
    state = { userConversations: [], errors: false },
    action
  ) {
    switch (action.type) {
      case "LOAD_CONVERSATIONS":
        return { ...state, userConversations: action.payload };
      case "CREATE_CONVERSATION":
        if (action.payload.errors) {
          return { ...state, errors: action.payload.errors };
        } else {
          let existingConversation = state.userConversations.find(
            (c) => c.id === action.payload.id
          );
          if (existingConversation) {
            let otherConversations = state.userConversations.filter(
              (c) => c.id !== existingConversation.id
            );
            return {
              ...state,
              userConversations: [action.payload, ...otherConversations],
            };
          } else {
            return {
              ...state,
              userConversations: [action.payload, ...state.userConversations],
              errors: false,
            };
          }
        }
      case "RECEIVE_MESSAGE":
        const findConversation = state.userConversations.find(
          (c) => c.id === action.payload.message.conversation.id
        );
        const duplicateCheck = findConversation.messages.find(
          (m) => m.id === action.payload.message.id
        );
        if (duplicateCheck === undefined) {
          findConversation.messages.push(action.payload.message);
          const filteredConversation = state.userConversations.filter(
            (c) => c.id !== action.payload.message.conversation.id
          );
          filteredConversation.unshift(findConversation);
          return { ...state, userConversations: [...filteredConversation] };
        } else {
          return state;
        }
      case "MARK_AS_SEEN":
        const markAsSeen = state.userConversations.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
        return { ...state, userConversations: [...markAsSeen] };
      case "SEND_MESSAGE":
        // const newConversation = state.userConversations.find( c => c.id === action.payload.conversation.id)
        // newConversation.messages.push(action.payload)
        // const filteredConvs = state.userConversations.filter( c => c.id !== action.payload.conversation.id)
        // filteredConvs.push(newConversation)
        // return {...state, userConversations: [...filteredConvs]}
        //   console.log(action.payload);
        return state;
      case "REMOVE_ERRORS":
        return { ...state, errors: [] };
      default:
        return state;
    }
  }