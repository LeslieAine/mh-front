import React, { useEffect, useState } from "react";
import Message from "./Message";
import actionCable from 'actioncable';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loadConversations } from "../../redux/conversations/conversationSlice";

const ws = new WebSocket("ws://localhost:3000/cable");


const Messages = ({
  messages,
  receiveMessage,
  user,
//   loadConversations,
}) => {
  const sortedMessages = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const { conversationId } = useParams()
    const dispatch = useDispatch();
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

    useEffect(() => {
        ws.onopen = () => {
          console.log("Connected to websocket server");
          ws.send(
            JSON.stringify({
              command: "subscribe",
              identifier: JSON.stringify({
                id: conversationId,
                channel: "ChatsChannel",
              }),
            })
          );
          setIsWebSocketOpen(true);
        };
    
        ws.onmessage = (e) => {
          const data = JSON.parse(e.data);
          if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
            return;
          }
    
          handleReceivedMessages(data);
        };

        return () => {
            if (isWebSocketOpen) {
              ws.close();
            }
          };
        }, [conversationId, isWebSocketOpen, dispatch, user.id]);
      
        useEffect(() => {
          dispatch(loadConversations(user.id));
        }, [dispatch, user.id]);
      

//   useEffect(() => {
//     const id = messages.length > 0 ? messages[0].conversation_id : 0;
//     const cable = actionCable.createConsumer('ws://localhost:3000/cable');

//     const subscription = cable.subscriptions.create({ channel: 'ChatsChannel', room_id: id }, {
//       connected() {
//         console.log('WebSocket connected');
//       },
//       received(data) {
//         handleReceivedMessages(data);
//       },
//     });

//     return () => {
//       cable.subscriptions.remove(subscription);
//       cable.disconnect();
//     };
//   }, [messages, 
//     // receiveMessage, 
//     user, loadConversations]);

// ws.onopen = () => {
//     console.log("Connected to websocket server");
//     // setGuid(Math.random().toString(36).substring(2, 15));

//     ws.send(
//       JSON.stringify({
//         command: "subscribe",
//         identifier: JSON.stringify({
//           id: conversationId,
//           channel: "ChatsChannel",
//         }),
//       })
//     );
//   };

//   ws.onmessage = (e) => {
//     const data = JSON.parse(e.data);
//     if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
//       return;
//     }

//     // Handle received message, you might want to update conversations here
//     // dispatch(loadConversations(user.id));
//     handleReceivedMessages(data)
//   };

//   useEffect(() => {
    // Load conversations when component mounts
//     dispatch(loadConversations(user.id));

