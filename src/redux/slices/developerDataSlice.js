import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import developerInstance from '../../services/developer.instance';
import { generateApiUrl } from '../../helper/utlis';
import clientInstance from '../../services/client.instance';

const initialDeveloperData = {
    btnLoader:false,
    screenLoader: false,
    smallLoader: false,
    developerCvData:{},
    developerProfileData:{},
    developerDashboard:{},
    degreeList:[],
    developerTimeReports:[],
    addTimeReports:[],
    allContracts:[]
}

export const developerDataSlice = createSlice({
    name: 'authData',
    initialState: initialDeveloperData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setBtnLoader: (state, action) => {
            state.btnLoader = true;
        },
        setSmallLoader: (state, action) => {
            state.smallLoader = true;
        },

        setSuccessDeveloperData: (state, action) => {
            state.developerCvData=action.payload
            state.smallLoader = false;
        },
        setAddTimeReports: (state, action) => {
            state.addTimeReports=action.payload
            state.smallLoader = false;
        },
        setSuccessProfileData: (state, action) => {
            state.developerProfileData=action.payload
        },

        setSuccessActionData: (state, action) => {
            state.smallLoader = false;
            state.btnLoader=false
        },
        setDeveloperTimeReports: (state, action) => {
            state.smallLoader = false;
            state.developerTimeReports=action.payload
        },
        setAllContracts: (state, action) => {
            state.smallLoader = false;
            state.allContracts=action.payload
        },
    
        setFailDeveloperData: (state, action) => {
            state.smallLoader = false;
            state.btnLoader = false
        },
        setActionSuccessFully:(state, action) => {
            state.smallLoader = false;
        },
        setDeveloperDashboard:(state, action) => {
            state.developerDashboard = action.payload;
        },
        setDegreeList:(state, action) => {
            let data=action?.payload?.map((item)=>{return{label:item.title,value:item.id}});
            state.degreeList = data;
            state.smallLoader = false;
        },

    }
})

export const { setSmallLoader,setScreenLoader,setAllContracts,setDeveloperTimeReports,setAddTimeReports,setSuccessActionData,setBtnLoader, setDegreeList,setFailDeveloperData,setSuccessDeveloperData,setActionSuccessFully,setSuccessProfileData,setDeveloperDashboard } = developerDataSlice.actions

export default developerDataSlice.reducer

export function fetchDeveloperCv(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get('developer/cv')
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

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post('developer/update-profile/',{...payload})
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
            let result = await clientInstance.get('developer/get-profile')
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
            let result = await clientInstance.get('developer/dashboard')
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

export function updateDeveloperCvBio(payload, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post('developer/update-bio',{...payload})
            if (result.status === 200) {
                console.log(result,"redd")
                toast.success("Bio is Updated", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function updateDeveloperCvExperience(payload,id, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.put(`developer/update-experience/${id}`,{...payload})
            if (result.status === 200) {
                console.log(result,"redd")
                // toast.success("Experience is Updated", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function addDeveloperCvExperience(payload, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post('developer/add-experience',[...payload])
                toast.success("Experience is Added", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function deleteExperience(payload, callback) {
    return async (dispatch) => {
        //  dispatch(setSmallLoader())
        try {
            let result = await clientInstance.delete(`developer/delete-experience/${payload}`)
            if (result.status === 200) {
                console.log(result,"redd")
                toast.success("Experience is deleted", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}


export function addDeveloperCvEducation(payload, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post('developer/add-education',[...payload])
        
                toast.success("Education is Added", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function updateDeveloperCvEducation(payload,id, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.put(`developer/update-education/${id}`,{...payload})
            if (result.status === 200) {
                // toast.success("Education is Updated", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function getDegreeList(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`developer/degree-list`)
                dispatch(setDegreeList(result.data.data))
                // return callback()
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function deleteEducationCv(payload, callback) {
    return async (dispatch) => {
        //  dispatch(setSmallLoader())
        try {
            let result = await clientInstance.delete(`developer/delete-education/${payload}`)
            if (result.status === 200) {
                toast.success("Education is Deleted", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function updateDeveloperSkills(payload, callback) {
    return async (dispatch) => {
         dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`developer/update-developer-skills`,{skills:payload})
            if (result.status === 200) {
                console.log(result,"redd")
                toast.success("Skills updated successfully", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}



export function addDeveloperSocialMedia(payload, callback) {
    return async (dispatch) => {
         dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`developer/add-social-links`,[...payload])
            if (result.status === 200) {
                console.log(result,"redd")
                toast.success("Media is updated successfully", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function updateDeveloperCvDetails(payload, callback) {
    return async (dispatch) => {
         dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`developer/update-cv-profile`,{...payload})
            if (result.status === 200) {
                console.log(result,"redd")
                toast.success("Media is updated successfully", { position: "top-center" })
                dispatch(setSuccessActionData())
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function developertimeReporting(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`developer/time-reports`))
            if (result.status === 200) {
                dispatch(setDeveloperTimeReports(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function getPreviousTimeReports(payload, callback) {
    return async (dispatch) => {

        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`developer/get-previous-report`))
            if (result.status === 200) {
                dispatch(setAddTimeReports(result.data.data.timeReports))
                return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}


export function getAllContracts(payload, callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`developer/contracts`)
            if (result.status === 200) {
               dispatch(setAllContracts(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}

export function saveTimeReports(payload,callback) {
    return async (dispatch) => {

        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`developer/add-time-reports`,{...payload})
            if (result.status === 200) {
            //    dispatch(setAllContracts(result.data.data))
            dispatch(setSuccessActionData())
            toast.success("Developer time is Added", { position: "top-center" })
            return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailDeveloperData())
        }
    };
}