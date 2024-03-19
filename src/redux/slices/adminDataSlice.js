import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import adminInstance from '../../services/admin.instance';
import { generateApiUrl } from '../../helper/utlis';
import clientInstance from '../../services/client.instance';

const initialAdminData = {
    screenLoader: false,
    smallLoader: false,
    listOfClients:[],
    assignedDeveloper:[],
    profileData:{},
    jobListing:[],
    singleJobListing:{}
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
        setSuccessAdminJobListing: (state, action) => {
            state.smallLoader = false;
            state.jobListing=action.payload
        },
        setSingleJobListing: (state, action) => {
            state.smallLoader = false;
            state.singleJobListing=action.payload
        },

        setFailAdminData: (state, action) => {
            state.smallLoader = false;
        },


    }
})

export const { setScreenLoader,setSingleJobListing, setFailAdminData,setSuccessAdminData,setSuccessProfileData,setSuccessAdminJobListing,setSuccessAdminListClient,setSuccessAdminAssignedDeveloper,setBtnLoader } = adminDataSlice.actions

export default adminDataSlice.reducer


export function adminListClients(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`admin/clients`,{...payload})
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
            let result = await clientInstance.get(`admin/developers`,{...payload})
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
            let result = await clientInstance.get('admin/profile')
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
            let result = await clientInstance.post('admin/update-profile/',{...payload})
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

export function adminJobListing(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`admin/job-list`))
            if (result.status === 200) {
                // toast.success("Profile is Updated Successfully", { position: "top-center" })
                dispatch(setSuccessAdminJobListing(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function adminSingleJob(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/job-detail/${payload}`)
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setSingleJobListing(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}