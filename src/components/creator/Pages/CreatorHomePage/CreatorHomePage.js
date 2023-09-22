import React from 'react'
import Header from './header/Header'
import PostList from './post/PostList'
import samplePosts from './post/SamplePosts'
import Footer from '../../NavBar/Footer/Footer'

function CreatorHomePage() {
  return (
    <div>
        <Header />
        <PostList posts={samplePosts} />
        {/* <Footer /> */}
    </div>
  )
}

export default CreatorHomePage