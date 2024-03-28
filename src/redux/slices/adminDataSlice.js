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
    singleJobListing:{},
    allApplications:{},
    adminTimeReportingList:[],
    engagement:[],
    adminApproveReject:[],
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

        setSuccessApplicationList: (state, action) => {
            state.smallLoader = false;
            state.allApplications = action.payload;
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
        setAdminTimeReporting:(state,action)=>{
            state.adminTimeReportingList=action.payload
        },
        setAdminEngagment:(state,action)=>{
            state.engagement=action.payload
        },
        setApproveReject:(state,action)=>{
            state.adminApproveReject=action.payload
        },


    }
})

export const { setScreenLoader,setApproveReject,setAdminEngagment,setSingleJobListing,setAdminTimeReporting, setSuccessApplicationList, setFailAdminData,setSuccessAdminData,setSuccessProfileData,setSuccessAdminJobListing,setSuccessAdminListClient,setSuccessAdminAssignedDeveloper,setBtnLoader } = adminDataSlice.actions

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
            let result = await clientInstance.get(generateApiUrl(payload, "admin/developers"))
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

export function adminTimeReporting(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/time-reports`)
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setAdminTimeReporting(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function allApplicationsList(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/applications`)
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setSuccessApplicationList(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function adminEngagementList(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`admin/engagements`))
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setAdminEngagment(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}
export function adminApproveReject(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`admin/approve-or-reject-account`,{...payload})
            if (result.status === 200) {
            toast.success(result.data?.message, { position: "top-center" })
                dispatch(setApproveReject(result.data.data))
            }
        } catch (error) {
            console.log(error,"error-------------------")
        }
    };
}