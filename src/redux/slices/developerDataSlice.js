import { createSlice } from "@reduxjs/toolkit";
import authInstance from "../../services/auth.instance";
import { toast } from "react-toastify";
import developerInstance from "../../services/developer.instance";
import { generateApiUrl } from "../../helper/utlis";
import clientInstance, {
  clientFormInstance,
} from "../../services/client.instance";
import { createToastMessage } from "../../pages/websiteRegisterForm/developer/developeStepConstant";

const initialDeveloperData = {
  btnLoader: false,
  screenLoader: false,
  smallLoader: false,
  developerCvData: {},
  userProfileDetails: {},
  developerDashboard: {},
  degreeList: [],
  developerTimeReports: [],
  addTimeReports: [],
  allContracts: [],
  shareDocument: [],
  approvedLoader: false,
  lastTimeLog: {},
  leaveHistory: [],
  leaveDetails: [],
  holidayList: [],
  paySlips: {},
  languageOptions: [],
  skillOptions: [],
  totalPaySlipPages: null,
  countries: [],
  degreeOptions: [],
  projectHistoryDetail: [],
  projectHistoryPagination: {},
  projectDetail: {},
  developerRegistrationData:{},
  chatRoomMessageList:{},
  chatData:[],
  memberList:[],
  chatMessagesPaginationInfo:{},
  jobList:{}
};

export const developerDataSlice = createSlice({
  name: "authData",
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
    setApprovedLoader: (state, action) => {
      state.approvedLoader = true;
    },

    setSuccessDeveloperData: (state, action) => {
      state.developerCvData = action.payload;
      state.smallLoader = false;
      state.screenLoader = false;
    },
    setAddTimeReports: (state, action) => {
      state.addTimeReports = action.payload;
      state.smallLoader = false;
      state.btnLoader = false;
    },
    setSuccessProfileData: (state, action) => {
      state.userProfileDetails = action.payload;
      state.screenLoader = false;
    },

    setAllCountries: (state, action) => {
      let updatedCountry = action.payload?.data.map((item) => {
        return { label: item.name, value: item?.code };
      });
      state.smallLoader = false;
      state.countries = updatedCountry;
    },

    setSuccessActionData: (state, action) => {
      state.smallLoader = false;
      state.btnLoader = false;
    },
    setDeveloperTimeReports: (state, action) => {
      state.smallLoader = false;
      state.developerTimeReports = action.payload;
    },
    setAllContracts: (state, action) => {
      state.smallLoader = false;
      state.allContracts = action.payload;
    },

    setFailDeveloperData: (state, action) => {
      state.smallLoader = false;
      state.btnLoader = false;
      state.screenLoader = false;
    },

    setDeveloperDashboard: (state, action) => {
      state.developerDashboard = action.payload;
      state.screenLoader = false;
    },
    setDegreeList: (state, action) => {
      let data = action?.payload?.map((item) => {
        return { label: item.title, value: item.id };
      });
      state.degreeList = data;
      state.smallLoader = false;
    },
    setShareDocument: (state, action) => {
      state.smallLoader = false;
      state.shareDocument = action.payload;
    },
    setActionSuccessFully: (state, action) => {
      state.smallLoader = false;
      state.approvedLoader = false;
      state.screenLoader = false;
    },
    setLastTimeLog: (state, action) => {
      state.lastTimeLog = action.payload;
    },
    setLeaveHistory: (state, action) => {
      state.leaveDetails = action.payload;
    },
    setUpdateLeave: (state, action) => {
      state.updateLeave = action.payload;
      state.smallLoader = false;
    },
    setHolidayList: (state, action) => {
      state.holidayList = action.payload;
    },
    setSkillOptions: (state, action) => {
      state.skillOptions = action.payload;
      state.screenLoader = false;
    },
    setLanguageOptions: (state, action) => {
      state.languageOptions = action.payload;
      state.screenLoader = false;
    },
    setPaySlips: (state, action) => {
      state.paySlips = action.payload.data;
      state.screenLoader = false;
      state.totalPaySlipPages = action?.payload?.pagination?.totalPages;
    },
    setDegreeOptions: (state, action) => {
      state.degreeOptions = action.payload;
      state.screenLoader = false;
    },
    setProjectHistoryDetail: (state, action) => {
      state.projectHistoryDetail = action.payload?.data;
      state.projectHistoryPagination = action.payload?.pagination;
      state.screenLoader = false;
    },
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
      state.screenLoader = false;
    },
    setDeveloperRegistrationDetails: (state, action) => {
      state.developerRegistrationData = action.payload;
      state.screenLoader = false;
    },
    setMessageRoomList: (state, action) => {
      state.chatRoomMessageList = action.payload;
      state.screenLoader = false;
    },
    setChatData: (state, action) => {
      // logic for appending newly fetched and previous data for pagination
      const newPaginatedData = [...action.payload];
      const previousChatData = [...state.chatData];
      state.chatData = [...newPaginatedData,...previousChatData];
      state.screenLoader = false;
    },
    setChatMessagPaginationInfo:(state,action) => {
      state.chatMessagesPaginationInfo = action.payload;
    },
    setMemberList:(state,action) =>{
      state.memberList = action.payload;
    },
    setJobListingData:(state,action) =>{
      state.jobList = action.payload
    }
  },
});

