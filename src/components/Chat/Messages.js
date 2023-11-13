import React from "react";
import Message from "./Message";
// import { ActionCableConsumer } from "react-actioncable-provider";

const Messages = ({
  messages,
  receiveMessage,
  user,
  loadConversations,
}) => {
//   const sortedMessages = messages.sort(
//     (a, b) => new Date(b.created_at) - new Date(a.created_at)
//   );
  const handleReceivedMessages = (data) => {
    receiveMessage(data);
    loadConversations(user.id);
  };
  const id = messages.length > 0 ? messages[0].conversation_id : 0;
  return (
    <>
      {/* <ActionCableConsumer
        channel={{
          channel: "ChatsChannel",
          room_id: id,
        }}
        onReceived={handleReceivedMessages}
      /> */}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
}

export default Messages;