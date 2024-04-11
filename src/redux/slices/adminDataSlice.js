import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
    engagement:{},
    adminApproveReject:[],
    suggestedDeveloper:[],
    adminDashboard:[],
    approvedLoader :false,
    notificationList:[],
    singleJobPagination:{},
    singleClient:{}
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
            state.screenLoader = false;
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
            state.screenLoader = false;
        },
        setSuccessAdminAssignedDeveloper: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.assignedDeveloper=action.payload
        },
        setSuccessAdminJobListing: (state, action) => {
            state.smallLoader = false;
            state.jobListing=action.payload;
            state.screenLoader = false;
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
            state.smallLoader = false;
            state.screenLoader = false;
        },
        setAdminEngagment:(state,action)=>{
            state.engagement=action.payload
            state.screenLoader = false;
        },
        setApproveReject:(state,action)=>{
            state.adminApproveReject=action.payload;
            state.smallLoader = false;
            state.screenLoader = false;
            state.approvedLoader = false;
        },
        setApprovedLoader: (state, action) => {
            state.approvedLoader = true;
        },
        setSuggestedDeveloper:(state,action)=>{
            let recomnd=action.payload?.recommended_developers?.map((item)=>{return {...item,recommed:true}})
            let data=[...recomnd,...action.payload?.other_developers]
            state.suggestedDeveloper=data
        },

        setAdminDashboard:(state,action)=>{
            state.adminDashboard = action.payload
            state.smallLoader = false;
            state.screenLoader = false;
        },

        setNotificationList:(state,action)=>{
            state.notificationList = action.payload.data
            state.smallLoader = false;
            state.screenLoader = false;
        },
        setPagination:(state,action)=>{
            state.singleJobPagination = action.payload
        },
        setSingleClient:(state ,action) =>{
            state.screenLoader =false;
            state.singleClient =action.payload
        }


    }
})

export const {setSuggestedDeveloper,setSingleClient ,setPagination,setNotificationList, setScreenLoader,setApprovedLoader,setAdminDashboard,setApproveReject,setAdminEngagment,setSingleJobListing,setAdminTimeReporting, setSuccessApplicationList, setFailAdminData,setSuccessAdminData,setSuccessProfileData,setSuccessAdminJobListing,setSuccessAdminListClient,setSuccessAdminAssignedDeveloper,setBtnLoader } = adminDataSlice.actions

export default adminDataSlice.reducer


export function adminListClients(page ,payload) {
    console.log(page , "page")
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`admin/clients?page=${page}`,{...payload})
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

export function getAdminDashboard() {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get("admin/dashboard")
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setAdminDashboard(result.data))
            }
        } catch (error) {
           console.log(error)
           dispatch(setFailAdminData())
           
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

export function getSingleClient(id) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`common/client-details/${id}`)
            if (result.status === 200) {
                dispatch(setSingleClient(result?.data?.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            dispatch(setFailAdminData())
        }
    };
}



export function adminJobListing(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`admin/job-list`))
            if (result.status === 200) {
                // toast.success("Profile is Updated Successfully", { position: "top-center" })
                dispatch(setSuccessAdminJobListing(result.data))
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

export function adminTimeReporting(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        let result;
        try {
            if(payload){
                 result = await clientInstance.get((`admin/time-reports?client_id=${payload}`))
            }else{
             result = await clientInstance.get((`admin/time-reports`))
            }
            // if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setAdminTimeReporting(result.data.data))
            // }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function allApplicationsList(payload) {
    console.log(payload , "payload")
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`admin/applications?page=${payload}`)
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

export function adminEngagementList(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`admin/engagements`))
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setAdminEngagment(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}
export function adminApproveReject(payload) {
    console.log(payload,"payload")
    return async (dispatch) => {
        dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.post(`admin/approve-or-reject-account`,{...payload})
            if (result.status === 200) {
            toast.success(result.data?.message, { position: "top-center" })
                dispatch(setApproveReject(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function getDeveloperSuggestList(payload,page) {
    return async (dispatch) => {
        try {
            let result = await clientInstance.get(`admin/developers-to-suggest/${payload}?page=${page}`)
            if (result.status === 200) {

                dispatch(setSuggestedDeveloper(result.data.data))
                dispatch(setPagination(result.data.pagination))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function suggestDeveloper(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`admin/suggest-developer`,{...payload})
            dispatch(setSuccessAdminData())
            if (result.status === 200) {
                toast.success(result.data?.message ?result.data?.message:result?.message,  { position: "top-center" })
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function editTimeReporting(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`admin/edit-time-report`,{...payload})
            if (result.status === 200) {
                toast.success(result.data?.message ?result.data?.message:result?.message,  { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function getNotification(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`common/notifications`)
            if (result.status === 200) {
                dispatch(setNotificationList(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function markAsRead(payload,callback) {
    return async (dispatch) => {
        // dispatch(setScreenLoader())
        try {
            let result 
            if(payload==undefined){
                 result = await clientInstance.put(`common/notifications/mark-as-read`)
            }else {
             result = await clientInstance.put(`common/notifications/mark-as-read?notificationId=${payload}`)

            }
            if (result.status === 200) {
                // toast.success(result.data?.message ?result.data?.message:result?.message,  { position: "top-center" })
                return callback()
                // dispatch(setNotificationList(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}