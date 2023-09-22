import React from 'react';
// import { useDispatch } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
//   const [isListShown, setIsListShown] = useState(false);
//   const dispatch = useDispatch();

//   const closeList = () => {
//     document.querySelector('.nav-list').classList.remove('visible');
//     setIsListShown(false);
//   };

//   const showList = () => {
//     document.querySelector('.nav-list').classList.add('visible');
//     setIsListShown(true);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     localStorage.removeItem('user');
//     window.location.reload();
//   };

  return (
    <nav className="nav-container">
      {/* <div className="nav-icons">
        <section className="logo-cont">
          <img className="logo" src={logo} alt="our logo" />
        </section>
        <section className="toggled-btns">
          {isListShown ? (
            <CloseBtn onClick={closeList} />
          ) : (
            <Hamburger onClick={showList} />
          )}
        </section>
      </div> */}
      <ul className="nav-list">
        <li>
          <Link className="nav-link" to="/">
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/content">
            <i className="fas fa-list"></i>
          </Link>
        </li>
        <li>
            <Link className="tab" to="/orders">
                <i className="fas fa-shopping-bag"></i>
            </Link>
        </li>
        <li>
          <Link className="nav-link" to="/messages">
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
