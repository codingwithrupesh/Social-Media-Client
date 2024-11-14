import './UpdateProfile.scss' ; 
import dummyImg from '../../assets/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { setLoading, showToast, updateMyProfile } from '../../redux/slices/appConfigSlice';
import { axiosClient } from '../../utils/axiosClient';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../App';
import { useNavigate } from 'react-router-dom';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';

function UpdateProfile() {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile) ; 
    const [name , setName] = useState("") ; 
    const [bio , setBio] = useState("") ; 
    const [userImg , setImage] = useState('') ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    useEffect(()=> {
           setName(myProfile?.user?.name || '') ;
           setBio(myProfile?.user?.bio || '') ;
           setImage(myProfile?.user?.avatar?.url || '') ;
    } ,[myProfile])
    
    const handleImgChange = (e) => {
        const file = e.target.files[0] ; 
        const fileReader = new FileReader() ; 

        fileReader.readAsDataURL(file) ; 
        fileReader.onload = () => {
            if(fileReader.readyState === fileReader.DONE) {
              //  console.log("image data " , fileReader.result) ; 
                setImage(fileReader.result) ; 
            }
        }
    }
    const handleSubmit = (e)=> {
        e.preventDefault() ; 
        dispatch(updateMyProfile({
            name , 
            bio , 
            userImg
        }
            
        ))
        
    }

    async function handleDelete() {
        try {
            const choice = prompt("type yes to delete , otherwise no ") ; 
            if(choice === "yes") {
                dispatch(setLoading(true));
                    await axiosClient.delete('/api/user') ; 
                    dispatch(showToast({
                    type:TOAST_SUCCESS , 
                    message :"user has been deleted successfully"
                })) ;
                removeItem(KEY_ACCESS_TOKEN) ; 
                navigate('/login')  ;
            }
            else {
                dispatch(showToast({
                    type:TOAST_SUCCESS , 
                    message :"ooppss you saved" 
                })) ;
            }
            

        } catch (error) {
            dispatch(showToast({
                type:TOAST_FAILURE , 
                message :error
              })) ;
        }finally{
            dispatch(setLoading(false));
        }
        
    }
  return (
    <div className='UpdateProfile'>
        <div className='container'>
            <div className='leftPart'>
                {/* <img className='userImg' src={userImg} alt='userImg'/> */}
                <div className="inputUserImg">
                    <label htmlFor="inputImg"  className="labelImg"><img className='userImg' src={userImg? userImg : dummyImg} alt='userImg'/>
                    </label>
                    <input id='inputImg' className='inputImg' type="file" accept='image/*' onChange={handleImgChange}/>
                </div>
            </div>
            <div className='rightPart'> 
                <form onSubmit={handleSubmit}>
                    <input value={name }  type='text' placeholder='Your Name' onChange={(e)=> setName(e.target.value)}/>
                    <input value={bio } type='text' placeholder='Your bio' onChange={(e)=> setBio(e.target.value)}/>
                    <input type='submit'  className='btn-primary submit'  onClick={handleSubmit}/>
                </form>
                <button onClick={handleDelete} className='btn-primary deleteAccount'>Delete Account</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile