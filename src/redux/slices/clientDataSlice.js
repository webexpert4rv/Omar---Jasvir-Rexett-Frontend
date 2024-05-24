import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import clientInstance from "../../services/client.instance";
import { generateApiUrl } from "../../helper/utlis";

const initialClientData = {

  jobId: null,
  screenLoader: false,
  approvedLoader: false,
  smallLoader: false,
  assignedDeveloperList: [],
  invoiceList: [],
  clientProfileDetails: {},
  timeReportingData: [],
  folderData: [],
  jobCategoryList: [],
  skillList: [],
  allJobPostedList: {},
  jobPostedData: {},
  earnedBack: {},
  developerDetails: {},
  timeReportingPage: {},
  faqsData: {},
  clientLeaveHistory:[],
  reconciliationsData:[],
};
 
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
          state.assignedDeveloperList = action.payload
          state.screenLoader = false;
      },

      setFailClientData: (state, action) => {
          state.smallLoader = false;
          state.approvedLoader = false;
          state.screenLoader = false;
      },

      setActionSuccessFully: (state, action) => {
          state.smallLoader = false;
          state.approvedLoader = false;
      },

      setClientProfileDetails: (state, action) => {
          state.clientProfileDetails = action.payload;
          state.screenLoader = false;
      },

      setTimeReporting: (state, action) => {
          let data={
              totalPages:action.payload.totalPages,
              totalRecords:action.payload.totalRecords
          }
          state.timeReportingPage=data
          state.timeReportingData = action.payload.data
          state.smallLoader = false;
          state.screenLoader = false;


      },
      setFolderData: (state, action) => {
          let comibedFile = [...action.payload.files, ...action.payload.shared_files]
          state.folderData = comibedFile;
          state.screenLoader = false;
      },
      setJobCategory: (state, action) => {
          let newData= action.payload.map((item)=>{return { label:item.title , value:item.id}})
          state.jobCategoryList = newData
      },
      setSkillList: (state, action) => {
          state.skillList = action.payload
      },
      setAllJobPostedList: (state, action) => {
          state.allJobPostedList = action.payload
          state.screenLoader = false;
      },
      setJobPostedData: (state, action) => {
          state.jobPostedData = action.payload
          state.screenLoader = false;
      },
      setEarnedBackData: (state, action) => {
          state.earnedBack = action.payload
          state.screenLoader = false;
      },
      // setCurrentJobStatusChnage:(state,action)=>{
      //     console.log(state.allJobPostedList,"llll")
      //    let d= state.allJobPostedList[action?.tab].filter(item=>item.id!==action.id)
      //    console.log(d,"ppp")
      // }
      setDeveloperDetails:(state,action) =>{
          state.developerDetails = action.payload
          state.screenLoader = false;
      },
      setFaqs : (state ,action) =>{
          state.faqsData = action.payload
      },
      setInvoiceList: (state,action) => {
          state.invoiceList = action.payload;
          state.screenLoader = false;
      },
      setLeaveClientHistory : (state,action) => {
        state.clientLeaveHistory =  action.payload
      },
      setReconciliationsData:(state,action)=>{
        console.log(action.payload,"ppppp")
         state.reconciliationsData=action.payload
      }

  }
})


export default clientDataSlice.reducer;

      
export const { setInvoiceList,setAllJobPostedList, setReconciliationsData, setFaqs ,setLeaveClientHistory ,setScreenLoader, setDeveloperDetails ,setJobPostedData, setApprovedLoader, setEarnedBackData, setFailClientData, setAssignDeveloperList, setFolderData, setSmallLoader, setJobCategory, setSkillList, setActionSuccessFully, setTimeReporting, setClientProfileDetails,setJobId} = clientDataSlice.actions


