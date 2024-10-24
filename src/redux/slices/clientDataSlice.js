import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import clientInstance, { clientFormInstance } from "../../services/client.instance";
import { generateApiUrl } from "../../helper/utlis";
import axios from "axios";
import authInstance from "../../services/auth.instance";
import { VERIFY_USER_MESSAGE } from "../../pages/websiteRegisterForm/client/constant";
import { setSuccessActionData } from "./developerDataSlice";

const initialClientData = {
  jobId: null,
  screenLoader: false,
  approvedLoader: false,
  smallLoader: false,
  assignedDeveloperList: [],
  invoiceList: [],
  totalInvoicePages: null,
  clientProfileDetails: {},
  timeReportingData: [],
  folderData: [],
  companyDetails: {},
  jobCategoryList: [],
  skillList: [],
  allJobPostedList: {},
  jobPostedData: {},
  earnedBack: {},
  developerDetails: {},
  timeReportingPage: {},
  faqsData: {},
  clientLeaveHistory: [],
  reconciliationsData: [],
  clientHolidayList: [],
  addHoliday: {},
  approveDisapprove: {},
  timeZones: [],
  countriesList: [],
  statesList: [],
  citiesList: [],
  timeZone: {},
  webClientData: {},
  clientLook: {},
  OtpLoader: false,
  jobList: [],
  clientProfileData: {},
  timeZoneList: [],
  degreeList: [],
  interviewDetails: {},
  feedbackDetails: {},
  feedbackApproval: {},
  singleJobPost:{},
  customSkills:{},
  approveFeedbackLoader: false,
};

