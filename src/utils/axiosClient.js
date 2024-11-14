import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localStorageManager";
const base = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL  ; 
import store from '../redux/store'
import {  showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE} from "../App";

export const axiosClient = axios.create({
    baseURL:base ,
    withCredentials: true,
  });


//interceptors 
// request interceptor 
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    // pass access token in authorization header  
    request.headers["Authorization"] = `Bearer ${accessToken}`; 
    return request;
  } // ,
  // (error) => {

  // }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;
    if (data.status === "ok") {
      //everything is fine
      return data;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    if(error === "refresh token is requird from coookies "){
      store.dispatch(showToast({
        type:TOAST_FAILURE , 
        message :error
      })) ; 
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // it means we have to call refresh api
      // here we have to add something
      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${base}/api/auth/refresh`);

      //   console.log(response) ;
      if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
         originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;
        console.log("refresh api called") ; 
       // console.log("original request" , originalRequest) ; 
      //  store.dispatch(showToast({
      //   type:TOAST_SUCCESS , 
      //   message :"please refresh the page"
      // })) ; 
        return axios(originalRequest);
      } else {
        // it means user ko 1 ssall ho gya
        // this will log out the use
        // remove accesss token from llocal storage
        removeItem(KEY_ACCESS_TOKEN);
        console.log("refresh api error : " , error) ;
        window.location.replace("/login", "_self") ;
        return Promise.reject(error);
      }
    }
    store.dispatch(showToast({
      type:TOAST_FAILURE , 
      message :error
    })) ; 
   // console.log("backend error" , data) ;
    return Promise.reject(error);
   } ,
   async (e) => {
    store.dispatch(showToast({
      type:TOAST_FAILURE , 
      message :e
    })) ;
    window.location.replace("/login", "_self");
    return Promise.reject(e); 
   }
);


