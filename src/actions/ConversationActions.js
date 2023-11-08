export function loadConversations(userId) {
    return (dispatch) => {
      fetch(`http://localhost:3000/users/${userId}/conversations`)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({ type: "LOAD_CONVERSATIONS", payload: data });
        });
    };
  }
  export function createConversation(data) {
    return (dispatch) => {
      fetch(`http://localhost:3000/users/${data.userId}/conversations/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => dispatch({ type: "CREATE_CONVERSATION", payload: data }))
        .catch((error) => console.log(error));
    };
  }
  export function markAsSeen(user, conversation) {
    return (dispatch) => {
      fetch(
        `http://localhost:3000/users/${user.id}/conversations/${conversation.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(conversation),
        }
      )
        .then((resp) => resp.json())
        .then((data) => dispatch({ type: "MARK_AS_SEEN", payload: data }))
        .catch((error) => console.log(error));
    };
  }