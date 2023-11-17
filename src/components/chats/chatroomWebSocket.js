// import React, { useEffect } from 'react';

// const ChatroomWebSocket = ({ cableApp, getRoomData, updateApp}) => {
//     useEffect(() => {
//         console.log('cableApp:', cableApp);
//         const roomData = window.location.href.match(/\d+$/)
//         console.log(roomData)

//         if (!Object.isExtensible(cableApp)) {
//             cableApp = { ...cableApp }; // Create a shallow copy of cableApp
//           }
//         // Used getRoomData() to render data on ChatroomShow component
//         getRoomData(window.location.href.match(/\d+$/)[0]);

//         // To send params to the subscribed action in ChatroomsChannel
//         cableApp.room = cableApp.cable.subscriptions.create({
//             channel: 'RoomsChannel',
//             room: window.location.href.match(/\d+$/)[0],
//         }, {
//             received: (updatedRoom) => {
//                 updateApp(updatedRoom);
//             },
//         });
//     }, [cableApp, getRoomData, updateApp]);

//     return <div></div>;
// }

// export default ChatroomWebSocket;




// // // import React, { Component } from 'react';

// // // class ChatroomWebSocket extends Component {
// // //     componentDidMount() {
// // //         // used getRoomData() to render data on ChatroomShow component
// // //         this.props.getRoomData(window.location.href.match(/\d+$/)[0])
// // //         // the to send params to the subscribed action in ChatroomsChannel
// // //         this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create({
// // //             channel: 'ConversationChannel',
// // //             room: window.location.href.match(/\d+$/)[0]
// // //         }, 
// // //         {
// // //             received: (updatedRoom) => {
// // //                 this.props.updateApp(updatedRoom)
// // //             }
// // //         })
// // //     }

// // //     render() {
// // //         return (
// // //             <div></div>
// // //         )
// // //     }
// // // }

// // // export default ChatroomWebSocket