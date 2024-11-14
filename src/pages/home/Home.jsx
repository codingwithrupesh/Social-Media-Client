import './Home.scss';
import NavBar from '../../components/navbar/NavBar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slices/appConfigSlice';
import { useEffect } from 'react';

function Home() {
  const dispatch = useDispatch() ; 
 
  useEffect( ()=> {
      dispatch(getMyInfo()) ; 
  } , []) ; 
  return (
    <>
      <NavBar/>
      <Outlet/>
      
    </>
  )
}
  
export default Home ;