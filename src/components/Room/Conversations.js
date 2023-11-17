import { Div } from 'atomize';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConversationLink from './ConversationLink';
import { loadConversations } from '../../redux/conversations/conversationSlice';
import { useParams } from 'react-router-dom';

const Conversations = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user.status.data);
  const conversations = useSelector((state) => state.conversation.userConversations.data);
  const { conversationId } = useParams();

  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Establish a new WebSocket connection
    const newWebSocket = new WebSocket("ws://localhost:3000/cable");

    newWebSocket.onopen = () => {
      console.log("Connected to websocket server");
      setIsWebSocketOpen(true);

      // Send the subscription command once the WebSocket is fully open
      newWebSocket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: conversationId,
            channel: "RoomsChannel",
          }),
        })
      );
    };

    newWebSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
        return;
      }

      // Handle received message, you might want to update conversations here
      dispatch(loadConversations(user.id));
    };

    newWebSocket.onclose = () => {
      setIsWebSocketOpen(false);
    };

    // Close the old WebSocket if it exists
    if (ws.current && isWebSocketOpen) {
      ws.current.close();
    }

    // Save the new WebSocket reference
    ws.current = newWebSocket;

    return () => {
      if (isWebSocketOpen) {
        ws.current.close();
      }
    };
  }, [dispatch, user.id, conversationId]);

  if (!isWebSocketOpen) {
    // WebSocket connection is not yet established
    return <div>Connecting...</div>;
  }

  if (!conversations) {
    // Conversations data is still loading
    return <div>Loading...</div>;
  }

  return (
    <Div>
      {conversations.map((c) => (
        <div key={c.id}>
          <ConversationLink conversation={c.attributes} user={user} conversationId={c.id} />
        </div>
      ))}
    </Div>
  );
};

export default Conversations;









// import { Div, Notification } from 'atomize';
// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ConversationLink from './ConversationLink';
// import { loadConversations } from '../../redux/conversations/conversationSlice';
// import { useParams } from 'react-router-dom';

// const Conversations = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.authentication.user.status.data);
//   const conversations = useSelector((state) => state.conversation.userConversations.data);
//   const { conversationId } = useParams();

//   const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
//   const ws = useRef(null);

//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:3000/cable");

//     ws.current.onopen = () => {
//       console.log("Connected to websocket server");
//       ws.current.send(
//         JSON.stringify({
//           command: "subscribe",
//           identifier: JSON.stringify({
//             id: conversationId,
//             channel: "RoomsChannel",
//           }),
//         })
//       );
//       setIsWebSocketOpen(true);
//     };

//     ws.current.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") {
//         return;
//       }

//       // Handle received message, you might want to update conversations here
//       dispatch(loadConversations(user.id));
//     };

//     ws.current.onclose = () => {
//       setIsWebSocketOpen(false);
//     };

//     return () => {
//       ws.current.close();
//     };
//   }, [conversationId, dispatch, user.id]);

//   if (!isWebSocketOpen) {
//     // WebSocket connection is not yet established
//     return <div>Connecting...</div>;
//   }

//   if (!conversations) {
//     // Conversations data is still loading
//     return <div>Loading...</div>;
//   }

//   return (
//     <Div>
//       {conversations.map((c) => (
//         <div key={c.id}>
//           <ConversationLink conversation={c.attributes} user={user} conversationId={c.id} />
//         </div>
//       ))}
//     </Div>
//   );
// };

// export default Conversations;








// import { Div, Notification } from 'atomize';
// import React, { useState, useEffect } from 'react';
// // import { ActionCableConsumer } from 'react-actioncable-provider';
// import { useDispatch, useSelector } from 'react-redux';
// // import { createConsumer, ActionCable } from 'actioncable';  
// import actionCable from 'actioncable';   
// import {
//   loadConversations
// //   markAsSeen,
// } from '../../redux/conversations/conversationSlice';
// // import { loadNotifications } from '../../actions/NotificationActions';
// import ConversationLink from './ConversationLink';
// import { useParams } from 'react-router-dom';
// // import ChatroomWebSocket from '../chats/chatroomWebSocket';


// const ws = new WebSocket("ws://localhost:3000/cable");

// const Conversations = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.authentication.user.status.data);
//   const conversations = useSelector((state) => state.conversation.userConversations.data);
// //   const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

// //   const [showNotification, setShowNotification] = useState(false);


// const { conversationId } = useParams()

// // console.log(conversations)

