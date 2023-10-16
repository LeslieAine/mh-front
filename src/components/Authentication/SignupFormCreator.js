/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signupCreator } from '../../redux/authentication/AuthCreatorSlice';
import './SignupForm.css';

const SignupFormCreator = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creator, isLoading, error } = useSelector((state) => state.authentication);
  const [credentials, setCredentials] = useState({
    username: '',
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

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupCreator({ creator: credentials })).then(() => {
      if (creator) {
        navigate('/home');
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.name}
        onChange={handleInputChange}
      />
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
      <button type="submit">Signup</button>
      {error && <p>{error.message}</p>}
      <small className="prompt">
        Already have an account?
        <span onClick={toggleForm}> Signin</span>
      </small>
    </form>
  );
};

export default SignupFormCreator;
