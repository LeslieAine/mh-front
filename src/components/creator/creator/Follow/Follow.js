import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Icon } from "@iconify/react";
import './Follow.css'
// import FollowerList from './FollowerList';
// import FollowingList from './FollowingList';
// import FollowersCounter from './FollowersCounter';
// import FollowingCounter from './FollowingCounter';
import { followUser, 
  unfollowUser, 
  listFollowees, 
  listFollowers } from '../../../../redux/follow/followSlice';


const Follow = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.authentication.user.status.data); 
  const user = useSelector((state) => state.user.user) || []
  const following = useSelector((state) => state.follow.following)
  const followers = useSelector((state) => state.follow.followers)

  const userId = parseInt(user.id)

  // const { id } = useParams()

  // const [showFollowers, setShowFollowers] = useState(false);
  // const [showFollowing, setShowFollowing] = useState(false);


  // useEffect(() => {
  //   // Dispatch the fetchPosts action when the component mount
  //   dispatch(listFollowers(user.id));
  //   dispatch(listFollowees(user.id))
  // }, []);
  useEffect(() => {
    // Check if user is available before dispatching actions
    if (user.id) {
      dispatch(listFollowers(userId));
      dispatch(listFollowees(userId));
    }
    // console.log(id)
  }, [dispatch, userId]);

  const handleFollow = () => {
    // const followerCount = followers.length;
    // const followingCount = following.length;
  
    let isCurrentUserFollowed = false;
    if (followers?.length) {
      for (let i = 0; i < followers.length; i++) {
        if (followers[i].id === currentUser.id) {
          isCurrentUserFollowed = true;
          break; // Exit the loop once a match is found
        }
      }
      // console.log('loaded')
    } 
    // else {
    //   // Handle the case when following is undefined, null, or an empty array
    //   console.log('The "following" array is empty.');
    // }
  
    if (!isCurrentUserFollowed) {
      return (
        <div>
          <Icon
            icon="carbon:user-follow"
            width="20"
            height="20"
            className="followButton"
            onClick={() => dispatch(followUser(userId))}
          />
          {/* {likeCount} */}
        </div>
      );
    } else {
      return (
        <div>
            <Icon
              icon="mingcute:user-follow-fill"
              width="20"
              height="20"
              className="unfollowButton"
              color="#ed4956"
              onClick={() => dispatch(unfollowUser(userId))}
            />
            {/* {likeCount} */}
          </div>
        );
      }
    }

  // const followersCount = followers.length;
  // const followingCount = following.length;

  // const toggleFollowers = () => {
  //   setShowFollowers(!showFollowers);
  // };

  // const toggleFollowing = () => {
  //   setShowFollowing(!showFollowing);
  // };

  return (
    <div>
      <div className="follow">
        <div className='followChild'>
          {followers ? followers.length : 0}
          {/* {followers.length} */}
          <div>
            Followers
          </div>
          {/* {showFollowers && <FollowerList followers={followers} />} */}
        </div>
        
        <div className='followChild'>
          {following ? following.length : 0}
          <div>
            Following
          </div>
          {/* {showFollowing && <FollowingList following={following} />} */}
        </div>
      </div>
      
      {handleFollow()}
    </div>
    
  );
}

export default Follow;
