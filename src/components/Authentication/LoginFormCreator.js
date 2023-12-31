// /* eslint-disable react/prop-types */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { loginUser } from '../../redux/authentication/AuthenticationSlice';
// import './LoginForm.css';

// const LoginFormCreator = ({ toggleForm }) => {
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isLoading, error } = useSelector((state) => state.authentication);
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: '',
//     role: 'creator'
//   });

//   const handleInputChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ user: credentials })).then(() => {
//       if (user) {
//         navigate('/houses');
//       }
//     });
//   };

//   const toggleMode = () => {
//     setIsLoginMode(!isLoginMode);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <form className="login-form" onSubmit={handleLogin}>
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={credentials.email}
//         onChange={handleInputChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={credentials.password}
//         onChange={handleInputChange}
//       />

//       <button type="submit">Login</button>
//       {error && <p>{error}</p>}
//       <small className="prompt">
//         Dont have an account?
//         <span onClick={toggleMode}> Signup</span>
//       </small>
//     </form>
//   );
// };

// export default LoginFormCreator;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authentication/AuthenticationSlice';
import './LoginForm.css';

// Import the SignupFormCreator component
import SignupFormCreator from './SignupFormCreator'; // Replace with the correct path
import { loadConversations } from '../../redux/conversations/conversationSlice';

const LoginFormCreator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.authentication);
  
  // State to track login/signup mode
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'creator'
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ user: credentials })).then(() => {
      if (user) {
        navigate('/creator-homepage/posts');
      }

      // dispatch(loadConversations(user.id))
    });

    // dispatch(loginUser({ user: credentials })).then((action) => {
    //   if (action.payload.user) {
    //     // Store the JWT token in local storage
    //     const token = action.payload.token;
    //     localStorage.setItem('token', token);
    //     navigate('/creator-homepage/posts');
    //   }
    // });
  };

  // Function to toggle between login and signup modes
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoginMode ? ( // Render login form
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />

          <button type="submit">Login</button>
          {error && <p>{error}</p>}
          <small className="prompt">
            Don't have an account?{' '}
            <span onClick={toggleMode}>Signup</span>
          </small>
        </form>
      ) : ( // Render signup form
        <SignupFormCreator toggleForm={toggleMode} />
      )}
    </div>
  );
};

export default LoginFormCreator;

