import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import clientInstance from '../../services/client.instance';
import { adobeInstance } from '../../services/adobe.instance';

const initialAuthData = {
    screenLoader: false,
    smallLoader: false,
    otpLoader:false,
    countries:[]
   
}

export const adobeDataSlice = createSlice({
    name: 'adobeData',
    initialState: initialAuthData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.smallLoader = true;
        },
        setOtpLoader: (state, action) => {
            state.otpLoader = true;
        },

        setAllCountries: (state, action) => {
            state.smallLoader = false;
            state.countries = action.payload;
        },

        setSuccessAuthData: (state, action) => {
            state.smallLoader = false;
            state.otpLoader = false;
        },

        setFailAuthData: (state, action) => {
            state.smallLoader = false;
            state.otpLoader = false;
        },
      
    }
})

export const { setScreenLoader,setLoginUserName , setAllCountries, setOtpLoader, setFailAuthData, setSuccessAuthData } = adobeDataSlice.actions

export default adobeDataSlice.reducer

export function getAdobeTemplate(payload) {
    return async (dispatch) => {
      dispatch(setScreenLoader());
      try {
        let result = await adobeInstance.get("api/templates/template-details");
      } catch (error) {
        const message = error.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        dispatch(setFailAuthData());
      }
    };
  }