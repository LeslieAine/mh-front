import React from 'react'
import DMList from '../../creator/Messages/DmList'

function DmPage() {
    const messages = [
        {
          user: {
            username: 'user1',
            avatar: 'user1-avatar.jpg',
          },
          message: 'Hello, how are you?',
        },
        {
          user: {
            username: 'user2',
            avatar: 'user2-avatar.jpg',
          },
          message: 'I\'m doing great! Thanks for asking.',
        },
        // Add more DMs as needed
      ];

  return (
    <div>
        <DMList messages= {messages} />
    </div>
  )
}

export default DmPage

//just checking