import React from 'react'
import './ReactionsBar.css'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import BookmarkButton from './BookmarkButton'
import ShareButton from './ShareButton'

function ReactionsBar() {
  return (
    <div className='reactionbar'>
        <LikeButton />
        <CommentButton />
        <BookmarkButton />
        <ShareButton />
    </div>
  )
}

export default ReactionsBar