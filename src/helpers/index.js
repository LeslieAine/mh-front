export function makeConversationLink(user, conversation) {
    if (user && conversation) {
      return `/creator-homepage/messages/users/${user.id}/conversations/${conversation.id}`;
    }
  }

  
  export function makeNotificationLink(user, conversation_id) {
    return `/users/${user.id}/conversations/${conversation_id}`;
  }
//   export function makeNotificationNumber(user) {
//     const unSeen = user.notifications.filter((n) => !n.seen);
//     return unSeen.length;
//   }