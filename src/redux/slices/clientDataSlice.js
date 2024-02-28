import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import clientInstance from '../../services/client.instance';

const initialClientData = {
    screenLoader: false,
    smallLoader: false,
    assignedDeveloperList:[],
    clientProfileDetails:{},
    timeReportingData:[],
    folderData:[],
    jobCategoryList:[],
    skillList:[],
    allJobPostedList:[]
}

export const clientDataSlice = createSlice({
    name: 'clientData',
    initialState: initialClientData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setSmallLoader: (state, action) => {
            state.smallLoader = true;
        },

        setAssignDeveloperList: (state, action) => {
            state.assignedDeveloperList=action.payload
        },

        setFailClientData: (state, action) => {
            state.smallLoader = false;
        },

        setActionSuccessFully:(state, action) => {
            state.smallLoader = false;
        },

        setClientProfileDetails:(state,action)=>{
            state.clientProfileDetails=action.payload
        },

        setTimeReporting:(state,action)=>{
            state.timeReportingData=action.payload
        },
        setFolderData:(state,action)=>{
            state.folderData=action.payload
        },
        setJobCategory:(state,action)=>{
            state.jobCategoryList=action.payload
        },
        setSkillList:(state,action)=>{
            state.skillList=action.payload
        },
        setAllJobPostedList:(state,action)=>{
            state.allJobPostedList=action.payload
        }

    }
})

export const { setAllJobPostedList,setScreenLoader, setFailClientData,setAssignDeveloperList,setFolderData,setSmallLoader,setJobCategory,setSkillList,setActionSuccessFully,setTimeReporting,setClientProfileDetails } = clientDataSlice.actions

export default clientDataSlice.reducer

export function developerAssignList(payload) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`client/assigned-developers?page=${payload}`)
            console.log(result,"re")
            if (result.status === 200) {
                console.log(result)
                dispatch(setAssignDeveloperList(result?.data?.data?.assigned_developers))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function updateClientProfile(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post('client/update-profile/',{...payload})
            if (result.status === 200) {
              dispatch(setActionSuccessFully())
              toast.success("Profile is Updated", { position: "top-center" })
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function getClientProfile(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get('client/get-profile')
            if (result.status === 200) {
                console.log(result,"redd")
                dispatch(setClientProfileDetails(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}


export function timeReporting(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/time-reports?filter=${payload}`)
            if (result.status === 200) {
                console.log(result,"redd")
                dispatch(setTimeReporting(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}


export function getFolderData(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/documents?parent_id=${payload}`)
            if (result.status === 200) {
                console.log(result,"redd")
                // dispatch(setTimeReporting(result.data.data))
                dispatch(setFolderData(result.data.data.files))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function clientJobPost(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`client/post-job`,{...payload})
                toast.success("Job successfully Posted", { position: "top-center" })  
                dispatch(setActionSuccessFully())
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}


export function getSkillList(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/skill-list`)
            if (result.status === 200) {
                console.log(result,"redd")
                dispatch(setSkillList(result.data.data))
                // dispatch(setFolderData(result.data.data.files))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function getJobCategoryList(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/job-category-list`)
            if (result.status === 200) {
                dispatch(setJobCategory(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function getAllJobPostedList(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/job-list`)
            if (result.status === 200) {
                dispatch(setAllJobPostedList(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}
 
