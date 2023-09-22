import React from 'react'
import './Header.css'
import UserHeader from '../../user/UserHeader'

function Header() {

  const user = {
    username: 'example_user',
    avatar: 'user_avatar.jpg',
    points: 1000,
  };

  return (
    <div>
        <UserHeader user={user} />
    </div>
  )
}

export default Header