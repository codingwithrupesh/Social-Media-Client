import './Follower.scss'
import Avatar from './../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';


function Follower({follow}) {
  const dispatch = useDispatch() ; 
  const feedData = useSelector(state => state.feedReducer.feedData) ; 
  const [isFollowing , setIsFollowing] = useState() ; 
  const navigate = useNavigate() ; 

  function handleFollowAndUnfollow() {
    dispatch(followAndUnfollowUser({userToFollowId : follow?._id} ));
  }

  useEffect(()=> {
    setIsFollowing(feedData?.followings?.find(item => item._id === follow?._id)) ; 
    },[feedData]) ; 

  return (
    <div className='Follower'>
        <div className='userInfo' onClick={()=> navigate(`/profile/${follow?._id}`)}>
        <Avatar src={follow?.avatar?.url}/>
        <h4 className='name'>{follow?.name}</h4>
        </div>
        <h5  onClick={handleFollowAndUnfollow}
              className={isFollowing? 'follow-link hover-link' :' btn-primary'}>
          {isFollowing?"unfollow" :"follow"}
        </h5>
    </div>
  )
}

export default Follower