import React from 'react';

const ChatMessage = (props) => {
    const whichUser = () => {
        if (props.message.user_id === parseInt(props.currentUser.id)) {
            return 'current-user-message'
        } else {
            return 'other-user-message'
        }
    }
    
    return (
        <div id="chat-message" className={whichUser()}>
            <span>{props.user.attributes.username}</span>
            <h4>{props.message.body}</h4>
        </div>     
    )
}

export default ChatMessage;
