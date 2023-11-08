import React, { Fragment, useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { APP_URL } from './constants/index';
import ChatMessage from './chatMessage';
import ChatroomWebSocket from './chatroomWebSocket';

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const ChatRoomShow = ({ cableApp, currentUser, getRoomData, roomData, updateApp }) => {
  const [messageText, setMessageText] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setMessageText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const message = {
      body: messageText,
      chatroom_id: roomData.chatroom.id,
    };

    fetch(`${APP_URL}/api/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: message,
        user_id: currentUser.id,
      }),
    })
      .then((resp) => resp.json())
      .then((result) => {
        let messageDiv = document.getElementById('messages');
        messageDiv.scrollTop = messageDiv.scrollHeight;
        setMessageText('');
      });
  };

  const whichUser = (message) => {
    const user = roomData.users.data.find(
      (user) => parseInt(user.id) === message.user_id
    );
    return user;
  };

  const displayMessages = (messages) => {
    return messages.map((message) => {
      const user = whichUser(message);
      return message.body !== null ? (
        <ChatMessage
          key={message.id}
          message={message}
          user={user}
          currentUser={currentUser}
        />
      ) : (
        <div key={message.id}></div>
      );
    });
  };

  return (
    <Fragment>
      <div>
        <Grid item xs={9}>
          <List className={styles.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <div id="chat-feed">
                    <h3>Chat Feed:</h3>
                    <div id="messages">
                      {roomData.messages !== undefined &&
                      roomData.messages.length > 0 ? (
                        displayMessages(roomData.messages)
                      ) : (
                        <h3>This room has no messages yet - be the first to post!</h3>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                value={messageText}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>

        <ChatroomWebSocket
          cableApp={cableApp}
          getRoomData={getRoomData}
          roomData={roomData}
          updateApp={updateApp}
        />
      </div>
    </Fragment>
  );
};

export default styled(ChatRoomShow)(styles);


// import React, { Component, Fragment, useEffect, useState } from 'react';
// import { styled } from '@mui/system';
// import Grid from '@mui/material/Grid';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Fab from '@mui/material/Fab';
// import SendIcon from '@mui/icons-material/Send';
// // import avatar from './img/avatar.jpg';
// import { APP_URL } from './constants/index';
// import ChatMessage from './chatMessage';
// import ChatroomWebSocket from './chatroomWebSocket';

// const styles = theme => ({
//     table: {
//         minWidth: 650,
//     },
//     chatSection: {
//         width: '100%',
//         height: '80vh'
//     },
//     headBG: {
//         backgroundColor: '#e0e0e0'
//     },
//     borderRight500: {
//         borderRight: '1px solid #e0e0e0'
//     },
//     messageArea: {
//         height: '70vh',
//         overflowY: 'auto'
//     }
// });


// class ChatRoomShow extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             messageText: []
//         }
//     }

//     handleChange = (e) => {
//         e.preventDefault()
//         this.setState({
//             messageText: e.target.value
//         })
//     }   
    
//     handleSendMessage = (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token'); // Retrieve the user's token
//         const message = {
//             body: this.state.messageText,
//             chatroom_id: this.props.roomData.chatroom.id
//         }

//         fetch(`${APP_URL}/api/v1/messages`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'token': localStorage.getItem("token")
//             },
//             body: JSON.stringify({
//                 message: message, 
//                 user_id: this.props.currentUser.attributes.id
//             })
//         })
//         .then(resp => resp.json())
//         .then(result => {
//             let messageDiv = document.getElementById('messages')
//             messageDiv.scrollTop = messageDiv.scrollHeight
//             this.setState({
//                 messageText: ''
//             })
//         })
//     }

//     whichUser = (message) => {
//         const user = this.props.roomData.users.data.find(user => parseInt(user.id) === message.user_id )
//         return user
//     }

//     displayMessages = (messages) => {
//         return messages.map(message => {
//             const user = this.whichUser(message)
//             return (
//                 message.body !== null ? 
//                     <ChatMessage key={message.id} message={message} user={user} currentUser={this.props.currentUser}/> :
//                     <div></div>
//             )
//         }) 
//     }

//     render() {
//         const { classes } = this.props;
//         console.log('messages ==>', this.props.roomData.messages)
//         return(
//             <Fragment>
//                 <div>
//                     <Grid item xs={9}>
//                         <List className={classes.messageArea}>
//                             <ListItem key="1">
//                                 <Grid container>
//                                     <Grid item xs={12}>
//                                         <div id='chat-feed'>
//                                             <h3>Chat Feed:</h3>
//                                             <div id='messages'>
//                                                 { this.props.roomData.messages !== undefined && this.props.roomData.messages.length > 0 ? (
//                                                     this.displayMessages(this.props.roomData.messages)
//                                                 ) : (
//                                                     <h3>This room has no messages yet - be the first to post!</h3>
//                                                 ) }
//                                             </div>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </ListItem>
//                         </List>
//                         <Divider />
//                         <Grid container style={{padding: '20px'}}>
//                             <Grid item xs={11}>
//                                 <TextField id="outlined-basic-email" label="Type Something" value={this.state.messageText} onChange={this.handleChange} fullWidth />
//                             </Grid>
//                             <Grid xs={1} align="right">
//                                 <Fab color="primary" aria-label="add" onClick={this.handleSendMessage}><SendIcon /></Fab>
//                             </Grid>
//                         </Grid>
//                     </Grid>
    
//                     <ChatroomWebSocket
//                         cableApp={this.props.cableApp}
//                         getRoomData={this.props.getRoomData}
//                         roomData={this.props.roomData}
//                         updateApp={this.props.updateApp}
//                     />
//                 </div>
//             </Fragment>
//         )
//     }
// }

// export default styled(ChatRoomShow)(styles);
