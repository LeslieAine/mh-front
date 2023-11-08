import React from "react";
import { useSelector } from "react-redux";
import { Text } from "atomize";

const Message = ({ message }) => {
  const user = useSelector((state) => state.user.currentUser);

  const checkUser = () => {
    if (message.user_id === user.id) {
      return "own-message";
    } else {
      return "other-message";
    }
  };

  return (
    <Text
      className={user ? checkUser() : "message"}
      maxW="70%"
      w="auto"
      m="2px"
      p="5px"
    >
      {message.content}
    </Text>
  );
}

export default Message;






// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Text } from "atomize";

// class Message extends Component {
//   checkUser = () => {
//     const { message, user } = this.props;
//     if (message.user_id === user.id) {
//       return "own-message";
//     } else {
//       return "other-message";
//     }
//   };
//   render() {
//     const message = this.props.message;
//     return (
//       <Text
//         className={this.props.user ? this.checkUser() : "message"}
//         maxW="70%"
//         w="auto"
//         m="2px"
//         p="5px"
//       >
//         {message.content}
//       </Text>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   user: state.user.currentUser,
// });
// export default connect(mapStateToProps)(Message);