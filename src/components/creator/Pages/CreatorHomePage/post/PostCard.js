import React from 'react'
import ReactionsBar from './ReactionsBar/ReactionsBar'
import './PostCard.css'

function PostCard({post}) {
  return (
    <div className='postcard'>
      <div className="user-info">
        <img className='post-card-avatar' src={post.user.avatar} alt={`${post.user.username}'s Avatar`} />
        <span className='post-card-username'>{post.user.username}</span>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <ReactionsBar />
    </div>
  )
}

export default PostCard