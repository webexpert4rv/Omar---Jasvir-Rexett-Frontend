import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { generateApiUrl } from '../../helper/utlis';
import clientInstance from '../../services/client.instance';

const initialAdminData = {
    screenLoader: false,
    isChatOpen: false,
    smallLoader: false,
    listOfClients: [],
    assignedDeveloper: [],
    profileData: {},
    jobListing: [],
    singleJobListing: {},
    allApplications: {},
    assignEmployeeList: [],
    adminTimeReportingList: [],
    engagement: {},
    adminApproveReject: [],
    suggestedDeveloper: [],
    adminDashboard: [],
    approvedLoader: false,
    notificationList: [],
    singleJobPagination: {},
    singleClient: {},
    accountDeletionList: {},
    adminClientList: [],
    timeReportDetails: {},
    invoiceDetails: {},
    developerTimeReport: [],
    invoiceTotalPage: null,
    timeReportingDetailTotalPage: null,
    configDetails: {},
    allPermissionList: [],
    employeeList: [],
    toDoList: {},
    developerList: [],
    allEvents: {},
    messageTemplates: {},
    allAdminEmployees: [],
    chatRoom: {},
    allPermissionDetails: {},
    allIntegrationData: []
}

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState: initialAdminData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setSmallLoader: (state, action) => {
            state.smallLoader = true;
        },
        setIsChatOpen: (state, action) => {
            state.isChatOpen = action.payload
            const isChatOpenAlreadyPresent = localStorage.getItem("isChatOpen");
            if (isChatOpenAlreadyPresent) {
                localStorage.removeItem("isChatOpen");
            }
            localStorage.setItem("isChatOpen", action.payload);
        },
        setBtnLoader: (state, action) => {
            state.smallLoader = true;
        },
        setApprovedLoader: (state, action) => {
            state.approvedLoader = true;
        },
        setSuccessAdminData: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.approvedLoader = false;
            state.btnLoader = false;
        },

        setSuccessApplicationList: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.allApplications = action.payload;
        },
        setSuccessAssignEmployeeList: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.assignEmployeeList = action.payload;
        },
        setSuccessProfileData: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.profileData = action.payload
        },
        setSuccessAdminListClient: (state, action) => {
            state.smallLoader = false;
            state.listOfClients = action.payload
            state.screenLoader = false;
        },
        setSuccessAdminAssignedDeveloper: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.assignedDeveloper = action.payload
        },
        setSuccessAdminJobListing: (state, action) => {
            state.smallLoader = false;
            state.jobListing = action.payload;
            state.screenLoader = false;
        },
        setSingleJobListing: (state, action) => {
            state.singleJobListing = action.payload
            state.screenLoader = false
        },

        setFailAdminData: (state, action) => {
            state.smallLoader = false;
            state.screenLoader = false;
            state.approvedLoader = false;
        },
        setAdminTimeReporting: (state, action) => {
            state.adminTimeReportingList = action.payload
            state.smallLoader = false;
            state.screenLoader = false;
        },
        setAdminEngagment: (state, action) => {
            state.engagement = action.payload
            state.screenLoader = false;
        },
        setApproveReject: (state, action) => {
            state.adminApproveReject = action.payload;
            state.smallLoader = false;
            state.screenLoader = false;
            state.approvedLoader = false;
        },
        setSuggestedDeveloper: (state, action) => {
            let recomnd = action.payload?.recommended_developers?.map((item) => { return { ...item, recommed: true } })
            let data = [...recomnd, ...action.payload?.other_developers]
            state.suggestedDeveloper = data
            state.screenLoader = false
        },

        setAdminDashboard: (state, action) => {
            state.adminDashboard = action.payload
            state.smallLoader = false;
            state.screenLoader = false;
        },

        setNotificationList: (state, action) => {
            state.notificationList = action.payload.data
            state.smallLoader = false;
            state.screenLoader = false;
        },
        setPagination: (state, action) => {
            state.singleJobPagination = action.payload
        },
        setSingleClient: (state, action) => {
            state.screenLoader = false;
            state.singleClient = action.payload
        },
        setAllIntegration: (state, action) => {
            state.screenLoader = false;
            state.allIntegrationData = action.payload
        },
        setAccountEnableDisable: (state, action) => {
            state.screenLoader = false;
            state.accountDeletionList = action.payload
        },
        setAdminClientList: (state, action) => {
            state.screenLoader = false;
            state.adminClientList = action.payload
        },
        setTimeReportDetails: (state, action) => {
            state.screenLoader = false;
            state.timeReportDetails = action.payload
            state.timeReportingDetailTotalPage = action?.payload?.pagination?.total_pages
        },
        setInvoiceDetails: (state, action) => {
            state.screenLoader = false;
            state.invoiceDetails = action.payload
            state.invoiceTotalPage = action?.payload?.pagination?.total_pages
        },
        setDeveloperTimeReport: (state, action) => {
            state.smallLoader = false;
            state.developerTimeReport = action.payload;
        },
        setConfigDetails: (state, action) => {
            state.configDetails = action.payload
        },
        setAllPermissionList: (state, action) => {
            state.allPermissionList = action.payload;
            state.smallLoader = false;
        },
        setEmployeeList: (state, action) => {
            state.employeeList = action.payload
            state.smallLoader = false;
        },
        setTodoData: (state, action) => {
            state.toDoList = action.payload
            state.smallLoader = false;
        },
        setDeveloperList: (state, action) => {
            state.developerList = action.payload
            state.smallLoader = false;
        },
        setAllEvents: (state, action) => {
            state.allEvents = action.payload
            state.smallLoader = false
        },
        setMessageTemplates: (state, action) => {
            state.messageTemplates = action.payload
            state.smallLoader = false
        },
        setAdminEmployees: (state, action) => {
            state.allAdminEmployees = action.payload
            state.smallLoader = false
        },
        setChatRoom: (state, action) => {
            state.chatRoom = action.payload
            state.smallLoader = false
        },
        setAllPermissionDetails: (state, action) => {
            state.allPermissionDetails = action.payload
            state.smallLoader = false
        }
    }
})

