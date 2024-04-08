import { createSlice } from "@reduxjs/toolkit";
import clientInstance from "../../services/client.instance";
import { toast } from "react-toastify";

const initialVendorData = {
    screenLoader: false,
    smallLoader: false,
    vendorDashboard: {},
    vendorProfile: {},
    vendorTimeReport: [],
    addDeveloper:{},
    clientList:[],
    developerList:[]
}

export const vendorDataSlice = createSlice({
    name: "vendorData",
    initialState: initialVendorData,
    reducers: {
        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setSmallLoader: (state, action) => {
            state.smallLoader = true;
        },
        setVendorDashboard: (state, action) => {
            state.vendorDashboard = action.payload
            state.screenLoader = false;
        },
        setVendorSuccess: (state, action) => {
            state.smallLoader=false
            state.screenLoader = false;
        },
        setVendorProfile: (state, action) => {
            state.vendorProfile = action.payload
            state.screenLoader = false;
        },
        setVendorTimeReport: (state, action) => {
            state.vendorTimeReport = action.payload
            state.screenLoader = false
        },
        setFailVendorData: (state, action) => {
            state.screenLoader = false;
            state.smallLoader = false;
        },
        setAddDeveloper: (state, action) =>{
            state.screenLoader = false;
            state.addDeveloper = action.payload
        },
        setClientList: (state, action) =>{
            state.screenLoader = false;
            state.clientList = action.payload.data
        },
        setDeveloperList: (state, action) =>{
            state.screenLoader = false;
            state.developerList = action.payload.data
        }
    }
})
export const { setScreenLoader,setClientList,setVendorSuccess, setSmallLoader,setAddDeveloper,setDeveloperList, setVendorDashboard, setVendorProfile, setVendorTimeReport, setFailVendorData } = vendorDataSlice.actions

export default vendorDataSlice.reducer

export function getVendorDashboard() {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get("vendor/dashboard")
            if (result.status == 200) {
                dispatch(setVendorDashboard(result.data.data))
            }

        } catch (error) {
            console.log(error, "error")
        }
    }
}
export function getVenderProfile() {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get("/vendor/get-profile")
            if (result.status == 200) {
                dispatch(setVendorProfile(result.data))
            }
        } catch (err) {
            console.log(err, "err")
        }
    }
}
export function getVendorTimeReporting() {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get("/vendor/time-reports")
            if (result.status == 200) {
                dispatch(setVendorTimeReport(result?.data?.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())
        }
    }
}
export function getAddNewDeveloper(payload) {
    console.log(payload,"payload")
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.post('/vendor/add-developer', {...payload})
            console.log(result.data,"result--------------")
            if (result?.status == 200) {
                dispatch(setAddDeveloper(result.data))
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function getVendorList(payload) {
    return async (dispatch) => {
        // dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get('vendor/clients')
            if (result?.status == 200) {
                dispatch(setClientList(result.data))
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function getDeveloperList(payload) {
    return async (dispatch) => {
        // dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(`vendor/client/${payload}/developers`)
            if (result?.status == 200) {
                dispatch(setDeveloperList(result.data))
              
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function addFileInvoice(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.post(`vendor/upload-invoice`,{...payload})
            if (result?.status == 200) {
                dispatch(setVendorSuccess())
                toast.success("file is Uploaded", { position: "top-center" })

            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}


