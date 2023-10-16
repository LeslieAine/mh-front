import React, { useState } from 'react';
import SignupFormClient from '../../Authentication/SignupFormClient';
import SignupFormCreator from '../../Authentication/SignupFormCreator';
import LoginFormCreator from '../../Authentication/LoginFormCreator';
import LoginFormClient from '../../Authentication/LoginFormClient';
// import LoginForm from '../../components/Authentication/LoginForm';
import './Landing.css';
// import LoginForm from '../../Authentication/LoginFormCreator';

const LandingPage = () => {
  const [isGettingStarted, setIsGettingStarted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('client');
  const [isLogin, setIsLogin] = useState(true);
  
  const handleGetStarted = (role) => {
    setSelectedRole(role);
    setIsGettingStarted(true);
  };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

const toggleForm = () => {
    setIsGettingStarted(false);
    setIsLogin(!isLogin);
  };

  const renderForm = () => {
    if (selectedRole === 'client') {
      return (
        <>
          {isGettingStarted ? (
            <LoginFormClient toggleForm={toggleForm} />
          ) : (
            <SignupFormClient toggleForm={toggleForm} />
          )}
        </>
      );
    } else if (selectedRole === 'creator') {
      return (
        <>
          {isGettingStarted ? (
            <LoginFormCreator toggleForm={toggleForm} />
          ) : (
            <SignupFormCreator toggleForm={toggleForm} />
          )}
        </>
      );
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-content">
      {isGettingStarted ? (
          renderForm()
        ) : (
          <>
            <h1 className="landing-page-title">
              Every house has the ability to inspire!
            </h1>
            <button
              type="button"
              onClick={() => handleGetStarted('client')}
              className="landing-page-btn"
            >
              Get Started as a Client
            </button>
            <button
              type="button"
              onClick={() => handleGetStarted('creator')}
              className="landing-page-btn"
            >
              Get Started as a Creator
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
