/* eslint-disable react/prop-types */
import React from 'react';
import {
  Routes, Route, Navigate, useParams
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
// import Conversation from '../components/messages/ConversationPage';
// import { APP_CABLE_URL } from './constants';
import actionCable from 'actioncable';
import DisplayChats from '../components/messages/DisplayChats';
import Conversation from '../components/Room/Conversation';


const AppRouter = () => {
    const user = useSelector((state) => state.authentication.user) || JSON.parse(localStorage.getItem('user'));
    const CableApp = {};
    // CableApp.cable = actionCable.createConsumer(APP_CABLE_URL);
    CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
    // const userId = user.id;

//     const { id, conversationId } = useParams();

//   console.log("User ID:", id);
//   console.log("Conversation ID:", conversationId);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };


  return (
    <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/creator-homepage" element={(
            <ProtectedRoute>
                <CreatorHomePage />
            </ProtectedRoute>)}>
            <Route path="posts" element={<CreatorPostList user = {user}/>}/>
            <Route path="content" element={(<ContentPage />)}/>
            <Route path="orders" element={(<OrderPage />)}/>
            {/* <Route path="messages/*" element={(<Conversation cable={CableApp.cable} />)}/> */}
            <Route path="messages/*" element={(<DisplayChats cable={CableApp.cable}/>)}>
                {/* <Route
                // path={`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`}
                path="users/:id/conversations/:conversationId"
                // path="/creator-homepage/messages/users/45/conversations/5"
                // render={(routerProps) => <Conversation {...routerProps} />}
                element={<Conversation />}
                children={(routerProps) => <Conversation {...routerProps} />}
                />  */}
            </Route>

        </Route>
        <Route path="/creator-profile/:id" element={(
            <ProtectedRoute>
                <ViewCreator /> 
            </ProtectedRoute>)}>
            <Route path="about-creator" element={<About />} />
            <Route path="content-list" element={<ContentList />} />
            <Route path="posts" element={<CreatorPostList />} />
        </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
