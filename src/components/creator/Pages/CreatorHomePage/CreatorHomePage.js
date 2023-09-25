import React from 'react'
import Header from './header/Header'
import PostList from './post/PostList'
import samplePosts from './post/SamplePosts'
// import Footer from '../../NavBar/Footer/Footer'
import ContentCreationBar from '../../creator/CreateContent/CreateContentBar'
import ViewCreator from '../ViewCreatorProfile/ViewCreatorProfilePage'

function CreatorHomePage() {
  return (
    <div>
        {/* <Header />
        <PostList posts={samplePosts} />
        <ContentCreationBar /> */}
        <ViewCreator />
    </div>
  )
}

export default CreatorHomePage