import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import developerInstance from '../../services/developer.instance';

const initialDeveloperData = {
    screenLoader: false,
    smallLoader: false,
    developerCvData:{},
    developerProfileData:{},
    developerDashboard:{}
}

export const developerDataSlice = createSlice({
    name: 'authData',
    initialState: initialDeveloperData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.smallLoader = true;
        },

        setSuccessDeveloperData: (state, action) => {
            state.developerCvData=action.payload
            state.smallLoader = false;
        },
        setSuccessProfileData: (state, action) => {
            state.developerProfileData=action.payload
        },

        setFailDeveloperData: (state, action) => {
            state.smallLoader = false;
        },
        setActionSuccessFully:(state, action) => {
            state.smallLoader = false;
        },
        setDeveloperDashboard:(state, action) => {
            state.developerDashboard = action.payload;
        },

    }
})

export const { setScreenLoader, setFailDeveloperData,setSuccessDeveloperData,setActionSuccessFully,setSuccessProfileData,setDeveloperDashboard } = developerDataSlice.actions

export default developerDataSlice.reducer

export function fetchDeveloperCv(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await developerInstance.get('developer/cv')
            if (result.status === 200) {
             dispatch(setSuccessDeveloperData(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
                toast.error(message, { position: "top-center" })
                dispatch(setFailDeveloperData())
        }
    };
}

export function updateDeveloperProfile(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await developerInstance.post('developer/update-profile/',{...payload})
            if (result.status === 200) {
              dispatch(setActionSuccessFully())
              toast.success("Profile is Updated", { position: "top-center" })
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}


export function getDeveloperProfileDetails(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await developerInstance.get('developer/get-profile')
            if (result.status === 200) {
                console.log(result,"redd")
                dispatch(setSuccessProfileData(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function getDeveloperDashboard(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await developerInstance.get('developer/dashboard')
            if (result.status === 200) {
                console.log(result,"redd")

                dispatch(setDeveloperDashboard(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}


