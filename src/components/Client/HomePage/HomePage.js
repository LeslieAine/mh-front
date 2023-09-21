import React from 'react'
import Header from './header/Header'
import PostList from './post/PostList'
import samplePosts from './post/SamplePosts'
import Footer from './Footer/Footer'

function HomePage() {
  return (
    <div>
        <Header />
        <PostList posts={samplePosts} />
        <Footer />
    </div>
  )
}

export default HomePage