import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from "./appConfigSlice";


export const getUserProfile = createAsyncThunk('user/getUserProfile' , async(body , thunkAPI) =>{
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.post('/api/user/getUserProfile' ,body); 
      //  console.log("user profile " , response.result) ; 
        return response.result ; 
    } catch (error) {
      //  console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
       thunkAPI.dispatch(setLoading(false)) ; 
    }
})

export const likeAndUnlike = createAsyncThunk('user/likeAndUnlike' , async(body , thunkAPI) =>{
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.post('/api/post/like' ,body); 
      //  console.log("liked post  " , response.result) ; 
        return response.result.post ; 
    } catch (error) {
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})



const postSlice = createSlice({
    name :'postSlice' , 
    initialState: {
        userProfile:{} 
    } ,  
    extraReducers : (builder) =>{
        builder.addCase(getUserProfile.fulfilled , (state , action) =>{
            state.userProfile = action.payload ;
        })
        .addCase(likeAndUnlike.fulfilled , (state , action) =>{
            const post = action.payload ;
          //  console.log(post) ; 
            const index = state?.userProfile?.posts?.findIndex(item => item._id ===post._id) ; 
            if(index !=undefined && index !=-1) {
                state.userProfile.posts[index] = post ; 
            } 
        })
    }
})

export default postSlice.reducer ; 