import './Feed.scss'
import Post from '../post/Post';
import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFeedData } from '../../redux/slices/feedSlice';

function Feed() {
  const dispatch = useDispatch() ; 
  const feedData = useSelector(state => state.feedReducer.feedData) ; 
  
  useEffect(()=> {
    dispatch(getFeedData()) ; 
   // console.log(feedData) ; 

  } ,[dispatch]) ; 
  return (
    <div className='Feed'>
      <div className='container'>
        <div className='leftPart'>
            
            {feedData?.posts?.map(post => {
             return  <Post key={post?._id} post = {post}/>
            })}
        </div>
        <div className='rightPart'>
          <div className='followings'>
            <h3 className='title'>You are followings</h3>  
        
            {
              feedData?.followings?.map(follow => {
               return  <Follower key={follow?._id} follow={follow}/>
              })
            }
            
          </div>

          <div className='suggestions'>
            <h3 className='title'>Suggestions four you</h3>
            {
              feedData?.suggestions?.map(follow => {
               return  <Follower key={follow?._id} follow={follow}/>
              })
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Feed ; 