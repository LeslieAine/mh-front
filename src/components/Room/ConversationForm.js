import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createConversation, loadConversations } from '../../redux/conversations/conversationSlice';
import { Input, Button, Div } from 'atomize';
import { useNavigate } from 'react-router-dom';

const ConversationForm = () => {
  const [formData, setFormData] = useState({
    emailInput: '',
    chat: '',
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user.status.data);
  const conversations = useSelector((state) => state.conversation.userConversations.data);
  const clickedUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch conversations when the component mounts
    dispatch(loadConversations(user.id));
  }, [dispatch, user.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a chat already exists for the clicked user's email
    const existingChat = getExistingChat(user.id, clickedUser.email);

    // console.log(existingChat)
    
    if (existingChat) {
      // Redirect to the existing chat room
      navigate(`/creator-homepage/messages/users/${user.id}/conversations/${existingChat.id}`);
    } else {
      // Create a new chat
      const data = {
        userId: user.id,
        email: clickedUser.email,
        chat: formData.chat,
      };
      dispatch(createConversation(data));
      setFormData({
        emailInput: '',
        chat: '',
      });

      // Redirect to the newly created chat room
      navigate('/creator-homepage/messages/createchat');
    }
  };

  const getExistingChat = (userId, email) => {
    // Your logic to check if a chat already exists based on userId and email
    return conversations.find((chat) => {
        const users = chat.attributes.users;
        return users.some((user) => user.email === email);
      });
  };

  return (
    <Div w="100%">
      <p m="0 auto">Start New Conversation</p>
      <form onSubmit={handleSubmit} w="3rem">
        <Input
          type="text"
          onChange={handleChange}
          value={formData.chat}
          name="chat"
          placeholder="Enter a Hello message"
        />
        <Button m="0 auto" type="submit" bg="info700" hoverBg="info800" hoverShadow="4">
          Send
        </Button>
      </form>
    </Div>
  );
};

export default ConversationForm;





// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createConversation } from '../../redux/conversations/conversationSlice';
// import { Input, Button, Div } from 'atomize';
// import { useNavigate } from 'react-router-dom';

// const ConversationForm = () => {

//     const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     emailInput: '',
//     chat: '',
//   });

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.authentication.user.status.data);
//   const clickedUser = useSelector((state) => state.user.user)

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       userId: user.id,
//       email: clickedUser.email,
//       chat: formData.message,
//     };
//     dispatch(createConversation(data));
//     setFormData({
//       emailInput: '',
//       chat: '',
//     });

//     navigate(`/creator-homepage/messages/${user.id}`)
//   };

//   return (
//     <Div w="100%">
//       <p m="0 auto">Start New Conversation</p>
//       <form onSubmit={handleSubmit} w="3rem">
//         {/* <Input
//           type="text"
//           onChange={handleChange}
//           value={formData.emailInput}
//           name="emailInput"
//           placeholder="Enter email"
//         /> */}
//         <Input
//           type="text"
//           onChange={handleChange}
//           value={formData.chat}
//           name="chat"
//           placeholder="Enter a Hello message"
//         />
//         <Button m="0 auto" type="submit" bg="info700" hoverBg="info800" hoverShadow="4">
//           Send
//         </Button>
//       </form>
//     </Div>
//   );
// };

// export default ConversationForm;





// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { createConversation } from '../../actions/ConversationActions'
// import { Input, Button, Div } from "atomize";

// class ConversationForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             emailInput: "",
//             message: ""
//         }
//     }
//     handleChange = (event) => this.setState({ [event.target.name]: event.target.value })
//     handleSubmit = (event) => {
//         event.preventDefault()
//         const data = {userId: this.props.user.id, email: this.state.emailInput, message: this.state.message}
//         this.props.createConversation(data)
//         this.setState({ emailInput: "", message: "" })
//     }
//     render() {
//         return (
//             <Div w="100%">
//                 <p m="0 auto">Start New Conversation</p>
//                 <form onSubmit={this.handleSubmit} w="3rem" >
//                     <Input type="text" onChange={this.handleChange} value={this.state.emailInput} name="emailInput" placeholder="Enter email"/>
//                     <Input type="text" onChange={this.handleChange} value={this.state.message} name="message" placeholder="Enter a Hello message" />
//                     <Button m="0 auto" type="submit" bg="info700" hoverBg="info800" hoverShadow="4">Send</Button>
//                 </form>
//             </Div>
//         )
//     }
// }
// const mapDispatchToProps = dispatch => ({
//     createConversation: email => dispatch(createConversation(email))
// })
// const mapSateToProps = state => ({
//     user: state.user.currentUser
// })
// export default connect(mapSateToProps, mapDispatchToProps)(ConversationForm)