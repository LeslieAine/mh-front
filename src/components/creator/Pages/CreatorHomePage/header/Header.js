import React from 'react'
import './Header.css'
import CreatorHeader from '../../../creator/CreatorHeader'

function Header() {

  const creator = {
    username: 'example_user',
    // avatar: 'user_avatar.jpg',
    points: 1000,
  };

  return (
    <div>
        <CreatorHeader creator={creator} />
    </div>
  )
}

export default Header