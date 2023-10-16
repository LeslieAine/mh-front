import React from 'react'
// import Header from './header/Header'
// import CreatorHeader from '../../creator/CreatorHeader'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import CreatePost from '../../creator/CreatorPosts/CreatePost'
// import PostList from './post/PostList'
// import samplePosts from './post/SamplePosts'
// import Footer from '../../NavBar/Footer/Footer'
// import ContentCreationBar from '../../creator/CreateContent/CreateContentBar'
// import ViewCreator from '../ViewCreatorProfile/ViewCreatorProfilePage'

function CreatorHomePage() {
  return (
    <div>
        {/* <Header />
        <PostList posts={samplePosts} />
        <ContentCreationBar /> */}
        {/* <ViewCreator /> */}
        {/* <Link to="/creator-profile/about-creator">About</Link>
        <Link to="/creator-profile/content-list">Content</Link>
        <Link to="/creator-profile/posts">Posts</Link> */}
        {/* <CreatorHeader /> */}
        <Header />
        <CreatePost />
        <Outlet />
    </div>
  )
}

export default CreatorHomePage