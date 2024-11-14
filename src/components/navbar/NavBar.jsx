import './NavBar.scss'
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import {LuLogOut} from 'react-icons/lu'  ;
import { useDispatch, useSelector } from 'react-redux' ; 
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
import {  TOAST_SUCCESS } from '../../App';
import { showToast } from '../../redux/slices/appConfigSlice';

function NavBar() {
  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 
  const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
  
  //console.log(myProfile?.user?._id) ; 
  async function handleLogout() {
    await axiosClient.post('/api/auth/logout') ; 
    removeItem(KEY_ACCESS_TOKEN) ; 
    dispatch(showToast({
      type:TOAST_SUCCESS , 
      message :"succesfully logout , visit again ..."
    })) ;
    navigate('/login') ; 
  }
  return (
    
    <div className='Navbar'>
 
      <div className='container'>
        <h2 className='banner hover-link' 
        onClick={()=>{
          navigate('/')
          }}>Social Media</h2>
        <div className='rightSide'>
          <div className='profile hover-link' onClick={()=>{
          navigate(`/profile/${myProfile?.user?._id}`)  
          }}>
            <Avatar src = {myProfile?.user?.avatar?.url}/>
          </div>
          <div className='logout hover-link' onClick={
            handleLogout
          }>
            <LuLogOut/>
          </div>
        </div>
      </div>

    </div>

  )
}

export default NavBar ; 