export function developerAssignList(payload) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        `client/assigned-developers?page=${payload}`
      );
      console.log(result.data.data, "result");
      if (result.status === 200) {
        dispatch(setAssignDeveloperList(result?.data?.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function updateClientProfile(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("client/update-profile/", {
        ...payload,
      });
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success("Profile is Updated", { position: "top-center" });
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getClientProfile(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("client/get-profile");
      if (result.status === 200) {
        dispatch(setClientProfileDetails(result.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
// ---------------------------------------------------------Job post Multi step form api's---------------------------------------------------//
export function getJobPostData(id, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`client/get-job-detail/${id}`);
      // toast.success("Job successfully Posted", { position: "top-center" })
      dispatch(setJobPostedData(result.data?.job));
      dispatch(setActionSuccessFully());
      return callback(result.data?.job);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

// ---------------------------------------------------------job post Multi step form api's---------------------------------------------------//

export function timeReporting(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result;
      if (role === "client") {
        result = await clientInstance.get(
          generateApiUrl(payload, `client/time-reports`)
        );
      } else {
        result = await clientInstance.get(
          generateApiUrl(payload, `developer/time-reports`)
        );
      }
      if (result.status === 200) {
        dispatch(setTimeReporting(result.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


export function getClientLeaveHistory(payload, callback) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload,'client/leave-history'))
              dispatch(setLeaveClientHistory(result.data.data))
               
        } catch (error) {
          console.log(error,"error")
            // const message = error.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            // dispatch(setFailClientData())
        }
    };
}
export function getClientLeaveStatus(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.post('/common/leave/status',payload)
            if(payload.rejection_reason=== null){
            toast.success("Leave Approved",{position : "top-center" })
            }else{
              toast.success("Leave Rejected",{position : "top-center" })
            }
        } catch (error) {
            const message = error.response.data.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailClientData())
        }
    };
}
export function getFolderData(payload, role) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `${role}/documents`)
      );
      if (result.status === 200) {
        // dispatch(setTimeReporting(result.data.data))
        dispatch(setFolderData(result.data.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function clientJobPost(payload, activeStep, callback) {
  const activeStepKey = ["", "step1", "step2", "step3"];

  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.post(`client/post-job`, { ...payload });
      if (result?.data?.[activeStepKey[activeStep]]?.id) {
        localStorage.setItem(
          "jobId",
          result?.data?.[activeStepKey[activeStep]]?.id
        );
      }
      // dispatch(setJobId(result?.data?.job?.id));
      if (activeStep === 3) {
        localStorage.removeItem("jobId");
        localStorage.removeItem("activeStep");

        toast.success("Job successfully Posted", { position: "top-center" });
      }
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function clientUpdatePost(
  payload,
  isEdit = false,
  activeStep,
  id,
  callback
) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.put(`client/update-job/${id}`, {
        ...payload,
      });
      // toast.success("Job successfully Updated", { position: "top-center" });
      if (activeStep === 3) {
        localStorage.removeItem("jobId");
        localStorage.removeItem("activeStep");

        if (isEdit) {
          toast.success("Job Updated successfully ", { position: "top-center" });

        } else {
          toast.success("Job Posted successfully ", { position: "top-center" });
        }

      }
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function singleJobPostData(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`client/job-detail/${payload}`);
      // toast.success("Job successfully Posted", { position: "top-center" })
      dispatch(setJobPostedData(result.data));
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getSkillList(callback) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`common/skill-list`);
      if (result.status === 200) {
        dispatch(setSkillList(result.data.data));
        // dispatch(setFolderData(result.data.data.files))
        if (callback) {
          return callback(result?.data?.data);
        }
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getJobCategoryList(payload, callback) {
  return async (dispatch) => {
    try {
      let result = await clientInstance.get(`common/job-category-list`);
      if (result.status === 200) {
        dispatch(setJobCategory(result.data.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getAllJobPostedList(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`client/job-list?page=${payload}`);
      if (result.status === 200) {
        dispatch(setAllJobPostedList(result.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function publishedPost(payload, status, callback) {
  return async (dispatch) => {
    dispatch(setApprovedLoader());
    try {
      let result = await clientInstance.put(
        `client/jobs/${payload}/unpublish`,
        { ...status }
      );
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success("Job status is changed", { position: "top-center" });
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function editTimeReportOfDev(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(
        `client/edit-time-report-request`,
        { ...payload }
      );
      dispatch(setActionSuccessFully());
      toast.success("Developer Time reports Updated successfully", {
        position: "top-center",
      });
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function filePreassignedUrlGenerate(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/upload-file`, payload);
      dispatch(setActionSuccessFully());
      return callback(result?.data?.data.Location);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function callPreSignedUrlResponse(payload, file, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(payload, file, {
        headers: {
          "Content-Type": file.type, // Set the content type based on the file type
        },
      });
      dispatch(setActionSuccessFully());
      // toast.success("Folder Created successfully", { position: "top-center" })
      // return callback(result?.data)
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function createNewFolderAndFile(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result;

      result = await clientInstance.post(
        `common/documents/create-folder-or-file`,
        { ...payload }
      );
      dispatch(setActionSuccessFully());
      toast.success("Folder Created successfully", { position: "top-center" });
      return callback(result?.data?.data?.parent_id);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function renameFolderAndFile(payload, id, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(
        `common/documents/${id}/rename-folder`,
        { ...payload }
      );
      dispatch(setActionSuccessFully());
      toast.success("Folder Updated successfully", { position: "top-center" });
      return callback(result?.data?.data?.parent_id);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function _deleteFileAndFolder(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.delete(
        `common/documents/delete-folder-or-file/${payload}`
      );
      dispatch(setActionSuccessFully());
      toast.success("File is Deleted successfully", { position: "top-center" });
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function changeJobStatus(currentTb, payload, data, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(
        `client/jobs/${payload}/change-job-status`,
        { ...data }
      );
      dispatch(setActionSuccessFully());
      toast.success("Job status is Updated", { position: "top-center" });
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function earnedBackOfDeveloper(paylaod) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`client/earned-back`);
      dispatch(setEarnedBackData(result.data.data));
      // toast.success("Job status is Updated", { position: "top-center" })
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getDeveloperDetails(id) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`/common/developer-details/${id}`);
      dispatch(setDeveloperDetails(result.data.data));
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getEnableDisableAccount(payload) {
  console.log(payload, "payload");
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`/common/enable-disable-user`, {
        ...payload,
      });
    } catch (error) {
      console.log(error);
      // const message = error.message || "Something went wrong";
      // toast.error( "Delete account request already exists for this user", { position: "top-center" })
      // dispatch(setFailClientData())
    }
  };
}
export function getDeleteJob(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.delete(`/client/delete-job/${payload}`);
      toast.success("Job deleted successfully", { position: "top-center" });
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error("Delete account request already exists for this user", {
        position: "top-center",
      });
      dispatch(setFailClientData());
    }
  };
}

export function createNewJobCategory(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.post(`/common/add-job-category`, {
        ...payload,
      });
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

// export function getInvoice() {
//     return async (dispatch) => {
//         dispatch(setScreenLoader())
//         try {
//             let result = await clientInstance.get("/client/invoices")
//         } catch (error) {
//             const message = error.message || "Something went wrong";
//         }
//     }
// }

export function getInvoice(payload) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `client/invoices`)
      );
      if (result.status === 200) {
        dispatch(setInvoiceList(result.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
    }
  };
}

export function getFaq() {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("/web/faqs");
      dispatch(setFaqs(result.data));
    } catch (error) {
      const message = error.message || "Something went wrong";
    }
  };
}

export function getAddNewDeveloper(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("/vendor/add-developer", {
        ...payload,
      });

      dispatch(setActionSuccessFully());
      toast.success("New Developer is Added", { position: "top-center" });
      return callback();
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function updateDeveloperCvDetails(payload, role ,callback ) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(`common/update-cv-profile`, {
        ...payload,
      });
      if (result.status === 200) {
        if(role==="developer"){
        toast.success("Please wait for changes approval by admin", {
          position: "top-center",
        });
      }else{
        toast.success("Profile is Updated", { position: "top-center" });
      }
        dispatch(setActionSuccessFully());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


export function approveTimeReportReconciliation(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("client/approve-time-report-reconciliation", {
        ...payload,
      });

      dispatch(setActionSuccessFully());
      toast.success("New Developer is Added", { position: "top-center" });
      return callback();
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


export function getReconciliationData(payload) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`client/time-report-reconciliations/${payload}`);
      console.log(result,"rop")

      dispatch(setReconciliationsData(result.data.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}