export const clientDataSlice = createSlice({
  name: 'clientData',
  initialState: initialClientData,
  reducers: {
    setScreenLoader: (state) => {
      state.screenLoader = true;
    },
    setSmallLoader: (state) => {
      state.smallLoader = true;
    },
    setFeedbackApproval: (state, action) => {
      state.feedbackApproval = action.payload;
      state.smallLoader = false;
      state.screenLoader = false;
    },
    setApprovedLoader: (state) => {
      state.approvedLoader = true;
    },
    closeApprovedLoader: (state) => {
      state.approvedLoader = false;
    },
    setAssignDeveloperList: (state, action) => {
      state.assignedDeveloperList = action.payload;
      state.screenLoader = false;
    },
    setClientLook: (state, action) => {
      state.clientLook = action.payload;
      state.screenLoader = false;
    },
    setWebClientData: (state, action) => {
      state.webClientData = action.payload;
      state.screenLoader = false;
    },
    setFailClientData: (state) => {
      state.smallLoader = false;
      state.approvedLoader = false;
      state.screenLoader = false;
      state.OtpLoader = false;
    },
    setActionSuccessFully: (state) => {
      state.smallLoader = false;
      state.approvedLoader = false;
      state.screenLoader = false;
      state.OtpLoader = false;
    },
    setClientProfileDetails: (state, action) => {
      state.clientProfileDetails = action.payload;
      state.screenLoader = false;
    },
    setTimeReporting: (state, action) => {
      const data = {
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.totalRecords
      };
      state.timeReportingPage = data;
      state.timeReportingData = action.payload.data;
      state.smallLoader = false;
      state.screenLoader = false;
    },
    setFolderData: (state, action) => {
      const combinedFile = [...action.payload.files, ...action.payload.shared_files];
      state.folderData = combinedFile;
      state.screenLoader = false;
    },
    setJobCategory: (state, action) => {
      const newData = action.payload.map(item => ({ label: item.title, value: item.id }));
      state.jobCategoryList = newData;
    },
    setSkillList: (state, action) => {
      state.skillList = action.payload;
    },
    setAllJobPostedList: (state, action) => {
      state.allJobPostedList = action.payload;
      state.screenLoader = false;
    },
    setJobPostedData: (state, action) => {
      state.jobPostedData = action.payload;
      state.screenLoader = false;
    },
    setEarnedBackData: (state, action) => {
      state.earnedBack = action.payload;
      state.screenLoader = false;
    },
    setDeveloperDetails: (state, action) => {
      state.developerDetails = action.payload;
      state.screenLoader = false;
    },
    setFaqs: (state, action) => {
      state.faqsData = action.payload;
      state.screenLoader = false;
    },
    setInvoiceList: (state, action) => {
      state.invoiceList = action.payload.data;
      state.screenLoader = false;
      state.totalInvoicePages = action.payload.pagination.totalPages;
    },
    setLeaveClientHistory: (state, action) => {
      state.clientLeaveHistory = action.payload;
      state.screenLoader = false;
    },
    setReconciliationsData: (state, action) => {
      state.reconciliationsData = action.payload;
    },
    setClientHolidayList: (state, action) => {
      state.clientHolidayList = action.payload;
      state.screenLoader = false;
    },
    setAddHoliday: (state, action) => {
      state.addHoliday = action.payload;
      state.smallLoader = false;
    },
    setApproveDisapprove: (state, action) => {
      state.approveDisapprove = action.payload;
    },
    setSuggstedDeveloper: (state) => {
      state.smallLoader = false;
    },
    setTimeZones: (state, action) => {
      state.timeZones = action.payload;
      state.screenLoader = false;
    },
    setListTimeZone: (state, action) => {
      state.timeZoneList = action.payload;
      state.screenLoader = false;
    },
    setCountriesList: (state, action) => {
      state.countriesList = action.payload;
      state.screenLoader = false;
    },
    setStatesList: (state, action) => {
      state.statesList = action.payload;
      state.screenLoader = false;
    },
    setCitiesList: (state, action) => {
      state.citiesList = action.payload;
      state.screenLoader = false;
    },
    setOTPloader: (state) => {
      state.OtpLoader = true;
    },
    setJobList: (state, action) => {
      state.screenLoader = false;
      state.jobList = action.payload;
    },
    setClientProfileData: (state, action) => {
      state.clientProfileData = action.payload;
      state.screenLoader = false;
    },
    setDegreeList: (state, action) => {
      const data = action.payload.map(item => ({ label: item.title, value: item.id }));
      state.degreeList = data;
    },
    setInterviewDetails: (state, action) => {
      state.interviewDetails = action.payload;
      state.screenLoader = false;
    },
    clearInterviewDetails: (state) => {
      state.interviewDetails = null;
    },
    setFailInterviewDetails: (state) => {
      state.interviewDetails = null;
      state.screenLoader = false;
    },
    setFeedbackDetails: (state, action) => {
      state.feedbackDetails = action.payload;
      state.screenLoader = false;
    },
    clearFeedbackDetails: (state) => {
      state.feedbackDetails = null;
    },
    setFailFeedbackDetails: (state) => {
      state.feedbackDetails = null;
      state.screenLoader = false;
    },
    setApproveFeedbackLoader: (state, action) => { 
      state.approveFeedbackLoader = action.payload;
      state.smallLoader = false;
    },
    setApproveFeedback: (state) => { 
      state.smallLoader = false;
      state.approveFeedbackLoader = false;
    },
    setSingleJobPostData: (state,action)=>{
      state.singleJobPost = action.payload;
      state. smallLoader = false
    },
    setCustomSkills:(state,action) => {
      state.customSkills = action.payload;
      state. smallLoader = false
    }
  }
});

export default clientDataSlice.reducer;

export const { 
  setOTPloader, 
  setJobList, 
  setListTimeZone,
  setDegreeList, 
  setStatesList, 
  setCountriesList, 
  setCitiesList, 
  setClientLook, 
  setWebClientData, 
  setTimeZones, 
  setInvoiceList, 
  setAllJobPostedList, 
  setClientHolidayList, 
  closeApprovedLoader, 
  setSuggstedDeveloper, 
  setAddHoliday, 
  setApproveDisapprove, 
  setReconciliationsData, 
  setFaqs, 
  setLeaveClientHistory, 
  setScreenLoader, 
  setDeveloperDetails, 
  setJobPostedData, 
  setApprovedLoader, 
  setEarnedBackData, 
  setFailClientData, 
  setAssignDeveloperList, 
  setFolderData, 
  setSmallLoader, 
  setJobCategory, 
  setSkillList, 
  setActionSuccessFully, 
  setTimeReporting, 
  setClientProfileDetails, 
  setClientProfileData, 
  setInterviewDetails,
  clearInterviewDetails,
  setFailInterviewDetails,
  setFeedbackDetails, 
  clearFeedbackDetails, 
  setFailFeedbackDetails, 
  setFeedbackApproval,
  setApproveFeedbackLoader,
  setApproveFeedback,
  setSingleJobPostData,
  setCustomSkills
} = clientDataSlice.actions;


export function developerAssignList(payload) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `client/assigned-developers`)
      );

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
      let result = await clientInstance.put("client/update-profile/", {
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
export function getCompanyDetails(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("client/get-profile");
      // dispatch(setCompanyDetails(result.data));
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
      let result = await clientInstance.get(`common/get-job-detail/${id}`);
      // toast.success("Job successfully Posted", { position: "top-center" })
      dispatch(setJobPostedData(result.data?.data));
      dispatch(setActionSuccessFully());
      return callback(result.data?.data);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


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
      let result = await clientInstance.get(generateApiUrl(payload, 'client/leave-history'))
      dispatch(setLeaveClientHistory(result.data.data))

    } catch (error) {
      console.log(error, "error")
      // const message = error?.response?.data?.message || "Something went wrong";
      // toast.error(message, { position: "top-center" })
      dispatch(setFailClientData())
    }
  };
}

export function getClientHolidayList() {
  return async (dispatch) => {
    dispatch(setScreenLoader())
    try {
      let result = await clientInstance.get('client/public-holidays')
      dispatch(setClientHolidayList(result.data.data))

    } catch (error) {
      console.log(error, "error")
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" })
      dispatch(setFailClientData())
    }
  };
}

export function getAddHoliday(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader())
    try {
      let result = await clientInstance.post('client/add-public-holiday', { ...payload })
      dispatch(setAddHoliday(result.data.data))

    } catch (error) {
      console.log(error, "error")
      // const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" })
      // dispatch(setFailClientData())
    }
  };
}

export function getApproveDisapprove(payload, id) {
  return async (dispatch) => {
    dispatch(setApprovedLoader())
    try {
      let result = await clientInstance.post(generateApiUrl(payload, `client/approve-or-disapprove-holiday/${id}`))
      // dispatch(setApproveDisapprove(result.data.data))     
      dispatch(closeApprovedLoader());
    } catch (error) {
      console.log(error, "error")
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" })
      dispatch(setFailClientData())
    }
  };
}
export function updateClientPost (user_id,job_id,payload,callback){
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.put(`/common/update-job/${job_id}?user_id=${user_id}`, payload);
      console.log(result?.data?.data?.Location,"Location")
      callback && callback(result?.data?.data?.Location);
      dispatch(setActionSuccessFully())
    } catch (error) {
      console.log(error, "error")
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getClientLeaveStatus(payload) {
  return async (dispatch) => {
    dispatch(setApprovedLoader())
    try {
      let result = await clientInstance.post('/common/leave/status', payload)
      if (payload.rejection_reason === null) {
        toast.success("Leave Approved", { position: "top-center" })
      } else {
        toast.success("Leave Rejected", { position: "top-center" })
      }
      dispatch(closeApprovedLoader());

    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" })
      dispatch(setFailClientData())
    }
  };
}
export function getDegreeList(payload, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader())
    try {
      let result = await authInstance.get(`common/degree-list`);
      console.log(result.data.data,"degreelisttttt")
      dispatch(setDegreeList(result.data.data));
      // return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailDeveloperData());
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
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function clientJobPost(payload, activeStep, id,callback) {

  const activeStepKey = ["", "step1", "step2", "step3"];
  return async (dispatch) => {
    // dispatch(setScreenLoader());
     dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/post-job?user_id=${id}`, { ...payload });
      if (result?.data?.step1?.id) {
        localStorage.setItem("jobId", result?.data?.step1?.id);
      }
      // dispatch(setJobId(result?.data?.job?.id));
      if (activeStep === 5) {
        localStorage.removeItem("jobId")
        localStorage.removeItem("activeStep");

        toast.success("Job successfully Posted", { position: "top-center" });
      }
      callback && callback(result?.data?.data?.Location);
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailClientData());
    }
  };
}
export function clientUpdatePost(
  payload,
  isEdit = false,
  activeStep,
  id,
  user_id,
  callback
) {
  console.log(id,"id")
  console.log(user_id,"userId")
  console.log(payload, "payload")
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.put(`common/update-job/${id}?user_id=${user_id}`, {
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

export function singleJobPostData(payload,callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`common/job-detail/${payload}`);
      console.log(result.data,"ressulteddddd")
      // toast.success("Job successfully Posted", { position: "top-center" })
      dispatch(setSingleJobPostData(result.data));
      dispatch(setActionSuccessFully());
      return callback();
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getShortListInterview(payload) {

  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`common/interview/${payload}`);
      // toast.success("Job successfully Posted", { position: "top-center" })
      // dispatch(setJobPostedData(result.data));
      dispatch(setActionSuccessFully());
      // return callback();
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getInterviewDetails(interviewId) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`common/interview/${interviewId}`);
      dispatch(setInterviewDetails(result.data));
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailInterviewDetails());
    }
  };
}

export function meetingCancel(id,payload) {

  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.put(`common/interview/${id}`,{...payload});
      // toast.success("Job successfully Posted", { position: "top-center" })
      // dispatch(setJobPostedData(result.data));
      dispatch(setActionSuccessFully());
      // return callback();
    } catch (error) {
      const message = error?.message || "Something went wrong";
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

export function postCandidateInterview(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/interview`,{...payload});
       toast.success("Interview is scheduled",{ position: "top-center" })
       dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
    return callback();
  };
}

export function getSuggestedDeveloper(payload, callback) {
  return async (dispatch) => {
    dispatch(setApprovedLoader())
    if (payload) {
      try {
        let result = await clientInstance.post(`client/request-developer-suggestion`, { ...payload });
        if (result.status === 200) {
          toast.success(result?.data?.message, { position: "top-center" });
          dispatch(closeApprovedLoader())
        }
      } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        // dispatch(setFailClientData());
      }
    };
  }
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
        `common/jobs/${payload}/unpublish`,
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

export function filePreassignedUrlGenerate(fileData, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/upload-file`, fileData);
      // dispatch(setActionSuccessFully());
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
    // dispatch(setSmallLoader());
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
      let result = await clientInstance.post(
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
      const message = error?.message || "Something went wrong";
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
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function changeJobStatus(currentTb, data, callback) {
  console.log(data,"data")
  return async (dispatch) => {
    if (data) {
      dispatch(setSmallLoader());
      try {
        let result = await clientInstance.put(
          `common/job-application/status`,
          { ...data }
        );
        dispatch(setActionSuccessFully());
        toast.success("Job status is Updated", { position: "top-center" });
        return callback();
      } catch (error) {
        const message = error?.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        dispatch(setFailClientData());
      }
    };
  }
}

export function earnedBackOfDeveloper(paylaod) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`client/earned-back`);
      dispatch(setEarnedBackData(result.data.data));
      // toast.success("Job status is Updated", { position: "top-center" })
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getDeveloperDetails(id) {
  console.log(id, "id")
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`/common/developer-details/${id}`);
      dispatch(setDeveloperDetails(result.data.data));
    } catch (error) {
      const message = error?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getEnableDisableAccount(payload, callback) {
  return async (dispatch) => {
    dispatch(setApprovedLoader());
    try {
      let result = await clientInstance.post(`/common/enable-disable-user`, {
        ...payload,
      });
      toast.success(result.data.message)
      dispatch(closeApprovedLoader());
      callback();
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
      const message = error?.message || "Something went wrong";
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
      const message = error?.message || "Something went wrong";
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

export function getInvoice(query) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`client/client-invoices?${query}`);
      if (result.status === 200) {
        dispatch(setInvoiceList(result.data));
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      dispatch(setFailClientData());
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

export function updateDeveloperCvDetails(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(`common/update-cv-profile`, {
        ...payload,
      });
      if (result.status === 200) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {

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
      toast.success("Time sheet Developer is updated", { position: "top-center" });
      return callback();
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function rejectTimeReportReconciliation(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("client/reject-time-report-reconciliation", {
        ...payload,
      });

      dispatch(setActionSuccessFully());
      toast.success("Time sheet Developer is Rejected", { position: "top-center" });
      return callback();
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


export function getReconciliationData(payload) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`client/time-report-reconciliations/${payload}`);
      console.log(result, "rop")

      dispatch(setReconciliationsData(result.data.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function updateClientHoliday(payload, id) {
  return async (dispatch) => {
    dispatch(setSmallLoader())
    try {
      let result = await clientInstance.put(`/client/update-public-holiday/${id}`, { ...payload })
      toast.success("Holiday is updated", { position: "top-center" });
      dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  }

}
export function clientDeleteHoliday(id) {
  return async (dispatch) => {
    dispatch(setSmallLoader())
    try {
      let result = await clientInstance.delete(`/client/delete-public-holiday/${id}`)
      console.log(result, "result")
      toast.success("Holiday is Deleted", { position: "top-center" });
      dispatch(setActionSuccessFully())
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  }

}


// --------------------------------website API------------------------------------------

export function getTimeZoneForCountry(countryCode) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/countries/${countryCode}/timezones`);
      dispatch(setTimeZones(result?.data?.data?.timezones));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getTimeZoneList() {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/countries/timezones`);
      dispatch(setListTimeZone(result?.data.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getCoutriesList() {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/countries/`);
      dispatch(setCountriesList(result?.data?.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getStatesList(countryCode) {
  console.log(countryCode, "country code inside api")
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/countries/${countryCode}/states`);
      dispatch(setStatesList(result?.data?.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getCitiesList(countryCode, stateCode) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/countries/${countryCode}/states/${stateCode}/cities`);
      dispatch(setCitiesList(result?.data?.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}


export function getWebsiteSkills(callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`web/skills`);
      dispatch(setSkillList(result?.data?.data));
      callback(result?.data?.data)
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getWebClientData(clientId, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`web/get-client-data?user_id=${clientId}`);
      dispatch(setWebClientData(result?.data?.data));
      callback(result?.data?.data);
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getWebClientLookUp(callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`web/get-lookups`);
      dispatch(setClientLook(result?.data?.data));
      callback && callback(result?.data?.data)
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function applyAsClient(payload, callback, triggerVerificationModal) {
  // console.log("LoaderWorking")
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`/common/client-registration`, { ...payload });
      localStorage.setItem("clientId", result?.data?.data?.id);
      toast.success(result.data.message, { position: "top-center" });
      dispatch(setActionSuccessFully())
      return callback(result?.data?.data.Location);
    } catch (error) {
      // const message = error?.message;
      // if (error?.message === VERIFY_USER_MESSAGE) {
      // if (error.response?.data?.verify_user) {
        // triggerVerificationModal("verify"); 
      // } else {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      // }
      dispatch(setFailClientData());
    }
  };
}

export function clientPostJob(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await authInstance.post(`web/client/post-job`, { ...payload });
      // dispatch(setClientLook(result?.data?.data));
      callback()
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function sendVerificationOtp(payload, handleStep) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    dispatch(setOTPloader());
    try {
      let result = await authInstance.post(`web/send-otp`, { ...payload });
      dispatch(setSuccessActionData)
      toast.success(result?.data?.message, { position: "top-center" });
      dispatch(setActionSuccessFully());
      (handleStep) && handleStep("verify-otp");
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function verifyOtp(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    dispatch(setOTPloader())
    try {
      let result = await authInstance.post(`web/verify-otp`, { ...payload });
      dispatch(setActionSuccessFully());
      toast.success(result?.data?.message, { position: "top-center" });
      (callback) && callback(result?.data?.data?.completed_steps)
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getJobLists(filters, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(generateApiUrl(filters, "common/job-list"));
      if (result.status === 200) {
        dispatch(setJobList(result?.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}
export function getProfile(id, callback) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await authInstance.get(`/common/client-details/${id}`);
      callback(result?.data?.data)
      // dispatch(setProfile(result?.data?.data));
    } catch (error) {
      const message = error?.message;
      toast.error(error?.response?.data?.message, { position: "top-center" });
      // dispatch(setFailClientData());
    }
  };
}

export const uploadFileToS3Bucket = (payload, callback) => {
  return async (dispatch) => {
    dispatch(setSmallLoader())
    // dispatch(setScreenLoader());
    try {
      let result = await clientFormInstance.post(`/web/upload-file/`, payload);
      callback && callback(result?.data?.data?.Location);
      dispatch(setActionSuccessFully())
      // toast.success("project added successfully", {
      //   position: "top-center",
      // });
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
};

export function getClientProfileDetails(id) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`common/client-details/${id}`);
      dispatch(setClientProfileData(result?.data?.data))
      dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function clientRegistration(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/client-registration/", {
        ...payload,
      });
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success(result.data.message, { position: "top-center" });
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailClientData());
    }
  };
}

export function getAverageFeedbackDetails(interviewId) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`common/average-skill-ratings/${interviewId}`);
      dispatch(setFeedbackDetails(result.data));
    } catch (error) {
      const message = error?.message || "Something went wrong";
      console.error("Error fetching feedback details:", message);
      toast.error(message, { position: "top-center" });
      dispatch(setFailFeedbackDetails());
    }
  };
}

