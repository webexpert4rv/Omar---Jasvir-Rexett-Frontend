import { createSlice } from "@reduxjs/toolkit";
import clientInstance, { clientFormInstance } from "../../services/client.instance";
import { toast } from "react-toastify";
import { generateApiUrl } from "../../helper/utlis";
import authInstance from "../../services/auth.instance";

const initialVendorData = {
    screenLoader: false,
    smallLoader: false,
    vendorDashboard: {},
    vendorProfile: {},
    vendorTimeReport: [],
    addDeveloper:{},
    clientList:[],
    developerList:[],
    allDevelopersList:{},
    revenueData:{},
    rentedDevelopers:{},
    invoiceData:[],
    singleTimeReports:{}
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
            state.vendorProfile = action.payload.data
            state.screenLoader = false;
            state.smallLoader = false;
        },
        setVendorTimeReport: (state, action) => {
            state.vendorTimeReport = action.payload
            state.screenLoader = false
        },
        setFailVendorData: (state, action) => {
            state.screenLoader = false
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
            state.smallLoader=false;
            state.developerList = action.payload.data
        },
        setDevelopersList:(state, action) =>{
            state.screenLoader = false;
            state.allDevelopersList = action.payload
        },
        setRevenueData:(state, action) =>{
            state.smallLoader=false;
            state.screenLoader = false;
            state.revenueData = action.payload.data
        },
        setRentedDevelopers:(state,action) =>{
            state.screenLoader = false;
            state.rentedDevelopers = action.payload
        },
        setInvoiceData:(state,action) =>{
            state.screenLoader = false;
            state.invoiceData = action.payload
        },
        setSingleVendorTimeReport:(state,action) =>{
            state.screenLoader = false;
            state.singleTimeReports = action.payload
        }
    }
})
export const { setScreenLoader,setClientList,setRentedDevelopers,setSingleVendorTimeReport, setDevelopersList, setInvoiceData,setVendorSuccess,setRevenueData, setSmallLoader,setAddDeveloper,setDeveloperList, setVendorDashboard, setVendorProfile, setVendorTimeReport, setFailVendorData } = vendorDataSlice.actions

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



export function getDevelopersList(payload ,page) {
    return async (dispatch) => {
        if(payload?.skill_title=="Select Skills"){
            delete payload.skill_title
        }
        if(payload?.experience_years=="Select Experience"){
           delete payload?.experience_years
        }

        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `vendor/developers`))
            if (result.status == 200) {
                dispatch(setDevelopersList(result.data))
            }

        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())
        }
    }
}
export function getRentedDevelopers(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,`vendor/rented-developers`))

            if (result.status == 200) {
                dispatch(setRentedDevelopers(result.data))
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

export function getSingleTimeDetails(id) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`/vendor/time-report-details/${id}`)
            if (result.status == 200) {
                dispatch(setSingleVendorTimeReport(result?.data?.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())
        }
    }
}


export function getClientList(payload) {
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

export function getVendorWithClient(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`vendor/time-reports?client_id=${payload}`)
            if (result?.status == 200) {
                dispatch(setVendorSuccess())

            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}


export function updateVendorProfile(payload) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`vendor/update-profile`,{...payload})
            if (result?.status == 200) {
                dispatch(setVendorSuccess())
                toast.success("Profile is updated", { position: "top-center" })
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function getRevenue(payload) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `common/revenue`))
            if (result?.status == 200) {
                dispatch(setRevenueData(result.data))
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function getVendorDetails(payload) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `vendor/vendor-invoices`))
            if (result?.status == 200) {
                dispatch(setInvoiceData(result.data))
            }
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())

        }
    }

}

export function getDeleteDeveloper(id) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.delete(`vendor/delete-developer/${id}`)
            dispatch(setVendorSuccess())
            toast.success("Developer is deleted", { position: "top-center" })
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())
           
        }
    }

}

