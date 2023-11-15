import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser} from '../../../../redux/user/userSlice';

function Avatar({src, alt}) {
  // const user = useSelector((state) => state.authentication.user) || JSON.parse(localStorage.getItem('user'));

//   const dispatch = useDispatch();
//   const usersData = useSelector((state) => state.users); // from Redux state structure
// //   console.log(data); 
//   const user = usersData.users.find((user) => user.id === userId);

//   useEffect(() => {
//     // Dispatch the fetchPosts action when the component mounts
//     dispatch(fetchUsers());
//   }, [dispatch]);

// const { userId } = useParams();
// console.log(userId)

// const dispatch = useDispatch();

// useEffect(() => {
//     // Dispatch the fetchUser action when the component mounts
//     dispatch(fetchUser(userId));
// }, [dispatch, userId]);

const user = useSelector((state) => state.user);

// console.log(user)

  return (
    <Link className="nav-link" to={`/creator-profile/${user.id}/about-creator`}>
      <img 
      src={src} alt={alt} 
      className="avatar" />
    </Link>
  );
}

export default Avatar;
