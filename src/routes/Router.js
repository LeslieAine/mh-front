/* eslint-disable react/prop-types */
import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import CreatorHomePage from '../components/creator/Pages/CreatorHomePage/CreatorHomePage';
import ContentPage from '../components/creator/Pages/Content/ContentPage';
import OrderPage from '../components/creator/Pages/Orders/OrderPage';
import DmPage from '../components/creator/Pages/Messages/DmPage';


const AppRouter = () => {
//   const ProtectedRoute = ({ children }) => {
//     const user = useSelector((state) => state.authentication.user) || JSON.parse(localStorage.getItem('user'));

//     if (!user) {
//       return <Navigate to="/" replace />;
//     }

//     return children;
//   };
  return (
    <Routes>
      {/* <Route exact path="/" element={<LandingPage />} /> */}
      <Route
        path="/"
        element={(
            <CreatorHomePage />
      )}
      />
      <Route
        path="/content"
        element={(
            <ContentPage />
      )}
      />
      <Route
        path="/orders"
        element={(
            <OrderPage />
      )}
      />
      <Route
        path="/messages"
        element={(
            <DmPage />
      )}
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
