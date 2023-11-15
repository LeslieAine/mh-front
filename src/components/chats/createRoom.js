import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AppBar, Button, Chip, FormControl, Input, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux'; // Import useSelector for Redux
import { APP_URL } from './constants/index';

const styles = (theme) => ({
  // Your styles here
  root: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        tabsIndicator: {
            backgroundColor: '#54AAB3',
        },
        selected: {
            backgroundColor: '#54AAB3',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: 14
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
});

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
//   const [users, setUsers] = useState([]);

  const currentUser = useSelector((state) => state.authentication.user.state.data);
  const visitedUser = useSelector((state) => state.user.user); // Assuming you have a 'visitedUser' in your Redux state


  const users = [currentUser.username, visitedUser.username];
//   console.log(users)

  useEffect(() => {
    const users = [currentUser.username, visitedUser.username];
    console.log(users)
      }, []);

//   useEffect(() => {
//     // Fetch users when the component mounts
//     const token = localStorage.getItem('token'); // Retrieve the user's token

//     fetch(`${APP_URL}/api/v1/users`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setUsers(data.map((user) => user.username));
//       });
//   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentUser && visitedUser) {
      // Create a conversation title (customize as needed)
      const conversationTitle = `Conversation between ${currentUser.username} and ${visitedUser.username}`;

      // Construct an array with both usernames
      const usersArray = [currentUser.username, visitedUser.username];

    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   };
  
    //   const response = await axios.post('http://localhost:3000/api/v1/posts', postProperties, { headers });
  
    //   return response.data;

      fetch(`${APP_URL}/api/v1/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          conversation: {
            title: conversationTitle,
          },
          users: usersArray
        })
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response as needed
          // You can update your Redux state here or take other actions
          console.log('Conversation created:', data);
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error creating conversation:', error);
        });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;

    if (name === 'roomName') {
      setRoomName(event.target.value);
    } else if (name === 'userName') {
      setUserName(event.target.value);
    }
  };

  const handleTabChange = () => {
    setCurrentTab(currentTab === 0 ? 1 : 0);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 4.5 * 48 + 8,
        width: 250,
      },
    },
  };

  return (
    <div className="form-items">
      <h1>Create Room</h1>
      <AppBar position="static" color='secondary' style={{"minWidth": 120}}>
        <Tabs value={currentTab} onChange={handleTabChange} classes={{indicator: styles.tabsIndicator}}>
          <Tab label="Public Room" classes={{selected: styles.selected}}/>
          <Tab label="Private Room" classes={{selected: styles.selected}}/>
        </Tabs>
      </AppBar>
      {currentTab === 0 && 
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h3>Enter Room Name</h3>
          <TextField
            label="Room Name"
            variant="outlined"
            name="roomName"
            value={roomName}
            onChange={handleChange}
          />
          <h3>Select users</h3>
          <FormControl className={styles.formControl}>
            <InputLabel id="demo-mutiple-chip-label">User Names</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              name="userName"
              multiple
              value={userName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={styles.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={styles.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {users.length > 0 ? users.map((name) => (
                <MenuItem key={name} value={name} >
                  {name}
                </MenuItem>
              )) : []}
            </Select>
            <br /><br />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      }
      {/* Render form for Private Room if needed */}
    </div>
  );
};

export default styled(styles)(CreateRoom);



// import React from 'react';
// // import { withStyles } from '@mui/styles';
// import { styled } from '@mui/system';
// import TextField from '@mui/material/TextField';
// import { AppBar, Button, Chip, FormControl, Input, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
// import { APP_URL } from './constants/index';

// const styles = (theme) => ({
//     root: {
//         '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//         },
//     },
//     tabsIndicator: {
//         backgroundColor: '#54AAB3',
//     },
//     selected: {
//         backgroundColor: '#54AAB3',
//         color: '#ffffff',
//         fontWeight: 600,
//         fontSize: 14
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//         maxWidth: 300,
//     },
//     chips: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     chip: {
//         margin: 2,
//     },
//     noLabel: {
//         marginTop: theme.spacing(3),
//     },
// });

// class CreateRoom extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = { 
//             roomName: '',
//             users: '',
//             currentTab: 0,
//             userName: []
//         }
//     }

//     componentDidMount() {
//         const token = localStorage.getItem('token'); // Retrieve the user's token

//         fetch(`${APP_URL}/users`, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               }
//         })
//         .then(response => response.json())
//         .then(data => {
//             var users = this.state.users;
//             this.setState({
//                 users: data.map((user) => user.username)
//             })
//         })
//     }        

//     handleSubmit = (e) => {
//         const token = localStorage.getItem('token'); // Retrieve the user's token
//         const currentUser = this.props.currentUser;
//         const visitedUser = this.props.visitedUser;

//         if (currentUser && visitedUser) {
//             // Create a conversation title (customize as needed)
//             const conversationTitle = `Conversation between ${currentUser.attributes.username} and ${visitedUser.attributes.username}`;
        
//             // Construct an array with both usernames
//             const usersArray = [currentUser.attributes.username, visitedUser.attributes.username];
        
//             fetch(`${APP_URL}/api/v1/conversations`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${token}`, // Use 'Authorization' header with token
//               },
//               body: JSON.stringify({
//                 conversation: {
//                   title: conversationTitle,
//                   users: usersArray,
//                 },
//               }),
//             })
//             .then(response => response.json())
//             .then(data => {
//                 // Handle the response as needed
//                 this.props.updateRooms(data);
//                 this.props.history.push('/');
//             })
//             .catch(error => {
//                 // Handle errors here
//                 console.error('Error creating conversation:', error);
//             });
//         }

//         // e.preventDefault()
//         // fetch(`${APP_URL}/api/v1/conversations`, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'Accept': 'application/json',
//         //         'token': localStorage.getItem("token")
//         //     },
//         //     body: JSON.stringify({
//         //         conversation: {
//         //             title: this.state.roomName,
//         //         }, 
//         //         users: this.state.userName.concat(this.props.currentUser.attributes.username),
//         //     })
//         // })
//         // .then(response => response.json())
//         // .then(data => {
//         //     this.props.updateRooms(data)
//         //     this.props.history.push('/')
//         // })
//     }   
        
//     handleChange = (event) => {
//         const name = event.target.name;
//         this.setState({
//             [name]: event.target.value,
//         });
//     };

//     handleTabChange = () => {
//         let tabValue = this.state.currentTab
//         // this.setState({
//         //     currentTab: tabValue == 0 ? tabValue + 1 : tabValue - 1
//         // })
//     }

//     ITEM_HEIGHT = 48;
//     ITEM_PADDING_TOP = 8;
//     MenuProps = {
//         PaperProps: {
//             style: {
//             maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
//             width: 250,
//             },
//         },
//     };

//     render() { 
//         const { classes } = this.props;
//         const { users, currentTab, roomName, userName } = this.state;

//         console.log('curent tab ===========> ', currentTab)
//         console.log('username ===========> ', userName)
//         return ( 
//             <div className="form-items">
//                 <h1>Create Room</h1>
//                 <AppBar position="static" color='secondary' style={{"min-width": 120}}>
//                     <Tabs value={currentTab} onChange={this.handleTabChange()} classes={{indicator: classes.tabsIndicator}}>
//                         <Tab label="Public Room" classes={{selected: classes.selected}}/>
//                         <Tab label="Private Room" classes={{selected: classes.selected}}/>
//                     </Tabs>
//                 </AppBar>
//                 {currentTab === 0 && 
//                     <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
//                         <h3>Enter Room Name</h3>
//                         <TextField
//                             label="Room Name" 
//                             variant="outlined" 
//                             name="roomName"
//                             value={roomName}
//                             onChange={this.handleChange}  
//                         />
//                         <h3>Select users</h3>
//                         <FormControl className={classes.formControl}>
//                             <InputLabel id="demo-mutiple-chip-label">User Names</InputLabel>
                            
//                             <Select
//                             labelId="demo-mutiple-chip-label"
//                             id="demo-mutiple-chip"
//                             name="userName"
//                             multiple
//                             value={userName}
//                             onChange={this.handleChange}
//                             input={<Input id="select-multiple-chip" />}
//                             renderValue={(selected) => (
//                                 <div className={classes.chips}>
//                                 {selected.map((value) => (
//                                     <Chip key={value} label={value} className={classes.chip} />
//                                 ))}
//                                 </div>
//                             )}
//                             MenuProps={this.MenuProps}
//                             >
//                             {users.length > 0 ? users.map((name) => (
//                                 <MenuItem key={name} value={name} >
//                                     {name}
//                                 </MenuItem>
//                             )) : []}
//                             </Select>
//                         </FormControl>
//                     <br></br><br></br>
//                     <Button variant="contained" color="primary" type="Submit">
//                         Submit
//                     </Button>
//                 </form>
//                 }
//                 {/* {this.state.currentTab === 1 &&  
//                     <form noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)} >
//                         <h3>Enter Room Name</h3>
//                         <TextField
//                             label="Room Name" 
//                             variant="outlined" 
//                             name="roomName"
//                             value={this.state.roomName}
//                             // onChange={(e) => this.handleChange(e)}  
//                         />
//                         <Button variant="contained" color="primary" type="Submit">
//                             Submit
//                         </Button>
//                     </form>
//                 } */}
//             </div>
//         );
//     }
// }

// export default styled(styles)(CreateRoom);