import React from 'react'
import { Link } from 'react-router-dom'
import ReactionsBar from './ReactionsBar/ReactionsBar'
import './PostCard.css'

function CreatorPostCard({post}) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
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
    </Link>
  )
}

export default CreatorPostCard