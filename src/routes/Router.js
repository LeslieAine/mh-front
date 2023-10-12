/* eslint-disable react/prop-types */
import React from 'react';
import {
  Routes, Route, Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreatorHomePage from '../components/creator/Pages/CreatorHomePage/CreatorHomePage';
import ContentPage from '../components/creator/Pages/Content/ContentPage';
import OrderPage from '../components/creator/Pages/Orders/OrderPage';
import DmPage from '../components/creator/Pages/Messages/DmPage';
import ViewCreator from '../components/creator/Pages/ViewCreatorProfile/ViewCreatorProfilePage';
import ContentList from '../components/creator/creator/content/ContentList';
import About from '../components/creator/creator/About/About';
import CreatorPostList from '../components/creator/creator/CreatorPosts/CreatorPostList';
import samplePosts from '../components/Client/ClientHomePage/post/SamplePosts';
import PostList from '../components/Client/ClientHomePage/post/PostList';
import LandingPage from '../components/Pages/LandingPage/Landing';


const AppRouter = () => {
  const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.authentication.user) || JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };
const contentData = [
    {
      title: 'Song Title 1',
      numberOfBuys: 100,
      price: '$0.99',
      length: '3:45',
    },
    {
      title: 'Song Title 2',
      numberOfBuys: 85,
      price: '$1.25',
      length: '4:12',
    },
    {
      title: 'Podcast Episode 1',
      numberOfBuys: 50,
      price: '$0.00 (Free)',
      length: '25:30',
    },
    {
      title: 'Ebook - Introduction to React',
      numberOfBuys: 120,
      price: '$9.99',
      length: '150 pages',
    },
    // Add more content items as needed
  ];


  return (
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/creator-homepage" element={(
            <ProtectedRoute>
                <CreatorHomePage />
            </ProtectedRoute>)}>
            <Route path="posts" element={<CreatorPostList />}/>
            <Route path="content" element={(<ContentPage />)}/>
            <Route path="orders" element={(<OrderPage />)}/>
            <Route path="messages" element={(<DmPage />)}/>
        </Route>
        <Route path="/creator-profile" element={(
            <ProtectedRoute>
                <ViewCreator /> 
            </ProtectedRoute>)}>
            <Route path="about-creator" element={<About />} />
            <Route path="content-list" element={<ContentList contentData={contentData} />} />
            <Route path="posts" element={<CreatorPostList />} />
        </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