export const {
  setSmallLoader,
  setProjectDetail,
  setDegreeOptions,
  setLanguageOptions,
  setProjectHistoryDetail,
  setSkillOptions,
  setShareDocument,
  setScreenLoader,
  setApprovedLoader,
  setAllContracts,
  setDeveloperTimeReports,
  setAddTimeReports,
  setSuccessActionData,
  setBtnLoader,
  setDegreeList,
  setHolidayList,
  setFailDeveloperData,
  setSuccessDeveloperData,
  setActionSuccessFully,
  setSuccessProfileData,
  setDeveloperDashboard,
  setLastTimeLog,
  setPaySlips,
  setLeaveHistory,
  setUpdateLeave,
  setAllCountries,
  setDeveloperRegistrationDetails,
  setMessageRoomList,
  setChatData,
  setMemberList,
  setChatMessagPaginationInfo,
  setJobListingData
} = developerDataSlice.actions;

export default developerDataSlice.reducer;

export function fetchDeveloperCv(callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("developer/cv");
      if (result.status === 200) {
        dispatch(setSuccessDeveloperData(result.data.data));
      }
      return callback(result.data.data)
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function updateDeveloperProfile(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/update-profile/", {
        ...payload,
      });
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success("Profile is Updated", { position: "top-center" });
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

// export function getDeveloperProfileDetails(payload, callback) {
//   return async (dispatch) => {
//     dispatch(setScreenLoader());
//     try {
//       let result = await clientInstance.get("developer/get-profile");
//       if (result.status === 200) {
//         dispatch(setSuccessProfileData(result.data));
//       }
//     } catch (error) {
//       const message = error.message || "Something went wrong";
//       toast.error(message, { position: "top-center" });
//       dispatch(setFailDeveloperData());
//     }
//   };
// }