//     // Clean up WebSocket connection when component unmounts
//     return () => {
//       ws.close();
//     };
//   }, [dispatch, user.id]);

  const handleReceivedMessages = (data) => {
    receiveMessage(data);
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




// import React, { useEffect, useRef, useState } from "react";
// import Message from "./Message";
// import actionCable from 'actioncable';
// import { useParams } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { loadConversations } from "../../redux/conversations/conversationSlice";

// const Messages = ({ messages, receiveMessage, user }) => {
//   const [webSocketOpen, setWebSocketOpen] = useState(false);
//   const sortedMessages = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//   const { conversationId } = useParams();
//   const dispatch = useDispatch();
//   const isComponentMounted = useRef(true);

//   useEffect(() => {
//     let cable = null;

//     const handleReceivedMessages = (data) => {
//       receiveMessage(data);
//       loadConversations(user.id);
//     };

//     const setupWebSocket = () => {
//       cable = new WebSocket("ws://localhost:3000/cable");

//       cable.onopen = () => {
//         console.log("Connected to websocket server");
//         setWebSocketOpen(true);

//         cable.send(
//           JSON.stringify({
//             command: "subscribe",
//             identifier: JSON.stringify({
//               id: conversationId,
//               channel: "ChatsChannel",
//             }),
//           })
//         );
//       };

//       cable.onmessage = (e) => {
//         const data = JSON.parse(e.data);
//         if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
//           return;
//         }

//         handleReceivedMessages(data);
//       };

//       cable.onclose = (event) => {
//         console.error("WebSocket closed:", event);

//         setWebSocketOpen(false);

//         // Attempt to reopen the WebSocket after a delay (e.g., 5 seconds)
//         setTimeout(() => {
//           console.log("Attempting to reconnect...");
//           // Check if the component is still mounted before attempting to reconnect
//           if (isComponentMounted.current) {
//             setupWebSocket();
//           }
//         }, 5000);
//       };
//     };

//     setupWebSocket();

//     return () => {
//       console.log("Cleaning up WebSocket connection");
//       if (cable) {
//         cable.close();
//       }
//       setWebSocketOpen(false);
//     };
//   }, [conversationId, receiveMessage, loadConversations, user.id]);

//   useEffect(() => {
//     return () => {
//       isComponentMounted.current = false;
//     };
//   }, []);

//   return (
//     <>
//       {sortedMessages.map((message) => (
//         <Message key={message.id} message={message} />
//       ))}
//     </>
//   );
// };

// export default Messages;






// import React, { useEffect, useState, useRef } from "react";
// import Message from "./Message";
// import actionCable from 'actioncable';
// import { useParams } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { loadConversations, receiveMessage } from "../../redux/conversations/conversationSlice";

// const Messages = ({
//   messages,
//   user,
// }) => {
//   const { conversationId } = useParams();
//   const dispatch = useDispatch();
//   const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
//   const [sortedMessages, setSortedMessages] = useState([]);
//   const isComponentMounted = useRef(true);

//   const ws = new WebSocket("ws://localhost:3000/cable");
//   const messagesContainerRef = useRef(null);

//   const handleReceivedMessages = (data) => {
//     dispatch(receiveMessage(data));
//     dispatch(loadConversations(user.id));
//   };

//   useEffect(() => {
//     if (isWebSocketOpen && ws.readyState === WebSocket.OPEN) {
//       ws.send(
//         JSON.stringify({
//           command: "subscribe",
//           identifier: JSON.stringify({
//             id: conversationId,
//             channel: "ChatsChannel",
//           }),
//         })
//       );
//     }
//   }, [conversationId, isWebSocketOpen, ws]);

// //   useEffect(() => {
// //     ws.onopen = () => {
// //       console.log("Connected to websocket server");
// //       setIsWebSocketOpen(true);
// //     };

// //     ws.onmessage = (e) => {
// //       const data = JSON.parse(e.data);
// //       if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
// //         return;
// //       }

// //       handleReceivedMessages(data);
// //     };

// //     return () => {
// //       if (isWebSocketOpen) {
// //         ws.close();
// //       }
// //     };
// //   }, [conversationId, isWebSocketOpen, ws]);

// useEffect(() => {
//     const cable = new WebSocket("ws://localhost:3000/cable");
  
//     cable.onopen = () => {
//       console.log("Connected to websocket server");
//       setIsWebSocketOpen(true);
  
//       cable.send(
//         JSON.stringify({
//           command: "subscribe",
//           identifier: JSON.stringify({
//             id: conversationId,
//             channel: "ChatsChannel",
//           }),
//         })
//       );
//     };
  
//     cable.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
//         return;
//       }
  
//       handleReceivedMessages(data);
//     };
  
//     cable.onclose = (event) => {
//       console.error("WebSocket closed:", event);
  
//       // Optional: Implement a reconnection mechanism here
//       setIsWebSocketOpen(false);
//       // Attempt to reopen the WebSocket after a delay (e.g., 5 seconds)
//       setTimeout(() => {
//         // Recursive call to reconnect
//         console.log("Attempting to reconnect...");
//         // You might want to check if the component is still mounted before attempting to reconnect
//         if (isComponentMounted.current) {
//           // Recursively call useEffect to reopen the WebSocket
//           useEffect();
//         }
//       }, 5000);
//     };
  
//     return () => {
//       console.log("Cleaning up WebSocket connection");
//       cable.close();
//       setIsWebSocketOpen(false);
//     };
//   }, [conversationId, handleReceivedMessages, isComponentMounted]);
  
  

//   useEffect(() => {
//     setSortedMessages([...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
//   }, [messages]);

//   useEffect(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   }, [sortedMessages]);

//   return (
//     <div
//       ref={messagesContainerRef}
//       style={{
//         height: "400px",
//         border: "1px solid gray",
//         overflow: "auto",
//         padding: "1rem",
//         display: "flex",
//         flexDirection: "column-reverse",
//       }}
//     >
//       {sortedMessages.map((message) => (
//         <Message key={message.id} message={message} />
//       ))}
//     </div>
//   );
// }

// export default Messages;











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