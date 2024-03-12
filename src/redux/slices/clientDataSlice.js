import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import clientInstance from '../../services/client.instance';
import { generateApiUrl } from '../../helper/utlis';
import developerInstance from '../../services/developer.instance';
import commanInstance from '../../services/commanInstance';

const initialClientData = {
    screenLoader: false,
    approvedLoader:false,
    smallLoader: false,
    assignedDeveloperList:[],
    clientProfileDetails:{},
    timeReportingData:[],
    folderData:[],
    jobCategoryList:[],
    skillList:[],
    allJobPostedList:[],
    jobPostedData:{},
    earnedBack:{}
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
        setApprovedLoader: (state, action) => {
            state.approvedLoader = true;
        },

        setAssignDeveloperList: (state, action) => {
            state.assignedDeveloperList=action.payload
            state.screenLoader = false;
        },

        setFailClientData: (state, action) => {
            state.smallLoader = false;
            state.approvedLoader = false;
        },

        setActionSuccessFully:(state, action) => {
            state.smallLoader = false;
            state.approvedLoader = false;
        },

        setClientProfileDetails:(state,action)=>{
            state.clientProfileDetails=action.payload;
            state.screenLoader = false;
        },

        setTimeReporting:(state,action)=>{
            state.timeReportingData=action.payload
            state.smallLoader = false;
            

        },
        setFolderData:(state,action)=>{
            state.folderData=action.payload.files;
            state.screenLoader = false;
        },
        setJobCategory:(state,action)=>{
            state.jobCategoryList=action.payload
        },
        setSkillList:(state,action)=>{
            state.skillList=action.payload
        },
        setAllJobPostedList:(state,action)=>{
            state.allJobPostedList=action.payload
            state.screenLoader = false;
        },
        setJobPostedData:(state,action)=>{
            state.jobPostedData=action.payload
            state.screenLoader = false;
        },
        setEarnedBackData:(state,action)=>{
            state.earnedBack=action.payload
            state.screenLoader = false;
        },
        // setCurrentJobStatusChnage:(state,action)=>{
        //     console.log(state.allJobPostedList,"llll")
        //    let d= state.allJobPostedList[action?.tab].filter(item=>item.id!==action.id)
        //    console.log(d,"ppp")
        // }

    }
})

export const { setAllJobPostedList,setScreenLoader,setJobPostedData,setApprovedLoader,setEarnedBackData, setFailClientData,setAssignDeveloperList,setFolderData,setSmallLoader,setJobCategory,setSkillList,setActionSuccessFully,setTimeReporting,setClientProfileDetails } = clientDataSlice.actions

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
        dispatch(setScreenLoader())
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

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`client/time-reports`))
            if (result.status === 200) {
                dispatch(setTimeReporting(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}


export function getFolderData(payload, role, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result
            console.log(role,"rii")
            if(role=="developer"){
                result = await developerInstance.get(generateApiUrl(payload,`developer/documents`))
            }else{
                result = await clientInstance.get(generateApiUrl(payload,`client/documents`))
            }
            if (result.status === 200) {
                console.log(result,"redd")
                // dispatch(setTimeReporting(result.data.data))
                dispatch(setFolderData(result.data.data))
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

export function singleJobPostData(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`client/job-detail/${payload}`)
                // toast.success("Job successfully Posted", { position: "top-center" })  
                dispatch(setJobPostedData(result.data))
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

        dispatch(setScreenLoader())
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
 
export function publishedPost(payload,status,callback) {
    return async (dispatch) => {

        dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.put(`client/jobs/${payload}/unpublish`,{...status})
            if (result.status === 200) {
                dispatch(setActionSuccessFully())
                toast.success("Job status is changed", { position: "top-center" })
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}
 
export function approvedClient(payload,status) {
    return async (dispatch) => {

        dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.post(`client/approve-time-reports/${payload}`)
            if (result.status === 200) {
                dispatch(setActionSuccessFully())
                toast.success("Time reports approved successfully", { position: "top-center" })
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}
 
export function editTimeReportOfDev(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`client/edit-time-report-request`,{...payload})
                dispatch(setActionSuccessFully())
                toast.success("Developer Time reports Updated successfully", { position: "top-center" })
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function filePreassignedUrlGenerate(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await commanInstance.post(`common/upload-file`,payload)
                dispatch(setActionSuccessFully())
                // toast.success("Folder Created successfully", { position: "top-center" })
                return callback(result?.data?.data.Location)
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function callPreSignedUrlResponse(payload,file,callback) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result=await clientInstance.put(payload, file, {
                headers: {
                  'Content-Type': file.type, // Set the content type based on the file type
                },
              })
            console.log(result,"rr")
                dispatch(setActionSuccessFully())
                // toast.success("Folder Created successfully", { position: "top-center" })
                // return callback(result?.data)
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function createNewFolderAndFile(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result;

                result = await commanInstance.post(`common/documents/create-folder-or-file`,{...payload})
                dispatch(setActionSuccessFully())
                toast.success("Folder Created successfully", { position: "top-center" })
                console.log(result,"rrr")
                return callback(result?.data?.data?.parent_id)
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}
export function renameFolderAndFile(payload,id,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await commanInstance.put(`common/documents/${id}/rename-folder`,{...payload})
                dispatch(setActionSuccessFully())
                toast.success("Folder Updated successfully", { position: "top-center" })
                console.log(result,"rrr")
                return callback(result?.data?.data?.parent_id)
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function _deleteFileAndFolder(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.delete(`common/documents/delete-folder-or-file/${payload}`)
                dispatch(setActionSuccessFully())
                toast.success("File is Deleted successfully", { position: "top-center" })
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}



export function changeJobStatus(currentTb,payload,data,callback) {
    return async (dispatch) => {
      

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.put(`client/jobs/${payload}/change-job-status`,{...data})
            dispatch(setActionSuccessFully())
                toast.success("Job status is Updated", { position: "top-center" })
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}

export function earnedBackOfDeveloper(paylaod) {
    return async (dispatch) => {
       dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`client/earned-back`)
            console.log(result,"re")
            dispatch(setEarnedBackData(result.data.data))
                // toast.success("Job status is Updated", { position: "top-center" })
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}