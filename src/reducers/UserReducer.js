export default function UserReducer(
    state = { currentUser: null, errors: false, loggedIn: false },
    action
  ) {
    switch (action.type) {
      case "LOGIN":
        return { ...state, currentUser: action.payload.user, loggedIn: true };
      case "SIGNUP":
        return {
          ...state,
          currentUser: action.payload.user,
          loggedIn: true,
        };
      case "SET_CURRENT_USER":
        return {
          ...state,
          currentUser: action.payload.user,
          loggedIn: action.payload.logged_in,
        };
      case "LOGOUT":
        return {
          ...state,
          currentUser: null,
          loggedIn: false,
        };
      case "REG_ERROR":
        return {
          ...state,
          errors: action.payload,
        };
      case "REMOVE_ERRORS":
        return { ...state, errors: false };
      case "LOAD_NOTIFICATIONS":
        return {
          ...state,
          currentUser: { ...state.currentUser, notifications: action.payload },
        };
      case "UPDATE_NOTIFICATION":
        const notifications = state.currentUser.notifications.map((n) =>
          n.id === action.payload.id ? action.payload : n
        );
        return {
          ...state,
          currentUser: { ...state.currentUser, notifications: notifications },
        };
      case "MARK_ALL_AS_SEEN":
        return {
          ...state,
          currentUser: { ...state.currentUser, notifications: action.payload },
        };
      default:
        return state;
    }
  }