export function getProfileDetails(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(payload);
      if (result.status === 200) {
        dispatch(setSuccessProfileData(result.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function updateProfileDetails(payload, UpdateRolesEndpoint) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(UpdateRolesEndpoint, {
        ...payload,
      });
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success("Profile is Updated", { position: "top-center" });
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function approvedClient(id, payload, role, callback) {
  return async (dispatch) => {
    dispatch(setApprovedLoader());
    let result;
    try {
      if (role === "developer") {
        result = await clientInstance.put(`${role}/submit-time-report/${id}`, {
          ...payload,
        });
      } else {
        result = await clientInstance.post(
          `${role}/approve-time-reports/${id}`,
          { ...payload }
        );
      }
      if (result.status === 200) {
        dispatch(setActionSuccessFully());
        toast.success("Time reports approved successfully", {
          position: "top-center",
        });
      }
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
    }
  };
}
export function getDeveloperDashboard(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("developer/dashboard");
      if (result.status === 200) {
        dispatch(setDeveloperDashboard(result.data.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function updateDeveloperCvBio(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/update-bio", {
        ...payload,
      });
      if (result.status === 200) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {
          toast.success("Bio is Updated", { position: "top-center" });
        }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function applyLeave(payload) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("/developer/apply-for-leave", {
        ...payload,
      });
      if (result.status === 201) {
        toast.success("Leave Applied", { position: "top-center" });
        dispatch(setActionSuccessFully());
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function applyJob(payload,callback) {
  console.log(payload,"payload")
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("/developer/apply-on-job", {
        ...payload,
      });
      if (result.status === 200) {
        toast.success("Job Applied", { position: "top-center" });
        dispatch(setActionSuccessFully());
      }
      return callback()
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function getLeaveHistory(id, payload) {
  return async (dispatch) => {
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `common/get-leave-history/${id}`)
      );
      if (result.status === 200) {
        dispatch(setLeaveHistory(result?.data?.data));
      }
    } catch (error) {
      console.log(error,"new_errr")
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setLeaveHistory([]));
      dispatch(setFailDeveloperData());
    }
  };
}

export function getUpdateLeave(id, payload) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(
        `/developer/update-leave-request/${id}`,
        { ...payload }
      );
      if (result.status === 200) {
        toast.success("Leave Updated", { position: "top-center" });
        dispatch(setUpdateLeave(result?.data?.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(setFailDeveloperData());
    }
  };
}

export function getCancelLeave(id, payload) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(
        `/developer/withdraw-leave-request/${id}`,
        { ...payload }
      );
      dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperCvExperience(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/update-experiences`, {
        ...payload,
      });
      if (result.status === 200) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {
          toast.success("Experience is Updated", { position: "top-center" });
        }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
      return;
    }
  };
}

export function addDeveloperCvExperience(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/add-experience", {
        ...payload,
      });
      toast.success("Experience is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function deleteExperience(id, devId, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.delete(
        `common/delete-experience/${id}?developerId=${devId}`
      );
      if (result.status === 200) {
        toast.success("Experience is deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function deleteSkill(payload, id, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.delete(
        `common/delete-developer-skill/${id}?user_id=${payload}`
      );
      if (result.status === 200) {
        toast.success(" Expertise is deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function addDeveloperCvEducation(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/add-education", {
        ...payload,
      });

      toast.success("Education is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function updateDeveloperCvEducation(payload, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/update-educations`, {
        ...payload,
      });
      if (result.status === 200) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {
          toast.success("Education is Updated", { position: "top-center" });
        }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function getDegreeList() {
  return async (dispatch) => {
    // dispatch(setSmallLoader())
    try {
      let result = await clientInstance.get(`common/degree-list`);
      dispatch(setDegreeList(result.data.data));
      // return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function deleteEducationCv(id, payload, callback) {
  return async (dispatch) => {
    //  dispatch(setSmallLoader())
    try {
      let result = await clientInstance.delete(
        `common/delete-education/${id}?developerId=${payload}`
      );
      if (result.status === 200) {
        toast.success("Education is Deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function deleteCertificate(id,callback) {
  return async (dispatch) => {
    //  dispatch(setSmallLoader())
    try {
      let result = await clientInstance.delete(
        `common/delete-certification/${id}`
      );
      if (result.status === 200) {
        toast.success("Certificate is Deleted", { position: "top-center" });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function updateDeveloperSkills(
  payload,
  role,
  callback,
  method = "post"
) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result;
      //  if(method === "post")
      //     {
      //          result = await clientInstance.post(`common/edit-developer-skills`, {... payload })
      // }
      // else{
      //     result = await clientInstance.put(`common/edit-developer-skills`, {... payload })
      // }
      result = await clientInstance.post(`common/update-developer-skills`, {
        ...payload,
      });
      if (result.status === 200) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {
          toast.success("Skills are Updated", { position: "top-center" });
        }
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function addDeveloperSocialMedia(payload, callback) {
  return async (dispatch) => {
    dispatch(setBtnLoader());
    try {
      let result = await clientInstance.post(`common/add-social-links`, {
        ...payload,
      });
      if (result.status === 200) {
        toast.success("Media is updated successfully", {
          position: "top-center",
        });
        dispatch(setSuccessActionData());
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function developertimeReporting(payload) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `developer/time-reports`)
      );
      if (result.status === 200) {
        dispatch(setDeveloperTimeReports(result.data.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function getPreviousTimeReports(payload, callback) {
  return async (dispatch) => {
    dispatch(setBtnLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `developer/get-previous-report`)
      );
      if (result.status === 200) {
        dispatch(setAddTimeReports(result.data.data.timeReports));
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function getAllContracts(payload, callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader())
    try {
      let result = await clientInstance.get(`developer/contracts`);
      if (result.status === 200) {
        dispatch(setAllContracts(result.data.data));
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function saveTimeReports(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`developer/add-time-reports`, {
        ...payload,
      });
      if (result.status === 200) {
        dispatch(setSuccessActionData());
        toast.success("Developer time is Added", { position: "top-center" });
        return callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function getDocumentShare() {
  return async (dispatch) => {
    // dispatch(setSmallLoader())
    try {
      let result = await clientInstance.get(`common/share-file/users`);
      if (result.status === 200) {
        dispatch(setShareDocument(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function shareBelongisFile(payload) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/share-file`, {
        ...payload,
      });
      toast.success(result?.data?.message, { position: "top-center" });
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

// add degree
export function addDegree(payload, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/add-degree`, {
        ...payload,
      });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      dispatch(setFailDeveloperData());
    }
  };
}

export function addProjects(paylaod, role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`/common/add-developer-project`, {
        ...paylaod,
      });
      if (role === "developer") {
        toast.success("Please wait for changes approval by admin", {
          position: "top-center",
        });
      } else {
        toast.success("Project is Added", { position: "top-center" });
      }

      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function deleteProjects(projectId, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.delete(
        `/common/delete-developer-project/${projectId}`
      );
      toast.success("Project deleted successfully", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateProjects(
  projectId,
  payload,
  role,
  callback,
  isLast = true
) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(
        `/common/update-developer-project?projectId=${projectId}`,
        payload
      );
      if (isLast) {
        if (role === "developer") {
          toast.success("Please wait for changes approval by admin", {
            position: "top-center",
          });
        } else {
          toast.success("Projects are Updated", { position: "top-center" });
        }
      }
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
      return;
    }
  };
}

export function addLogTime(paylaod, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`developer/add-time-log`, {
        ...paylaod,
      });
      dispatch(setSuccessActionData());
      dispatch(setLastTimeLog(result.data));
      return callback();
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
      // dispatch(setLastTimeLog(error?.response?.data?.success));
    }
  };
}

export function getLastTimeLog(paylaod) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`developer/get-last-time-log`);
      dispatch(setLastTimeLog(result.data));
      // return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}

export function postReconciliationData(paylaod, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(
        `/common/add-time-report-reconciliation`,
        paylaod
      );
      // dispatch(setLastTimeLog(result.data));
      if (result?.status == 200 || 201) {
        toast.success("Reconciliation is submitted successfully", {
          position: "top-center",
        });
      }
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}
export function getHolidaysList() {
  return async (dispatch) => {
    try {
      let result = await clientInstance.get(`/developer/get-holidays`);
      dispatch(setHolidayList(result.data.data));
    } catch (error) {
      console.log(error, "error");

    }
  };
}

export function getPaySlips(query) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`/developer/pay-slip?${query}`);
      dispatch(setPaySlips(result.data));
    } catch (error) {
      console.log(error, "error");
      const message = error?.response.data.message
      toast.error(message, { position: "top-center" });
    }
  };
}

export function getAllCountries() {
  return async (dispatch) => {
    try {
      let result = await clientInstance.get(`web/countries`);
      if (result.status === 200) {
        toast.success(result?.data.message, { position: "top-center" });
        dispatch(setAllCountries(result?.data?.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      if (error?.response?.status === 404) {
        toast.error(error?.response.data.message, { position: "top-center" });
        dispatch(setFailDeveloperData());
      } else {
        toast.error(message, { position: "top-center" });
        dispatch(setFailDeveloperData());
      }
    }
  };
}

export function postDeveloperStepData(
  url,
  paylaod,
  callback,
  activeStep,
  triggerVerificationModal
) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`${url}`, {
        ...paylaod,
      });
      if (activeStep === 1) {
        const developerId = result?.data?.data?.id;
        localStorage.setItem("developerId", developerId);
      }
      callback();
      dispatch(setActionSuccessFully());
    } catch (error) {
      console.log("inside catch 11");
      if (error.response?.data?.verify_user) {
        triggerVerificationModal("verify");
      } else {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      }
      dispatch(setFailDeveloperData());
      // dispatch(setLastTimeLog(error?.response?.data?.success));
    }
  };
}

export function getSkillOptions() {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/skills`);
      dispatch(setSkillOptions(result?.data?.data));
      // return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}
export function getLanguageOptions() {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/languages`);
      dispatch(setLanguageOptions(result?.data?.data));
      // return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}

export function getDeveloperData(userId, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        `web/get-developer-data/?user_id=${userId}`
      );
      callback(result?.data?.data);
      dispatch(setActionSuccessFully());
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}

export const addDeveloperExperience = (
  developerId,
  payload,
  action,
  callback
) => {
  return async (dispatch) => {
    if (action === "delete") {
      // dispatch(setScreenLoader());
    } else {
      // dispatch(setScreenLoader());
      // dispatch(setSmallLoader());
    }
    try {
      let result = await clientInstance.post(
        `/web/add-experience/?developer_id=${developerId}`,
        payload
      );
      // callback && callback();
      callback(payload);
      toast.success(createToastMessage(action, "Experience"), {
        position: "top-center",
      });
      // dispatch(setActionSuccessFully());
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
};


export function developerGetJobListing(payload) {
  console.log(payload,"payloaddd")
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(payload, `developer/matching-jobs`)
      );
      if (result.status === 200) {
        // dispatch(setDeveloperTimeReports(result.data.data));
        dispatch(setJobListingData(result.data))
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
    }
  };
}


export const addDeveloperEducation = (
  developerId,
  payload,
  action,
  callback
) => {
  return async (dispatch) => {
    // if (action === "delete") {
    //   dispatch(setScreenLoader());
    // } else {
    //   dispatch(setSmallLoader());
    // }
    try {
      let result = await clientInstance.post(
        `/web/add-education/?developer_id=${developerId}`,
        payload
      );
      callback && callback(payload);
      toast.success(createToastMessage(action, "Education"), {
        position: "top-center",
      });
      // dispatch(setActionSuccessFully());
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
};

export function getDegreeOptions() {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(`web/degree-list`);
      dispatch(setDegreeOptions(result.data.data));
      // return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export const addDeveloperProject = (payload, callback, closeLoader) => {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(
        `/web/add-developer-project/`,
        payload
      );
      callback && callback();
      closeLoader();
      toast.success("project added successfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      closeLoader();
    }
  };
};

export function deleteDeveloperProject(id, payload, callback, closeLoader) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.delete(
        `web/delete-developer-project/${id}`
      );
      if (result.status === 200) {
        toast.success("Project deleted successfully", {
          position: "top-center",
        });
        // dispatch(setSuccessActionData());
        callback(payload);
        // closeLoader();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailDeveloperData());
      // closeLoader();
    }
  };
}

export function getDeveloperProjects(developerId, callback, closeLoader) {
  return async (dispatch) => {
    // dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        `web/projects/?userId=${developerId}`
      );
      callback(result.data.data);
      closeLoader();
      // dispatch(setDegreeOptions(result.data.data));
      // return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      closeLoader();
    }
  };
}

//this is for website upload file
export function fileUploadForWeb(fileData, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`web/upload-file`, fileData);
      // dispatch(setActionSuccessFully());
      return callback(result?.data?.data.Location);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export const uploadFileToS3Bucket = (payload, callback) => {
  return async (dispatch) => {
    dispatch(setSmallLoader())
    try {
      let result = await clientInstance.post(`/web/upload-file/`, payload);
      callback && callback(result?.data?.data?.Location);
      dispatch(setActionSuccessFully());
      // toast.success("project added successfully", {
      //   position: "top-center",
      // });
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
};

export function getProjectHistoryDetail(filters) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(filters, `developer/get-project-history`)
      );
      dispatch(setProjectHistoryDetail(result.data));
      // return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
// for single project detail page
export function getProjectDetail(filters, id, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get(
        generateApiUrl(filters, `developer/get-project-time-report/${id}`)
      );
      dispatch(setProjectDetail(result.data?.data));
      callback && callback(result.data?.data);
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}


//all registration

export function developerRegistration(payload,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.post("common/developer-registration",{...payload});
      localStorage.setItem("developerId",result?.data?.data?.id)
      if (result.status === 201) {
      toast.success(result?.data?.message, { position: "top-center" });
      dispatch(setActionSuccessFully());
      return callback()
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function registerDeveloperExperience(payload,id,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/add-developer-experience?developer_id=${id}`, payload);
      toast.success("Experience is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function editDeveloperExperience(payload,id) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await authInstance.put(`common/update-experience/${id}`, payload);
      toast.success("Experience is Updated", { position: "top-center" });
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}


export function registerDeveloperEducation(payload, id, callback) {
  console.log(payload,"payload")
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.post(`common/add-developer-education?developer_id=${id}`, payload);
      // toast.success("Education is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function registerDeveloperSkills(payload,id) {
  console.log(payload,"payload")
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/add-developer-skills`, payload);
      toast.success("skills is Added", { position: "top-center" });
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function developerRegistrationBio(payload) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.post("common/add-developer-bio",{...payload});
      toast.success("Bio is created", { position: "top-center" });
      dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function addDeveloperRegisProject(payload,callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.post("common/add-developer-project",payload);
      toast.success("Project is Added", { position: "top-center" });
      dispatch(setActionSuccessFully());
      return callback()
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}




export function getDeveloperProfileDetails(id,callback) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await authInstance.get(`common/developer-profile?developer_id=${id}`);
      dispatch(setDeveloperRegistrationDetails(result?.data?.data))
      return callback(result.data.data)
      // dispatch(setActionSuccessFully());
    } catch (error) {
      const message = error.message || "Something went wrong";
      // toast.error(message, { position: "top-center" });
      // dispatch(setFailDeveloperData());
    }
  };
}

// export function messageChatRoomList(id) {
//   console.log(id,"developerId")
//   return async (dispatch) => {
//     dispatch(setSmallLoader());
//     try {
//       let result = await clientInstance.get(`messages/chatroom_list/${id}`);
//       dispatch(setMessageRoomList(result?.data?.data))
//       // dispatch(setSuccessActionData());
//     } catch (error) {
//       const message = error.message || "Something went wrong";
//       toast.error(message, { position: "top-center" });
//       dispatch(setFailDeveloperData());
//     }
//   };
// }


export function getAllMessages(id ,payload){
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(generateApiUrl(payload,`messages/chatroom_list/${id}`));
      dispatch(setMessageRoomList(result?.data?.data))
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailClientData());
    }
  };
}


export function getChatRoomData(id, page=1) {
  // setting callback default value as empty function if this parameter is not passed
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`messages/chatroom-messages/${id}`,{
        params:{
          page:page
        }
      });
      dispatch(setChatData(result?.data?.messages?.data));
      const paginationInfo = {
        total_count: result?.data?.messages?.total_count,
        total_pages:result?.data?.messages?.total_pages,
        current_page:result?.data?.messages?.current_page
      };
      dispatch(setChatMessagPaginationInfo(paginationInfo))
      // dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailDeveloperData());
    }
  };
}


export function getChatRoomMembers(id) {
  return async (dispatch) => {
    // dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(`messages/chatroom-members/${id}`);
      console.log(result?.data?.data,"...")
      
      dispatch(setMemberList(result?.data?.data))
      
      // dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      // dispatch(setFailDeveloperData());
    }
  };
}
export function getUploadCertificate(payload) {
  return async (dispatch) => {
    dispatch(setBtnLoader());
    try {
      let result = await clientInstance.post("/common/add-certification/",{...payload});
      dispatch(setSuccessActionData());
    } catch (error) {
      const message = error.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
