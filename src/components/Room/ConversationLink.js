import React from 'react';
import { Div } from 'atomize';
import { Link } from 'react-router-dom';
import { makeConversationLink } from '../../helpers';
import { useDispatch } from 'react-redux';
import { markAsSeen } from '../../actions/ConversationActions';

const ConversationLink = ({ user, conversation }) => {
  const dispatch = useDispatch();

  const conversationName = () => {
    let name = '';
    conversation.users
      ? conversation.users.map((user) => (name = name + '| ' + user.name + ' |'))
      : (name = 'Nothing Here');
    return name;
  };

  const handleMarkAsSeen = () => {
    dispatch(markAsSeen(user, conversation));
  };

  return (
    <Link key={conversation.id} to={makeConversationLink(user, conversation)}>
      <Div
        onClick={handleMarkAsSeen}
        className={
          conversation.seen ||
          conversation.messages[conversation.messages.length - 1].user_id === user.id
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