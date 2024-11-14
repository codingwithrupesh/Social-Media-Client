import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from '../../utils/axiosClient';
import { TOAST_FAILURE } from "../../App";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";


export const getMyInfo = createAsyncThunk('user/getMyInfo' , async(body , thunkAPI) =>{
    try {
        thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.get('/api/user/getMyInfo') ; 
     //  console.log("api called data " , response.result) ; 

       return response.result ; 
        
    } catch (error) {
        thunkAPI.dispatch(showToast({
            type:TOAST_FAILURE , 
            message :error.data.message
          })) ; 
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        console.log("error is :" , error) ; 
        return Promise.reject(error)  ;
    }finally{
        
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})

export const updateMyProfile = createAsyncThunk ("/user/updateMyProfile" , async(body , thunkAPI)=> {
    try {
       thunkAPI.dispatch(setLoading(true)) ; 
       // console.log("fine") ; 
        const  response  = await axiosClient.put('/api/user/' , body) ; 
     //  console.log("api called data " , response.result) ; 
       
       return response.result ; 
        
    } catch (error) {
        console.log("error is :" , error) ; 
        thunkAPI.dispatch(showToast({
            type:TOAST_FAILURE , 
            message :error.data.message
          })) ; 
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error)  ;
    }finally{
        
        thunkAPI.dispatch(setLoading(false)) ; 
    }
})

const appConfigSlice = createSlice({
    name :'appConfigSlice' , 
    initialState: {
        isLoading:false  , 
        toastData:{} , 
        myProfile:null 
    } , 
    reducers : {
        setLoading : (state , action) => {
            state.isLoading = action.payload ; 
        } ,
        showToast : (state , action) => {
            state.toastData = action.payload ; 
        }
    } , 
    extraReducers : (builder) =>{
        builder.addCase(getMyInfo.fulfilled , (state , action) =>{
            state.myProfile = action.payload ; 
        }).addCase(updateMyProfile.fulfilled , (state , action) =>{
            state.myProfile = action.payload ; 
        })
    }
})

export default appConfigSlice.reducer ; 
export const {setLoading ,showToast} = appConfigSlice.actions ;