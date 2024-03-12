import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import adminInstance from '../../services/admin.instance';

const initialAdminData = {
    screenLoader: false,
    smallLoader: false,
    listOfClients:[],
    assignedDeveloper:[],
    profileData:{}
}

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState: initialAdminData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setBtnLoader: (state, action) => {
            state.smallLoader = true;
        },


        setSuccessAdminData: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
        },
        setSuccessProfileData: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.profileData=action.payload
        },
        setSuccessAdminListClient: (state, action) => {
            state.smallLoader = false;
            state.listOfClients=action.payload
        },
        setSuccessAdminAssignedDeveloper: (state, action) => {
            state.smallLoader = false;
            state.assignedDeveloper=action.payload
        },

        setFailAdminData: (state, action) => {
            state.smallLoader = false;
        },


    }
})

export const { setScreenLoader, setFailAdminData,setSuccessAdminData,setSuccessProfileData,setSuccessAdminListClient,setSuccessAdminAssignedDeveloper,setBtnLoader } = adminDataSlice.actions

export default adminDataSlice.reducer


export function adminListClients(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await adminInstance.get(`admin/clients`,{...payload})
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAdminListClient(result.data.data.clients))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error?.response?.status===404){
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAdminData())
            }else{
                toast.error(message, { position: "top-center" })
                dispatch(setFailAdminData())
            }
           
        }
    };
}


export function adminListAssignedDeveloper(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await adminInstance.get(`admin/developers`,{...payload})
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAdminAssignedDeveloper(result.data.data.developers))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error?.response?.status===404){
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAdminData())
            }else{
                toast.error(message, { position: "top-center" })
                dispatch(setFailAdminData())
            }
           
        }
    };
}


export function getAdminProfile(payload, callback) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await adminInstance.get('admin/profile')
            if (result.status === 200) {
                console.log(result,"redd")
                dispatch(setSuccessProfileData(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}
export function updateAdminProfile(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await adminInstance.post('admin/update-profile/',{...payload})
            if (result.status === 200) {
                toast.success("Profile is Updated Successfully", { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}