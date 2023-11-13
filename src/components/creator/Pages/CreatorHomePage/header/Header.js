import React from 'react'
import './Header.css'
import CreatorHeader from '../../../creator/CreatorHeader'
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector((state) => state.authentication.user) || JSON.parse(localStorage.getItem('user'));

  return (
    <div>
        <CreatorHeader user={user} />
    </div>
  )
}

export default Header