import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';

const initialAuthData = {
    screenLoader: false,
    smallLoader: false
}

export const authenticationDataSlice = createSlice({
    name: 'authData',
    initialState: initialAuthData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.smallLoader = true;
        },

        setSuccessAuthData: (state, action) => {
            state.smallLoader = false;
        },

        setFailAuthData: (state, action) => {
            state.smallLoader = false;
        },



    }
})

export const { setScreenLoader, setFailAuthData,setSuccessAuthData } = authenticationDataSlice.actions

export default authenticationDataSlice.reducer

export function loginUser(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post('auth/login/', { ...payload })
            if (result?.status === 200) {
                if(payload.role==="client"){
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role","client")
                  
                      window.location.href="/dashboard"
                }

                if(payload.role==="developer"){
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role","developer")
                      window.location.href="/developer-dashboard"
                }

                if(payload.role==="admin"){
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role","admin")
                      window.location.href="/admin-dashboard"
                }

                dispatch(setSuccessAuthData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error?.response?.status===401){
                toast.error(error.response.data.message, { position: "top-center" }) 
                dispatch(setFailAuthData())
            }else{
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }
         
        }
    };
}
 

export function forgotPassword(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post(`auth/forgot-password`,{...payload})
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAuthData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error?.response?.status===404){
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            }else{
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }
           
        }
    };
}

export function resetPassword(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post(`auth/reset-password`,{...payload})
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAuthData())
                if(result?.data?.data?.role==="developer"){
                    window.location.href="/developer-login"
                }else if(result?.data?.data?.role==="client"){
                    window.location.href="/"
                }else{
                    window.location.href="/agency-login"
                }
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error?.response?.status===404){
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            }else{
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }
           
        }
    };
}