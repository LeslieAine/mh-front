import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ChatRooms from '../chats/chatrooms'; // Import ChatRooms and other components
import CreateRoom from '../chats/createRoom';
import ChatRoomShow from '../chats/chatroomShow';
import { APP_URL } from '../chats/constants/index'; // Import constants as needed

const Conversation = (cable) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRooms, setCurrentUserRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    conversation: [],
    users: [],
    messages: [],
  });

  const { userId } = useParams();

const authenticationState = useSelector((state) => state.authentication);
  const user = authenticationState.user.status.data;

  useEffect(() => {
    setCurrentUser(user || JSON.parse(localStorage.getItem('user')));
  }, [user]);

//   const updateCurrentUser = (data) => {
//     setCurrentUser(data);
//   };
  

  const updateRooms = (data) => {
    const userrooms = currentUserRooms;
    setCurrentRoom({
      chatroom: data.chatroom,
      users: data.users,
    });
    setCurrentUserRooms(
      userrooms.includes(data.chatroom) ? userrooms : userrooms.concat(data.chatroom)
    );
  };

  const updateCurrentUserRooms = (data) => {
    setCurrentUserRooms(data.chatrooms);
  };

  const updateAppStateRoom = (newRoom) => {
    setCurrentRoom({
      chatroom: currentRoom.chatroom,
      users: currentRoom.users,
      messages: newRoom.messages,
    });
  };

  const getRoomData = (id) => {
    const token = localStorage.getItem('token'); // Retrieve the user's token

    fetch(`${APP_URL}/api/v1/conversations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)

        if (result.data) {
          setCurrentRoom({
            conversation: result.data,
            users: result.data.attributes.users,
            messages: result.data.attributes.messages,
          });
        } else {
          alert('Chatroom Not found!');
        }
      });
  };

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ChatRooms
              currentRoom={currentRoom.chatroom}
              updateCurrentUserRooms={updateCurrentUserRooms}
              currentUser={currentUser}
            />
          }
        />
        {/* <Route
          exact
          path= "/chatrooms/create"
          element={
            <CreateRoom
              currentUser={currentUser}
              updateRooms={updateRooms}
              currentRoom={currentRoom.chatroom}
            />
          }
        /> */}
        <Route
          exact
        //   path="/creator-profile/:userId/messages/createchat"
          path = {`/creator-profile/${userId}/messages/createchat`}
          element={
            <CreateRoom
              currentUser={currentUser}
              updateRooms={updateRooms}
              currentRoom={currentRoom.chatroom}
            />
          }
        />
        <Route
          exact
          path="creator-homepage/messages/chatroom/:id"
          element={
            <ChatRoomShow
              cableApp={cable}
              currentUser={currentUser}
              getRoomData={getRoomData}
              roomData={currentRoom}
              updateApp={updateAppStateRoom}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Conversation;




// import React, { useState, useEffect } from 'react';
// // import { Navigate, Route, Routes } from 'react-router-dom';
// // import Header from './components/Header';
// // import Login from './components/Login';
// // import Register from './components/Register';
// // import { isAuthenticated } from './utils'
// import { useSelector } from 'react-redux';
// import './conversation.css';
// import CreateRoom from '../chats/createRoom';
// import { APP_URL } from '../chats/constants/index';
// import ChatRooms from '../chats/chatrooms';
// import ChatRoomShow from '../chats/chatroomShow';
// import './conversation.css';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Updated import statements

// class Conversation extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             currentUser: null,
//             currentUserRooms: [],
//             currentRoom: {
//                 chatroom: [], 
//                 users: [],
//                 messages: []
//             }
//         }
//     }

//     updateCurrentUser = (data) => {
//         this.setState({
//             ...this.state,
//             currentUser: data
//         })
//     }

//     updateRooms = (data) => {
//         const userrooms = this.state.currentUserRooms;
//         this.setState({
//             ...this.state,
//             currentRoom: {
//                 chatroom: data.chatroom,
//                 users: data.users
//             },
//             currentUserRooms: userrooms.includes(data.chatroom) ? userrooms : userrooms.concat(data.chatroom)
//         })
//     }

//     updateCurrentUserRooms = (data) => {
//         this.setState({
//             ...this.state,
//             currentUserRooms: data.chatrooms
//         })
//     }

//     // handleLogout = () => {
//     //     localStorage.removeItem('jwt_token')
//     //     this.setState({
//     //       currentUser: null
//     //     })
//     //     return <Redirect to='/' />
//     // }

//     updateAppStateRoom = (newRoom) => {
//         this.setState({
//             ...this.state,
//             currentRoom: {
//                 chatroom: this.state.currentRoom.chatroom,
//                 users: this.state.currentRoom.users,
//                 messages: newRoom.messages
//             }
//         })
//     }
      
//     getRoomData = (id) => {
//         // const token = localStorage.getItem('token'); // Retrieve the user's token

//         fetch(`${APP_URL}/api/v1/conversations/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'token': localStorage.getItem("token")
//             }
//         })
//         .then(response => response.json())
//         .then(result => {
//             if(result.data){
//                 this.setState({
//                     currentRoom: {
//                         chatroom: result.data,
//                         users: result.data.attributes.users,
//                         messages: result.data.attributes.messages
//                     }
//                 })
//             } else {
//                 alert("Chatroom Not found!")
//             }
//         })
//     }


//     render() {
//         return (
//             <div>
//                 {/* <Header currentUser={this.state.currentUser} logout={this.handleLogout} /> */}
//                 <Routes>
//                     <Route exact path='/' render={(props) => {
//                         return <ChatRooms {...props} currentRoom={this.state.currentRoom['chatroom']} updateCurrentUserRooms={this.updateCurrentUserRooms} currentUser={this.state.currentUser} /> 
//                         // this.state.currentUser && this.state.currentRoom['room'] !== {} ? 
                            
//                         // :
//                             // // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//                             // 'please log in'
//                     }} />
//                     <Route exact path='/chatrooms/create' render={(props) => {
//                         return <CreateRoom {...props} currentUser={this.state.currentUser} updateRooms={this.updateRooms} currentRoom={this.state.currentRoom['chatroom']} /> 
//                         // this.state.currentUser ?    
//                         // :
//                             // // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//                             // 'please log in'
//                     }} />
//                     <Route exact path='/chatroom/:id' render={(props) => {
//                         return  <ChatRoomShow
//                                     {...props}
//                                     cableApp={this.props.cableApp}
//                                     currentUser={this.state.currentUser}
//                                     getRoomData={this.getRoomData}
//                                     roomData={this.state.currentRoom}
//                                     updateApp={this.updateAppStateRoom}
//                                 /> 
//                                 // (this.state.currentUser && this.getRoomData) ?
//                                 // : 
//                                 // 'cant send message'
//                                 // // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//                     }} />
//                     {/* <Route exact path='/auth/login' render={(props) => {
//                         return this.state.currentUser?
//                         <Redirect to='/' /> :
//                         <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//                     }} />
//                     <Route path='/auth/register' render={(props) => {
//                         return this.state.currentUser ?
//                         <Redirect to='/' /> :
//                         <Register {...props} updateCurrentUser={this.updateCurrentUser} />
//                     }}/> */}
//                 </Routes>
//             </div>
          
//         );
//     }
// }


// export default Conversation;


// // const Conversation = () => {
//     //     const user = useSelector((state) => state.authentication.user.status.data) || JSON.parse(localStorage.getItem('user'));
    
//     //     const [currentUser, setCurrentUser] = useState(null);
//     //     const [currentUserRooms, setCurrentUserRooms] = useState([]);
//     //     const [currentRoom, setCurrentRoom] = useState({
//     //         chatroom: [],
//     //         users: [],
//     //         messages: [],
//     //     });
//     //     const navigate = useNavigate();
//     // //   const data = useSelector((state) => state.chatrooms); // from Redux state structure ???
    
    
//     //     // const updateCurrentUser = (user) => {
//     //     //     setCurrentUser(user);
//     //     // };
//     //     useEffect(() => {
//     //         setCurrentUser(user);
//     //     }, [user]);
    
//     //     console.log(user)
    
//     //     const updateRooms = (data) => {
//     //         const userrooms = currentUserRooms;
//     //         setCurrentRoom({
//     //             chatroom: data.chatroom,
//     //             users: data.users,
//     //         });
//     //         setCurrentUserRooms(
//     //             userrooms.includes(data.chatroom) ? userrooms : userrooms.concat(data.chatroom)
//     //         );
//     //     };
    
//     //     const updateCurrentUserRooms = (data) => {
//     //         setCurrentUserRooms(data.chatrooms);
//     //     };
    
//     //     const updateAppStateRoom = (newRoom) => {
//     //         setCurrentRoom({
//     //             chatroom: currentRoom.chatroom,
//     //             users: currentRoom.users,
//     //             messages: newRoom.messages,
//     //         });
//     //     };
    
//     //     const getRoomData = (id) => {
//     //         const token = localStorage.getItem('token'); // Retrieve the user's token
    
//     //         fetch(`${APP_URL}/api/v1/conversations/${id}`, {
//     //             method: 'GET',
//     //             headers: {
//     //                 Authorization: user.token,
//     //                 'Content-Type': 'application/json',
//     //             },
//     //         })
//     //             .then((response) => response.json())
//     //             .then((result) => {
//     //                 if (result.data) {
//     //                     setCurrentRoom({
//     //                         chatroom: result.data,
//     //                         users: result.data.attributes.users,
//     //                         messages: result.data.attributes.messages,
//     //                     });
//     //                 } else {
//     //                     alert('Chatroom Not found!');
//     //                 }
//     //             });
//     //     };
    
//     //     return (
//     //         <div>
//     //             <Routes>
//     //                 <Route
//     //                     exact
//     //                     path="/"
//     //                     element={
//     //                         // currentUser && currentRoom['room'] !== {} ? 
//     //                         (
//     //                             <ChatRooms
//     //                                 currentRoom={currentRoom['chatroom']}
//     //                                 updateCurrentUserRooms={updateCurrentUserRooms}
//     //                                 currentUser={currentUser}
//     //                             />
//     //                         ) 
//     //                         // : (
//     //                             // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//     //                         //     'please log in'
//     //                         // )
//     //                     }
//     //                 />
//     //                 <Route
//     //                     exact
//     //                     path="/chatrooms/create"
//     //                     element={
//     //                         // currentUser ? 
//     //                         (
//     //                             <CreateRoom
//     //                                 currentUser={currentUser}
//     //                                 updateRooms={updateRooms}
//     //                                 currentRoom={currentRoom['chatroom']}
//     //                             />
//     //                         ) 
//     //                         // : (
//     //                         //     // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//     //                         //     'please log in'
//     //                         // )
//     //                     }
//     //                 />
//     //                 <Route
//     //                     exact
//     //                     path="/chatroom/:id"
//     //                     element={
//     //                         // currentUser && getRoomData ? 
//     //                         (
//     //                             <ChatRoomShow
//     //                                 // cableApp={cableApp}
//     //                                 currentUser={currentUser}
//     //                                 getRoomData={getRoomData}
//     //                                 roomData={currentRoom}
//     //                                 updateApp={updateAppStateRoom}
//     //                             />
//     //                         ) 
//     //                         // : (
//     //                         //     'cant send message'
//     //                         //     // <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//     //                         // )
//     //                     }
//     //                 />
//     //                 {/* <Route exact path='/auth/login' render={(props) => {
//     //                     return currentUser?
//     //                     <Redirect to='/' /> :
//     //                     <Login {...props} updateCurrentUser={this.updateCurrentUser} />
//     //                 }} />
//     //                 <Route path='/auth/register' render={(props) => {
//     //                     return currentUser ?
//     //                     <Redirect to='/' /> :
//     //                     <Register {...props} updateCurrentUser={this.updateCurrentUser} />
//     //                 }}/> */}
//     //             </Routes>
//     //         </div>
//     //     );
//     // };
    
//     // export default Conversation;
    



// // import { useEffect, useState, useRef } from "react";
// // import { useParams } from "react-router-dom";
// // import { createConsumer } from '@rails/actioncable'
// // import './conversation.css'

// // import React from 'react'

// // function ConversationPage({ user }) {
// //     const [messages, setMessages] = useState([])
// //     const [newMessage, setNewMessage] = useState('')
// //     const [conversationId, setConversationId] = useState(null);
// //     const params = useParams
// //     let cable = useRef()

// //     useEffect(()=> {
// //         if(!cable.current){
// //             cable = createConsumer('ws://localhost:3000/cable')
// //         }
// //         const paramsToSend = {
// //             channel: 'ConversationChannel',
// //             id: params.id
// //         }

// //         const handlers = {
// //             received(data){
// //                 setMessages([...messages, data])
// //             },
// //             connected() {
// //                 console.log('connected')
// //             },
// //             disconnected() {
// //                 console.log('disconnected')
// //                 cable.current = null
// //             }
// //         }

// //         const subscription = cable.subscriptions.create(paramsToSend, handlers)

// //         return function cleanup() {
// //             console.log('unsubbing from', params.id)
// //             cable.current = null
// //             subscription.unsubscribe()
// //         }
// //     }, [params.id, messages])

// //     // Function to start a conversation
// //   const startConversation = async () => {
// //     try {
// //       const response = await fetch('http://localhost:3000/api/v1/conversations', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': user.token, // Include the user's token for authentication
// //         },
// //         body: JSON.stringify({
// //             // name: "New Conversation",
// //             // user_id: user.id,
// //           // You can include any additional parameters or data you need
// //         }),
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setConversationId(data.id); // Set the conversation ID
// //         // console.log(conversationId)
// //         console.log(data)
// //         console.log('Conversation created');
// //       } else {
// //         console.error('Failed to create conversation');
// //       }
// //     } catch (error) {
// //       console.error('An error occurred:', error);
// //     }
// //   };

// //   // Function to send a message
// //   const sendMessage = async (conversationId) => {
// //     if (newMessage !== '' && conversationId) {
// //       try {
// //         const response = await fetch('http://localhost:3000/api/v1/messages', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': user.token,
// //           },
// //           body: JSON.stringify({
// //             body: newMessage,
// //             conversation_id: conversationId,
// //             user_id: user.id,
// //           }),
// //         });

// //         if (response.ok) {
// //           console.log('Message sent');
// //           setNewMessage('');
// //         } else {
// //           console.error('Failed to send message');
// //         }
// //       } catch (error) {
// //         console.error('An error occurred:', error);
// //       }
// //     }
// //   };


// // function handleSubmit(e) {
// //     e.preventDefault()
// //     // newMessage is the state variable
// //     // associated with our controlled form that 
// //     // stores the message content typed by a user,
// //     // and loggedInUser is a state variable
// //     // containing data about a user stored on login
// //     // and passed down from App.js as a prop
// //     if (newMessage !== '') {
// //       setNewMessage('')
// //       fetch('http://localhost:3000/api/v1/messages', {
// //         method: 'POST',
// //         headers: {
// //           'content-type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //         //   content: newMessage,
// //         //     conversation_id: params.id,
// //         //     user_id: user.id,
// //         message: {
// //             body: newMessage,
// //             conversation_id: params.id,
// //             user_id: user.id,
// //           },
// //         }),
// //       })
// //     }
// //   }

// // //   useEffect(() => {
// // //     console.log(conversationId);
// // //   }, [conversationId]);

// //   return (
// //     <div className="chat-container">
// //     <div className="chat-messages">
// //       {messages.map((message, index) => (
// //         <div key={index}>
// //           {message.body} {/* Display the message content */}
// //         </div>
// //       ))}
// //     </div>
// //     <div className="chat-input">
// //       <input
// //         type="text"
// //         value={newMessage}
// //         onChange={(e) => setNewMessage(e.target.value)}
// //         placeholder="Type your message"
// //       />
// //       {/* <button onClick={handleSubmit}>Send</button> */}
// //       <button onClick={() => sendMessage(conversationId)} disabled={!conversationId}>
// //           Send
// //         </button>
// //       <button onClick={startConversation}>Start Conversation</button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ConversationPage