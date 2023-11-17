import React from 'react';
import { Div } from 'atomize';
import { Link } from 'react-router-dom';
import { makeConversationLink } from '../../helpers';
import { useDispatch } from 'react-redux';
import { markAsSeen } from '../../redux/conversations/conversationSlice';
import { useNavigate } from 'react-router-dom';

const ConversationLink = ({ user, conversation, conversationId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const conversationName = () => {
    let name = '';
    conversation.users
      ? conversation.users.map((user) => (name = name + '| ' + user.username + ' |'))
      : (name = 'Nothing Here');
    return name;
  };

//   const conversationId = conversation.id
  const userId = user.id

//   console.log(conversation, conversationId)

//   const handleRoomClick = () => {
//     navigate(`/creator-homepage/messages/users/45/conversations/4`);
//   };

//   console.log(user.id, conversation.id)

    // const conversationId = conversation.id

  const handleMarkAsSeen = () => {
    // console.log(conversation.id)
    dispatch(markAsSeen(user, conversation));
  };

//   const handleClick = () => {
//     const userId = user.id;
//     const conversationId = conversation.id;

//     // Direct the user to the conversation page
//     onClick(userId, conversationId);
//   };


  return (
    <Link key={conversationId} 
    // to="/creator-homepage/messages/users/:userId/conversations/:conversationId"
    to={`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`} 
    // to={/creator-homepage/messages/users/${userId}/conversations/${conversationId}} 
    // to={`/creator-homepage/messages/users/45/conversations/4`} 
    >
      <Div
        // onClick={handleRoomClick}
        className={
        //   conversation.seen ||
          conversation.chats[conversation.chats.length - 1].user_id === user.id
            ? 'conversation-seen'
            : 'conversation-not-seen'
        }
        p={{ x: '1rem', y: '0.75rem' }}
        border="1px solid"
        w="250px"
        borderColor="gray400"
      >
        {conversationName()}
      </Div>
    </Link>
  );
};

export default ConversationLink;





// import React from "react";
// import { Div } from "atomize";
// import { Link } from "react-router-dom";
// import { makeConversationLink } from "../../helpers";

// export default function ConversationLink({ user, conversation, markAsSeen }) {
//   const conversationName = (conversation) => {
//     let name = "";
//     conversation.users
//       ? conversation.users.map(
//           (user) => (name = name + "| " + user.name + " |")
//         )
//       : (name = "Nothing Here");
//     return name;
//   };
//   const handleMarkAsSeen = (conversation) => {
//     markAsSeen(user, conversation);
//   };

//   return (
//     <Link key={conversation.id} to={makeConversationLink(user, conversation)}>
//       <Div
//         onClick={() => handleMarkAsSeen(conversation)}
//         className={
//           conversation.seen ||
//           conversation.messages[conversation.messages.length - 1].user_id ===
//             user.id
//             ? "conversation-seen"
//             : "conversation-not-seen"
//         }
//         p={{ x: "1rem", y: "0.75rem" }}
//         border="1px solid"
//         w="250px"
//         borderColor="gray400"
//       >
//         {conversationName(conversation)}
//       </Div>
//     </Link>
//   );
// }