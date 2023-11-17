import React, { Fragment, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import avatar from './img/avatar.jpg';
import { APP_URL } from './constants/index';
// import { Button } from '@material-ui/core';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const useStyles = styled({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const ChatRooms = ({ updateCurrentUserRooms }) => {

    const authenticationState = useSelector((state) => state.authentication);
  const currentUser = authenticationState.user.status.data;

    const classes = useStyles();
    const [chatrooms, setChatrooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('currentuser ======>', currentUser)
        const token = localStorage.getItem('token'); // Retrieve the user's token
        // const { id } =  props.currentUser.attributes;
        fetch(`${APP_URL}/api/v1/conversations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                // 'token':  `Bearer ${token}`
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            var chatrooms = data.conversations;
            if(chatrooms.length > 0 && chatrooms !== undefined) {
                setChatrooms(chatrooms);
                updateCurrentUserRooms(data);
            }
        })
    }, [])

    const handleClick = (chatroom) => {
       navigate(`creator-homepage/messages/chatroom/${chatroom.id}`)
    }

    return (
        <Fragment>
            {
                (chatrooms.length !== 0 && chatrooms.length !== undefined) ? 
                    (<div>
                        <Grid container>
                            <Grid item xs={12} >
                                <Typography variant="h5" className="header-message">Chat</Typography>
                            </Grid>
                        </Grid>
                        <Grid container component={Paper} className={classes.chatSection}>
                            <Grid item xs={12} className={classes.borderRight500}>
                                <List>
                                    <ListItem button key={currentUser.username}>
                                        <ListItemIcon>
                                        {/* <Avatar alt={props.currentUser.attributes.username} src={avatar} /> */}
                                        </ListItemIcon>
                                        <ListItemText primary={currentUser.username}></ListItemText>
                                    </ListItem>
                                </List>
                                <Divider />
                                    <Grid item xs={12} style={{padding: '10px'}}>
                                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                                    </Grid>
                                <Divider />
                                <List>
                                {chatrooms.map((room) => {
                                    return (    
                                        <div>
                                            <ListItem button key={room.id}>
                                                <ListItemIcon>
                                                    <Avatar alt={room.title} src={room.title} />
                                                </ListItemIcon>
                                                <ListItemText primary={room.title}>{room.title}</ListItemText>
                                                <Button variant="contained" color="primary" onClick={() => handleClick(room)}>
                                                    Enter Room
                                                </Button>
                                            </ListItem>
                                        </div>
                                    )
                                })}
                                </List>
                            </Grid>
                        </Grid>
                    </div>) :
                    (<div>
                        <h1>Please Create a Room to Chat With friends</h1>
                    </div>)
            }
        </Fragment>
    )  
}

export default ChatRooms;