// ws.onopen = () => {
//     console.log("Connected to websocket server");
//     // setGuid(Math.random().toString(36).substring(2, 15));

//     ws.send(
//       JSON.stringify({
//         command: "subscribe",
//         identifier: JSON.stringify({
//           id: conversationId,
//           channel: "RoomsChannel",
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
//     dispatch(loadConversations(user.id));
//   };

//   useEffect(() => {
//     // Load conversations when component mounts
//     dispatch(loadConversations(user.id));

//     // Clean up WebSocket connection when component unmounts
//     return () => {
//       ws.close();
//     };
//   }, [dispatch, user.id]);

// // useEffect(() => {
// //     // const id = conversations.length > 0 ? conversations[0].id : 0;
// //     const cable = actionCable.createConsumer('ws://localhost:3000/cable');

// //     const subscription = cable.subscriptions.create(
// //       { channel: 'RoomsChannel', room_id: conversationId },
// //       {
// //         connected() {
// //           console.log('WebSocket connected');
// //         },
// //         received(data) {
// //           handleReceivedConversation();
// //         },
// //       }
// //     );

// //     return () => {
// //       cable.subscriptions.remove(subscription);
// //       cable.disconnect();
// //     };
// //   }, [conversationId]);

// //   const handleReceivedConversation = () => {
// //     // setShowNotification(true);
// //     // dispatch(loadNotifications(user.id));
// //     // dispatch(loadConversations(user.id));
// //   };

//   useEffect(() => {
//     console.log(conversations)
//     dispatch(loadConversations(user.id));
//   }, [dispatch, user.id]);
// // useEffect(() => {
// //     // console.log(conversations)
// //     dispatch(loadConversations());
// //   }, []);

// //   const handleClick = (userId, conversationId) => {
// //     // Define the logic to handle the click event, probably navigation or other operations
// //     // For example, using the navigate method here
// //     navigate(`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`);
// //   };
//     if (!conversations) {
//         // Conversations data is still loading, you can return a loading state
//         return <div>Loading...</div>;
//     }

//   return (
//     <Div>
//       {/* <ActionCableConsumer
//         channel={{ channel: 'RoomsChannel', cable: cable }}
//         onReceived={handleReceivedConversation}
//       /> */}
//       {conversations.map((c) => (
//         <div key={c.id}>
//           <ConversationLink conversation={c.attributes} user={user}
//           conversationId = {c.id}
//         //   markAsSeen={markAsSeen} 
//           />
//         </div>
//       ))}
//       {/* <Notification bg="success700" isOpen={showNotification} onClose={() => setShowNotification(false)}>
//         You have a New Conversation!
//       </Notification> */}
//     </Div>
//   );
// };

// export default Conversations;






// import { Div, Notification } from "atomize";
// import React, { Component } from "react";
// import { ActionCableConsumer } from "react-actioncable-provider";
// import { connect } from "react-redux";
// import {
//   loadConversations,
//   markAsSeen,
// } from "../../actions/ConversationActions";
// import { loadNotifications } from "../../actions/NotificationActions";
// import ConversationLink from "./ConversationLink";

// class Conversations extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showNotification: false,
//     };
//   }
//   handleReceivedConversation = (conversation) => {
//     this.setState({ showNotification: true });
//     // this.props.loadNotifications(this.props.user.id);
//     this.props.loadConversations(this.props.user.id);
//   };

//   render() {
//     const { showNotification } = this.state;

//     return (
//       <Div>
//         <ActionCableConsumer
//           channel={{ channel: "ConversationsChannel" }}
//           onReceived={this.handleReceivedConversation}
//         />
//         {this.props.conversations.map((c) => (
//           <div key={c.id}>
//             <ConversationLink
//               conversation={c}
//               user={this.props.user}
//               markAsSeen={this.props.markAsSeen}
//             />
//           </div>
//         ))}
//         <Notification
//           bg="success700"
//           isOpen={showNotification}
//           onClose={() => this.setState({ showNotification: false })}
//         >
//           You have a New Conversation!
//         </Notification>
//       </Div>
//     );
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   loadConversations: (userId) => dispatch(loadConversations(userId)),
//   markAsSeen: (user, conversation) => dispatch(markAsSeen(user, conversation)),
//   loadNotifications: (userId) => dispatch(loadNotifications(userId)),
// });
// const mapStateToProps = (state) => ({
//   user: state.user.currentUser,
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Conversations);