export const { setAllIntegration, setIsChatOpen, setAllPermissionDetails, setTimeReportDetails, setAdminEmployees, setSmallLoader, setChatRoom, setConfigDetails, setTodoData, setMessageTemplates, setAllEvents, setAllPermissionList, setDeveloperList, setEmployeeList, setDeveloperTimeReport, setInvoiceDetails, setSuggestedDeveloper, setAccountEnableDisable, setAdminClientList, setSingleClient, setPagination, setNotificationList, setScreenLoader, setApprovedLoader, setAdminDashboard, setApproveReject, setAdminEngagment, setSingleJobListing, setAdminTimeReporting, setSuccessApplicationList, setSuccessAssignEmployeeList, setFailAdminData, setSuccessAdminData, setSuccessProfileData, setSuccessAdminJobListing, setSuccessAdminListClient, setSuccessAdminAssignedDeveloper, setBtnLoader } = adminDataSlice.actions

export default adminDataSlice.reducer


export function adminListClients(page, payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`admin/clients?page=${page}`, { ...payload })
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAdminListClient(result.data.data.clients))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAdminData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAdminData())
            }

        }
    };
}
export function getDeveloperTimeReport(developerId, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`/common/developer-time-reports?developerId=${developerId}`)
            if (result.status === 200) {
                dispatch(setDeveloperTimeReport(result.data?.data[0]))
                callback(result.data?.data[0])
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
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
        if (payload?.skill_title == "Select Skills") {
            delete payload.skill_title
        }
        if (payload?.experience_years == "Select Experience") {
            delete payload?.experience_years
        }
        if (payload?.assignment_filter == "Select Developers") {
            delete payload?.assignment_filter
        }


        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, "admin/developers"))
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAdminAssignedDeveloper(result.data.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAdminData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAdminData())
            }

        }
    };
}


