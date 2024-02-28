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
            state.smallLoader = true;
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
                      window.location.href="/dashboard"
                }

                if(payload.role==="developer"){
                    localStorage.setItem("developerToken", result.data.access_token);
                    localStorage.setItem("developerRefreshToken", result.data.refresh_token);
                      window.location.href="/developer-dashboard"
                }

                if(payload.role==="admin"){
                    localStorage.setItem("adminToken", result.data.access_token);
                    localStorage.setItem("adminRefreshToken", result.data.refresh_token);
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
 