export function submitFeedback(feedbackData) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      await clientInstance.post('common/share-feedback', feedbackData);
      toast.success("Feedback submitted successfully!", { position: "top-center" });
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
    } finally {
      dispatch(clearFeedbackDetails());
    }
  };
}
export const approveFeedback = (id, status) => {
  return async (dispatch) => {
    try {
      dispatch(setApproveFeedbackLoader(true));
      const response = await clientInstance.put(`admin/interview/update-status/${id}`, { status });
      if (response.data.success) {
        dispatch(setApproveFeedback(response.data));
      } else {
        dispatch(setFailClientData());
      }
    } catch (error) {
      dispatch(setFailClientData());
    } finally {
      dispatch(setApproveFeedbackLoader(false));
    }
  };
};
// export const addCustomSkills = (payload,callback) => {
//   console.log(payload,"payload")
//   return async (dispatch) => {
//     try {
//       dispatch(setApproveFeedbackLoader(true));
//       const response = await clientInstance.post("/common/add-master-skills",{...payload});
//       dispatch(setCustomSkills(response?.data?.data))
//       return callback;
//     } catch (error) {
//       dispatch(setFailClientData());
//     }
//   };
// };

export const addCustomSkills = (payload, callback) => {
  console.log(payload, "payload");
  return async (dispatch) => {
    try {
      dispatch(setApproveFeedbackLoader(true));
      const response = await clientInstance.post("/common/add-master-skills", { ...payload });
      console.log(response?.data?.data,"response")
      dispatch(setCustomSkills(response?.data?.data));
      if (callback) callback(); 
    } catch (error) {
      dispatch(setFailClientData());
    }
  };
};

export function addDegree(payload, callback) {
  return async (dispatch) => {
    try {
      let result = await authInstance.post(`common/add-degree`, {
        ...payload,
      });
      dispatch(setSuccessActionData());
       callback(result);
    } catch (error) {
      dispatch(setFailClientData());
    }
  };
}