export function getAdminProfile(payload, callback) {
    return async (dispatch) => {
        dispatch(setSmallLoader())
        try {
            let result = await clientInstance.get('admin/profile')
            // if (result.status === 200) {
            dispatch(setSuccessProfileData(result.data))
            dispatch(setSuccessAdminData())
            // }
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
            let result = await clientInstance.post('admin/update-profile/', { ...payload })
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

export function updateEmployeeProfile(payload, id, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`admin/update-employee/${id}`, { ...payload })
            if (result.status === 200) {
                toast.success("Employee is Updated Successfully", { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
            return callback()
        } catch (error) {
            // const message = error.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function deleteEmployee(id) {
    console.log(id, "idddddd")
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete(`admin/delete-employee/${id}`)
            if (result.status === 200) {
                toast.success("Employee is deleted Successfully", { position: "top-center" })
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
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `common/job-list`))
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
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`common/job-detail/${payload}`)
            if (result.status === 200) {
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
            if (payload) {
                result = await clientInstance.get((`admin/time-reports?client_id=${payload}`))
            } else {
                result = await clientInstance.get((`admin/time-reports`))
            }
            // if (result.status === 200) {
            // toast.success("Profile is Updated Successful ly", { position: "top-center" })
            dispatch(setAdminTimeReporting(result.data.data))
            dispatch(setAdminClientList(result.data.client_list))
            // }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function allApplicationsList(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `admin/applications`))
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

export function allMemberList(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(generateApiUrl(payload, `admin/members`))
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

export function allEmployeeList(searchText = "") {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`admin/employees?search=${searchText}`)
            if (result.status === 200) {
                // toast.success("Profile is Updated Successful ly", { position: "top-center" })
                dispatch(setSuccessAssignEmployeeList(result.data.data))
            }
        } catch (error) {
            // const message = error.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function assignEmployee(payload, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader());
        try {
            let result = await clientInstance.post(`admin/assign-team-member`, { ...payload })
            if (result.status === 201) {
                toast.success(result.data?.message, { position: "top-center" })
                callback();
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.response.data.message || "Something went wrong";
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
            let result = await clientInstance.get(generateApiUrl(payload, `admin/engagements`))
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
    return async (dispatch) => {
        dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.post(`admin/approve-or-reject-account`, { ...payload })
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

export function getDeveloperSuggestList(payload, page) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
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
            let result = await clientInstance.post(`admin/suggest-developer`, { ...payload })
            dispatch(setSuccessAdminData())
            if (result.status === 200) {
                toast.success(result.data?.message ? result.data?.message : result?.message, { position: "top-center" })
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
            let result = await clientInstance.put(`admin/edit-time-report`, { ...payload })
            if (result.status === 200) {
                toast.success(result.data?.message ? result.data?.message : result?.message, { position: "top-center" })
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
            let result = await clientInstance.get(generateApiUrl(payload, `common/notifications`))
            if (result.status === 200) {
                dispatch(setNotificationList(result.data))
            }
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function markAsRead(payload, callback) {
    return async (dispatch) => {
        // dispatch(setScreenLoader())
        try {
            let result
            if (payload == undefined) {
                result = await clientInstance.put(`common/notifications/mark-as-read`)
            } else {
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
export function getAccountEnableDisable() {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get("admin/users-list?page=1")
            if (result.status === 200) {
                dispatch(setAccountEnableDisable(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}
export function getAccountDisableEnable(payload) {

    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.post(`/common/enable-disable-user`, { ...payload })
            dispatch(setSuccessAdminData())
            toast.success(result?.data?.message ? result.data?.message : result?.message, { position: "top-center" })
        } catch (error) {
            console.log(error, "errrrr")
        }
    };
}

export function createFaq(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post("admin/create-faqs", { ...payload })
            if (result.status === 200) {
                toast.success("Question has been added")
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function deleteFaq(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete(`admin/delete-faq/${payload}`)
            if (result.status === 200) {
                toast.success("Question has been deleted", { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function deleteJob(id, successCallback, failureCallback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete(`common/delete-job/${id}`)
            if (result.status === 200) {
                toast.success("Job has been deleted successfully", { position: "top-center" })
                dispatch(setSuccessAdminData())
                return successCallback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
            return failureCallback()

        }
    };
}

export function sendRemarkOnTimeReport(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`common/add-time-report-remark`, { ...payload })
            toast.success("Remark has been added", { position: "top-center" })
            dispatch(setSuccessAdminData())

        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function approvedEditAction(payload) {
    console.log(payload, "payload")
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`/admin/approve-all-changes/${payload}`)
            if (result.status === 200) {
                toast.success("Edit Request has been approved", { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function getTimeReportsDetails(clientId, query) {
    return async (dispatch) => {
        dispatch(setScreenLoader());
        try {
            let result = await clientInstance.get(`/admin/clients/${clientId}?${query}`)
            if (result.status === 200) {
                dispatch(setTimeReportDetails(result?.data?.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }

    }
}

export function getInvoiceDetails(query) {
    return async (dispatch) => {
        dispatch(setScreenLoader());
        try {
            let result = await clientInstance.get(`/admin/invoices/?${query}`)
            if (result.status === 200) {
                dispatch(setInvoiceDetails(result?.data?.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }

    }
}

export function getAllIntegrationData() {
    return async (dispatch) => {
        dispatch(setScreenLoader());
        try {
            let result = await clientInstance.get(`admin/notification-settings/list`)
            dispatch(setAllIntegration(result?.data?.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }

    }
}

export function rejectEditAction(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete(`/admin/reject-all-changes/${payload}`)
            if (result.status === 200) {
                toast.success("Edit Request has been approved", { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}
export function addToFeature(query, closeModal, data, toastMessage) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`/admin/set-featured-and-trusted/${query}`)
            if (result.status === 200) {
                toast.success(toastMessage, { position: "top-center" })
                closeModal();
                dispatch(setSuccessAdminData())
                dispatch(allMemberList(data));
            }
        } catch (error) {
            const message = error.message || "Something went wrong"
            toast.error(message, { position: "top-center" })
            closeModal();
            dispatch(setFailAdminData())
        }
    };
}

export function sendMailForCompleteProfile(payload, data, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`/admin/send-reminder`, { ...payload })
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData())
                if (data) {
                    dispatch(allApplicationsList(data))
                }
                return callback()
            }
        } catch (error) {
            // const message = error?.response?.data?.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    };
}

export function getConfigDetails() {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.get(`/common/configuration`)
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData())
                dispatch(setConfigDetails(result.data.data))
            }
        } catch (error) {
            // const message = error?.response.data.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            // dispatch(setFailAdminData())
            console.log(error, "error")

        }
    }
}

export function getUploadFile(payload, callback) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.patch(`admin/configuration`, { ...payload })
            // console.log(result.data,"result")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
            return callback()
        } catch (error) {
            const message = error?.response.data.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())

        }
    }
}

export function getAllPermissionSeeder() {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/all-permissions`)
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setAllPermissionList(result.data))
            }
        } catch (error) {
            // const message = error?.response.data.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function getAllAdminEmployees(callback) {
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/employees`)
            // toast.success(result.data?.message, { position: "top-center" })
            dispatch(setAdminEmployees(result.data.data))
            return callback(result.data.data)

        } catch (error) {
            // const message = error?.response?.data?.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            // dispatch(setFailAdminData())
        }
    }
}

export function newRoleCreate(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try{
            let result = await clientInstance.post(`admin/create-role`, {...payload})
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData())    
        }catch(error){
            const message = error?.response.data.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function newEmployeeCreate(payload) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`admin/create-employee`, { ...payload })
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData())
            }
        } catch (error) {
            const message = error?.response.data.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function getUpdateRolePermission(payload, callback) {
    return async (dispatch) => {
        try {
            let result = await clientInstance.post(`admin/create-update-role-permissions`, { ...payload })
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            return callback()
        } catch (error) {
            const message = error?.response.data.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function getAllPermissionDetails() {
    return async (dispatch) => {
        try {

            let result = await clientInstance.get(`admin/permissions-details`)
            dispatch(setAllPermissionDetails(result.data))

        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function getAdminCreateToDo(payload, callback) {
    console.log(payload, "payload")
    return async (dispatch) => {
        dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.post("admin/create-todos", { ...payload })
            if (result.status === 200) {
                toast.success(result?.data?.message, { position: "top-center" })
            }
            dispatch(setSuccessAdminData())
            return callback()
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getAdminList() {
    return async (dispatch) => {
        try {
            let result = await clientInstance.get("admin/employees")
            dispatch(setEmployeeList(result.data.data))
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
        } catch (error) {
            // const message = error?.response?.data?.message || "Something went wrong";
            // toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getAdminTodos(payload) {
    return async (dispatch) => {
        try {
            let result;
            if (payload) {
                result = await clientInstance.get(generateApiUrl(payload, "admin/todos"))
            } else {
                result = await clientInstance.get("admin/todos")
            }
            dispatch(setTodoData(result.data.data))
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            // return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getEditToDo(payload, id, callback) {
    return async (dispatch) => {
        // dispatch(setApprovedLoader())
        try {
            let result = await clientInstance.put(`admin/todos/${id}`, { ...payload })
            console.log(result.data, "resultdata")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            //  dispatch( setSuccessAdminData())
            return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            // dispatch(setFailAdminData())
        }
    }
}
export function getDeleteTodo(id, callback) {
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete((`admin/todos/${id}`))
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            dispatch(setSuccessAdminData())
            return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getAllEvents() {
    // console.log(payload,"payload")
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`common/events?page=${1}&&limit=${10}`)
            console.log(result.data, "eventinglist")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            dispatch(setAllEvents(result?.data))
            // return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getDeveloperList() {
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get("common/developers-list")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            dispatch(setDeveloperList(result.data))
            // return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function changesStatus(payload, id, callback) {
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`admin/notifications/settings/${id}`, { ...payload })
            console.log(result, "resulted")
            if (result.status === 200) {
                toast.success("Notification settings updated", { position: "top-center" })
            }
            dispatch(setDeveloperList(result.data))
            return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function postScheduleMeeting(payload, callback) {
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post("common/create-events", { ...payload })
            console.log(result.data, "getallevents")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            // dispatch(setDeveloperList(result.data))
            return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getToDoById(id, callback) {
    console.log(id, "id")
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`admin/todos/${id}`)
            console.log(result.data, "getallevents")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            // dispatch(setDeveloperList(result.data))
            return callback(result.data?.data?.todo);
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function updateEvent(id, payload) {
    console.log(id, "id")
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.put(`common/update-event/${id}`, { ...payload })
            console.log(result.data, "getallevents")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            // dispatch(setDeveloperList(result.data))
            // return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function deleteEvent(id) {
    console.log(id, "id")
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.delete(`common/events/${id}`)
            console.log(result.data, "getallevents")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            // return callback();
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function getSelectedEvent(id, callback) {
    console.log(id, "id")
    return async (dispatch) => {
        // dispatch(setBtnLoader())
        try {
            let result = await clientInstance.get(`common/get-event/${id}`)
            console.log(result.data, "getSelectecEvent")
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
            }
            return callback(result.data);
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}

export function getMessageTemplate(payload) {
    console.log(payload, "payload")
    return async (dispatch) => {
        dispatch(setBtnLoader())
        try {
            let result = await clientInstance.post(`admin/message-templates`, { ...payload })
            if (result.status === 200) {
                toast.success(result.data?.message, { position: "top-center" })
                dispatch(setSuccessAdminData());
            }
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" })
            dispatch(setFailAdminData())
        }
    }
}
export function filePreassignedUrlGenerate(fileData, callback) {
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.post(`common/upload-file`, fileData);
            dispatch(setSuccessAdminData());
            return callback(result?.data?.data.Location);
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            dispatch(setFailAdminData());
        }
    };
}
export function getAllMessageTemplates() {
    return async (dispatch) => {
        //   dispatch(setSmallLoader());
        try {
            let result = await clientInstance.get("common/message-templates");
            dispatch(setMessageTemplates(result.data));
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}
export function deleteEmailTemplate(id, callback) {
    console.log(id, "id")
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.delete(`admin/message-templates/${id}`);
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}
export function getTemplateById(id, callback) {
    return async (dispatch) => {
        //   dispatch(setSmallLoader());
        try {
            let result = await clientInstance.get(`common/message-templates/${id}`);
            return callback(result.data?.template)
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}
export function editMessageTemplate(id, payload, callback) {
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.put(`admin/message-templates/${id}`, { ...payload });
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}

export function messageSendFunc(payload) {
    console.log(payload, "payyyyyload")
    return async (dispatch) => {
        dispatch(setApprovedLoader());
        try {
            let result = await clientInstance.post(`/messages/send-messages`, { ...payload });
            console.log(result, "result")
            dispatch(setSuccessAdminData())
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            dispatch(setFailAdminData())
        }
    };
}

export function deleteProfleAPi(payload,callback) {
   
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.delete(`/admin/delete-applicant/${payload}`);
            toast.success("Profile is deleted",{ position: "top-center" });
            dispatch(setSuccessAdminData())
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            dispatch(setFailAdminData())
        }
    };
}


export function updateChatRoom(id, payload, callback) {
    console.log(payload, "payload")
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.put(`/messages/update-chatroom/${id}`, { ...payload });
            console.log(result, "res")
            dispatch(setChatRoom(result?.data?.data))
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}
export function getReassign(payload) {
    console.log(payload, "payload")
    return async (dispatch) => {
        dispatch(setSmallLoader());
        try {
            let result = await clientInstance.post("/admin/assign-team-member", payload);
            // console.log(result,"reuskee")
            toast.success("This conversation has been assigned", { position: "top-center" })
            dispatch(setChatRoom(result?.data?.data))
            // return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            // dispatch(setFailClientData());
        }
    };
}

export function suggestDevelopers(payload, callback) {

    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.post(`/admin/suggest-developers`, { ...payload })
            dispatch(setSuccessAdminData())
            toast.success(result?.data?.message ? result.data?.message : result?.message, { position: "top-center" })
            return callback()
        } catch (error) {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message, { position: "top-center" });
            dispatch(setFailAdminData())
        }
    };
}

export function updateStatus(payload, id, callback) {

    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await clientInstance.put(`/common/interviews/${id}/status`, { ...payload });
            dispatch(setSuccessAdminData());
            toast.success(result?.data?.message ? result.data?.message : result?.message, { position: "top-center" })
        } catch (error) {
            console.log(error, "errrrr");
        }
        return callback()
    };
}



