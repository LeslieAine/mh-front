import { Div, Notification } from 'atomize';
import React, { useState, useEffect } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { useDispatch, useSelector } from 'react-redux';
import { createConsumer, ActionCable } from 'actioncable';   
import {
  loadConversations
//   markAsSeen,
} from '../../redux/conversations/conversationSlice';
// import { loadNotifications } from '../../actions/NotificationActions';
import ConversationLink from './ConversationLink';
import ChatroomWebSocket from '../chats/chatroomWebSocket';

const Conversations = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user.status.data);
  const conversations = useSelector((state) => state.conversation.userConversations);
//   const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

//   const [showNotification, setShowNotification] = useState(false);

  const handleReceivedConversation = () => {
    // setShowNotification(true);
    // dispatch(loadNotifications(user.id));
    dispatch(loadConversations(user.id));
  };

  useEffect(() => {
    // console.log(conversations)
    dispatch(loadConversations(user.id));
  }, [dispatch, user.id]);

//   const handleClick = (userId, conversationId) => {
//     // Define the logic to handle the click event, probably navigation or other operations
//     // For example, using the navigate method here
//     navigate(`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`);
//   };

  return (
    <Div>
        {/* <ChatroomWebSocket
        cableApp={cable} // Pass your cableApp instance from user object
        getRoomData={loadConversations} // Define your getRoomData function
        // roomData={yourRoomData} // Pass your roomData if needed
        updateApp={handleReceivedConversation} // Pass your handler for received data
      /> */}
      {/* <ActionCableConsumer
        channel={{ channel: 'RoomsChannel', cable: cable }}
        onReceived={handleReceivedConversation}
      /> */}
      {conversations.map((c) => (
        <div key={c.id}>
          <ConversationLink conversation={c} user={user}
        //   markAsSeen={markAsSeen} 
          />
        </div>
      ))}
      {/* <Notification bg="success700" isOpen={showNotification} onClose={() => setShowNotification(false)}>
        You have a New Conversation!
      </Notification> */}
    </Div>
  );
};

export default Conversations;






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