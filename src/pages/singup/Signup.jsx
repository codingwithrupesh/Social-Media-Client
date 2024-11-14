import { useState } from 'react';
import './Signup.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { axiosClient } from './../../utils/axiosClient';
import { useDispatch } from 'react-redux';
import {setLoading} from '../../redux/slices/appConfigSlice' ; 

function Signup() {
  const [name,setName] = useState('') ;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('') ; 
  const navigate = useNavigate() ; 
  const dispatch  = useDispatch() ; 

  async function handleSubmit (e) {
    try {
      e.preventDefault() ; 
      dispatch(setLoading(true)) ; 
       await axiosClient.post('/api/auth/signup' , {name , email , password}) ; 
      navigate('/login')  ; 
    } catch (error) {
      console.log(error) ; 
    } finally{
      dispatch(setLoading(false)) ; 
    }
   
  }

  return (
    <div className='Signup'>
    <div className='signupBox'>
        <h2 className='heading'>SignUp</h2>
        <form onSubmit={handleSubmit} >
        <label htmlFor='name'>Name</label>
            <input type='text' id='name' required
            placeholder='Enter your name'  onChange={(e) => {setName(e.target.value)}} />

            <label htmlFor='email'>email</label>
            <input type='email' id='email' required
            placeholder='Enter your email id ' onChange={(e) => {setEmail(e.target.value)}} />

            <label htmlFor='password'>password</label>
            <input type='password' id='password' required
            placeholder='Enter your  password'  onChange={(e) => {setPassword(e.target.value)}} />

            <input type='submit' className='submit' onClick={handleSubmit} />
        </form>

        <p className='subHeading'>Already have an account ? <Link to='/login'>Log In</Link> </p>

    </div>

</div>
  )
}

export default Signup