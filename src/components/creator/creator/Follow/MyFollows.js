import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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


const MyFollows = () => {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.authentication.user.status.data); 
  const user = useSelector((state) => state.user.user)
  const following = useSelector((state) => state.follow.following)
  const followers = useSelector((state) => state.follow.followers)

  const userId = parseInt(currentUser.id)

  // const [showFollowers, setShowFollowers] = useState(false);
  // const [showFollowing, setShowFollowing] = useState(false);


//   useEffect(() => {
//     // Dispatch the fetchPosts action when the component mounts
//     dispatch(listFollowers(currentUser.id));
//     dispatch(listFollowees(currentUser.id))
//   }, [dispatch, currentUser.id]);
    // useEffect(() => {
    //     console.log(currentUser)
    //     // Dispatch the fetchPosts action when the component mounts
    //     dispatch(listFollowers(currentUser.id));
    //     dispatch(listFollowees(currentUser.id))
    // }, [dispatch, currentUser.id]);
    useEffect(() => {
    //   console.log(userId)

      // Check if user is available before dispatching actions
      if (userId) {
        dispatch(listFollowers(userId));
        dispatch(listFollowees(userId));
      }
    }, [dispatch, userId]);

  return (
    <div>
      <div className="follow">
        <div className='followChild'>
        {followers ? followers.length : 0}
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
      
      {/* {handleFollow()} */}
    </div>
    
  );
}

export default MyFollows;