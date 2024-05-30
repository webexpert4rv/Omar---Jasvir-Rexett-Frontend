import { createSlice } from "@reduxjs/toolkit";
import authInstance from "../../services/auth.instance";
import { toast } from "react-toastify";
import developerInstance from "../../services/developer.instance";
import { generateApiUrl } from "../../helper/utlis";
import clientInstance from "../../services/client.instance";

const initialDeveloperData = {
  btnLoader: false,
  screenLoader: false,
  smallLoader: false,
  developerCvData: {},
  developerProfileData: {},
  developerDashboard: {},
  degreeList: [],
  developerTimeReports: [],
  addTimeReports: [],
  allContracts: [],
  shareDocument: [],
  approvedLoader: false,
  lastTimeLog: {},
  leaveHistory: [],
  leaveDetails:[]
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
      state.developerProfileData = action.payload;
      state.screenLoader = false;
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
    },
    setLastTimeLog: (state, action) => {
      state.lastTimeLog = action.payload;
    },
    setLeaveHistory: (state,action) =>{
      state.leaveDetails = action.payload
  },
    setUpdateLeave:(state,action)=>{
      state.updateLeave = action.payload
  }
},
});

export const {
  setSmallLoader,
  setShareDocument,
  setScreenLoader,
  setApprovedLoader,
  setAllContracts,
  setDeveloperTimeReports,
  setAddTimeReports,
  setSuccessActionData,
  setBtnLoader,
  setDegreeList,
  setFailDeveloperData,
  setSuccessDeveloperData,
  setActionSuccessFully,
  setSuccessProfileData,
  setDeveloperDashboard,
  setLastTimeLog,
  setLeaveHistory,
  setUpdateLeave
} = developerDataSlice.actions;

export default developerDataSlice.reducer;

export function fetchDeveloperCv(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("developer/cv");
      if (result.status === 200) {
        dispatch(setSuccessDeveloperData(result.data.data));
      }
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

export function getDeveloperProfileDetails(payload, callback) {
  return async (dispatch) => {
    dispatch(setScreenLoader());
    try {
      let result = await clientInstance.get("developer/get-profile");
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
export function approvedClient(id,payload, role, callback) {
  return async (dispatch) => {
    dispatch(setApprovedLoader());
    let result;
    try {
      if (role === "developer") {
        result = await clientInstance.put(
          `${role}/submit-time-report/${id}`,{...payload}
        );
      } else {
        result = await clientInstance.post(
          `${role}/approve-time-reports/${id}`,{...payload}
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

export function updateDeveloperCvBio(payload,role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post("common/update-bio", {
        ...payload,
      });
      if (result.status === 200) {
        if(role==="developer"){
        toast.success("Please wait for changes approval by admin", { position: "top-center" });
        }else{
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
      let result = await clientInstance.post("/developer/apply-for-leave", {...payload,});
      if (result.status === 201) {
        toast.success("Leave Applied", { position: "top-center" });
        dispatch(setSuccessActionData());
      }
    } catch (error) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

export function getLeaveHistory(id , payload ) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.get(generateApiUrl(payload,`common/get-leave-history/${id}`));
      if (result.status === 200) {
        dispatch(setLeaveHistory(result?.data?.data));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(setLeaveHistory([]))
      dispatch(setFailDeveloperData());
    }
  };
}

export function getUpdateLeave(id , payload ) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(`/developer/update-leave-request/${id}`,{...payload});
      if (result.status === 200) {
        toast.success("Leave Updated", { position: "top-center" });
        dispatch(setUpdateLeave(result?.data?.data))
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(setFailDeveloperData());
    }
  };
}


export function getCancelLeave(id , payload ) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.put(`/developer/withdraw-leave-request/${id}`,{...payload});
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateDeveloperCvExperience(payload,role,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/update-experiences`, {
        ...payload,
      });
      if (result.status === 200) {
        if(role==="developer"){
        toast.success("Please wait for changes approval by admin", { position: "top-center" });
        }else{
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

export function updateDeveloperCvEducation(payload,role,callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/update-educations`, {
        ...payload,
      });
      if (result.status === 200) {
        if(role==="developer"){
        toast.success("Please wait for changes approval by admin", { position: "top-center" });
        }else{
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

export function getDegreeList(payload, callback) {
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

export function updateDeveloperSkills(payload,role, callback, method = "post") {
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
        if (role==="developer"){
        toast.success("Please wait for changes approval by admin", {
          position: "top-center",
        });
      }else{
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
      const message = error.message || "Something went wrong";
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

export function shareBelongisFile(paylaod) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/share-file`, {
        ...paylaod,
      });
      toast.success(result?.data?.message, { position: "top-center" });
      dispatch(setSuccessActionData());
    } catch (error) {
      console.log(error.response.data.message, "error.response.data.message");
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}

// add degree
export function addDegree(paylaod, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`common/add-degree`, {
        ...paylaod,
      });
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      console.log(error, "error");
      dispatch(setFailDeveloperData());
    }
  };
}

export function addProjects(paylaod,role, callback) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(`/common/add-developer-project`, {
        ...paylaod,
      });
      if(role==="developer"){
        toast.success("Please wait for changes approval by admin", { position: "top-center" });
      }else{
        toast.success("Project is Added", { position: "top-center" });
      }
     
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      console.log(error.response.data.message, "error.response.data.message");
      const message = error.response.data.message || "Something went wrong";
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
      console.log(error.response.data.message, "error.response.data.message");
      const message = error.response.data.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
      dispatch(setFailDeveloperData());
    }
  };
}
export function updateProjects(projectId, payload, role,callback,isLast = true) {
  return async (dispatch) => {
    dispatch(setSmallLoader());
    try {
      let result = await clientInstance.post(
        `/common/update-developer-project?projectId=${projectId}`,
        payload
      );
      if (isLast) {
        if(role==="developer"){
        toast.success("Please wait for changes approval by admin", { position: "top-center" });
      }
    }else{
        toast.success("Projects are Updated", { position: "top-center" });
      }
      dispatch(setSuccessActionData());
      return callback();
    } catch (error) {
      console.log(error.response.data.message, "error.response.data.message");
      const message = error.response.data.message || "Something went wrong";
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
      // toast.success(result)
      return callback();
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-center" });
      dispatch(setFailDeveloperData());
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
      if (result?.status == 200||201) {
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