export function postVendorStepData(URL,payload,callback,activeStep,triggerVerificationModal) {
    return async (dispatch) => {
        // dispatch(setScreenLoader())
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.post(`${URL}`,{...payload})
            if(activeStep === 1){
                const companyId = result?.data?.data?.company?.id;
                const vendorUserId = result?.data?.data?.vendor?.id
                localStorage.setItem("companyId",companyId);
                localStorage.setItem("vendorUserId",vendorUserId);

            }
            callback && callback()
            if (result?.status == 200) {
                dispatch(setVendorSuccess())
            }
        } catch (error) {
            const message = error.message
            if (error.response?.data?.verify_user) {
                triggerVerificationModal("verify");
              } else {
                toast.error(message, { position: "top-center" })
              }
            dispatch(setFailVendorData())

        }
    }

}



export function getVendorStepData(user_id ,callback) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get( `web/get-vendor-data/?user_id=${user_id}`)
            callback(result?.data?.data);
            dispatch(setVendorSuccess())
        } catch (error) {
            const message = error.message
            toast.error(message, { position: "top-center" })
            dispatch(setFailVendorData())
        }
    }
}
export const uploadFileToS3Bucket = (payload,callback) => {
    console.log(payload,"payload")
    return async (dispatch) => {
    //   dispatch(setScreenLoader());
      try {
        let result = await clientFormInstance.post(`web/upload-file`,payload);
        console.log(result?.data?.data?.Location,"location")
        callback && callback(result?.data?.data?.Location);
        dispatch(setVendorSuccess())
      } catch (error) {
        toast.error(error?.response?.data?.message, { position: "top-center" });
        dispatch(setFailVendorData());
      }
    };
  };
  export function applyAsVendor(payload,callback) {
    console.log(payload,'payload')
    return async (dispatch) => {
    //   dispatch(setScreenLoader());
      try {
        let result = await clientInstance.post(`/common/vendor-registration`,{...payload});
        callback()
      } catch (error) {
        const message = error?.message;
        // if (error?.message === VERIFY_USER_MESSAGE) {
          if (error.response?.data?.verify_user) {
          // triggerVerificationModal("verify"); 
        } else {
          toast.error(error?.response?.data?.message, { position: "top-center" });
        }
        dispatch(setFailVendorData());
      }
    };
  }
  export function getEditDecision(payload,callback) {
    console.log(payload,'payload')
    return async (dispatch) => {
    //   dispatch(setScreenLoader());
      try {
        let result = await clientInstance.post(`/common/vendor-decision-makers-details`,{...payload});
        localStorage.setItem("vendorId",result?.data?.data?.id);
        callback()
      } catch (error) {
        const message = error?.message;
        // if (error?.message === VERIFY_USER_MESSAGE) {
          if (error.response?.data?.verify_user) {
          // triggerVerificationModal("verify"); 
        } else {
          toast.error(error?.response?.data?.message, { position: "top-center" });
        }
        dispatch(setFailVendorData());
      }
    };
  }
  export function getAreaExpertise(payload,callback) {
    console.log(payload,'payload')
    return async (dispatch) => {
    //   dispatch(setScreenLoader());
      try {
        let result = await clientInstance.post(`/common/vendor-area-expertise`,{...payload});
        localStorage.setItem("vendorId",result?.data?.data?.id);
        callback()
      } catch (error) {
        const message = error?.message;
        // if (error?.message === VERIFY_USER_MESSAGE) {
          if (error.response?.data?.verify_user) {
          // triggerVerificationModal("verify"); 
        } else {
          toast.error(error?.response?.data?.message, { position: "top-center" });
        }
        dispatch(setFailVendorData());
      }
    };
  }
  export function getVendorUpdatedDetails(id,callback) {
    console.log(id,'id')
    return async (dispatch) => {
    //   dispatch(setScreenLoader());
      try {
        let result = await clientInstance.get(`/common/vendor-registration-details/${id}`);
        callback(result?.data?.data)
        localStorage.setItem("vendorId",result?.data?.data?.id);
      } catch (error) {
        const message = error?.message;
        // if (error?.message === VERIFY_USER_MESSAGE) {
          if (error.response?.data?.verify_user) {
          // triggerVerificationModal("verify"); 
        } else {
          toast.error(error?.response?.data?.message, { position: "top-center" });
        }
        dispatch(setFailVendorData());
      }
    };
  }
  