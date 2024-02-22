import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import developerInstance from '../../services/developer.instance';

const initialDeveloperData = {
    screenLoader: false,
    smallLoader: false,
    developerCvData:{}
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
        },

        setFailDeveloperData: (state, action) => {
            state.smallLoader = false;
        },



    }
})

export const { setScreenLoader, setFailDeveloperData,setSuccessDeveloperData } = developerDataSlice.actions

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
 