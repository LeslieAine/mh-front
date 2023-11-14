import React, { useEffect } from "react";
import Message from "./Message";
import actionCable from 'actioncable';

const Messages = ({
  messages,
//   receiveMessage,
  user,
  loadConversations,
}) => {
  const sortedMessages = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  useEffect(() => {
    const id = messages.length > 0 ? messages[0].conversation_id : 0;
    const cable = actionCable.createConsumer('ws://localhost:3000/cable');

    const subscription = cable.subscriptions.create({ channel: 'ChatsChannel', room_id: id }, {
      connected() {
        console.log('WebSocket connected');
      },
      received(data) {
        handleReceivedMessages(data);
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
      cable.disconnect();
    };
  }, [messages, 
    // receiveMessage, 
    user, loadConversations]);

  const handleReceivedMessages = (data) => {
    // receiveMessage(data);
    loadConversations(user.id);
  };

  return (
    <>
      {sortedMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
}

export default Messages;






// import React from "react";
// import Message from "./Message";
// import { ActionCableConsumer } from "react-actioncable-provider";

// const Messages = ({
//   messages,
//   receiveMessage,
//   user,
//   loadConversations,
// }) => {
 
//     const sortedMessages = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//     // console.log(messages)
//   const handleReceivedMessages = (data) => {
//     receiveMessage(data);
//     loadConversations(user.id);
//   };
// //   const id = messages.length > 0 ? messages[0].conversation_id : 0;
//   return (
//     <>
//       <ActionCableConsumer
//         channel={{
//           channel: "ChatsChannel",
//           room_id: id,
//         }}
//         onReceived={handleReceivedMessages}
//       />
//       {sortedMessages.map((message) => (
//         <Message key={message.id} message={message} />
//       ))}
//     </>
//   );
// }

// export default Messages;