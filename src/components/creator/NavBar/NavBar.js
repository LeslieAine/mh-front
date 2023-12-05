import React from 'react';
import { useSelector } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

//   const userId = useSelector((state) => state.authentication.user.status.data.id); 


  return (
    <nav className="nav-container">

      <ul className="nav-list">
        <li>
          <Link className="nav-link" to="/creator-homepage/posts">
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/creator-homepage/content">
            <i className="fas fa-list"></i>
          </Link>
        </li>
        <li>
            <Link className="nav-link" to={`/creator-homepage/orders`}>
                <i className="fas fa-shopping-bag"></i>
            </Link>
        </li>
        <li>
          <Link className="nav-link" to="/creator-homepage/messages">
            <i className="fas fa-envelope"></i>
          </Link>
        </li>
        {/* <li>
          <button type="button" onClick={handleLogout} className="signout-btn">
            <FaUserCircle className="btn-logo" />
            Log Out
          </button>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
