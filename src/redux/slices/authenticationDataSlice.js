import { createSlice } from '@reduxjs/toolkit';
import authInstance from '../../services/auth.instance';
import { toast } from 'react-toastify';
import clientInstance from '../../services/client.instance';

const initialAuthData = {
    screenLoader: false,
    smallLoader: false,
    otpLoader: false,
    countries: []

}

export const authenticationDataSlice = createSlice({
    name: 'authData',
    initialState: initialAuthData,
    reducers: {

        setScreenLoader: (state, action) => {
            state.smallLoader = true;
        },
        setOtpLoader: (state, action) => {
            state.otpLoader = true;
        },

        setAllCountries: (state, action) => {
            state.smallLoader = false;
            state.countries = action.payload;
        },

        setSuccessAuthData: (state, action) => {
            state.smallLoader = false;
            state.otpLoader = false;
        },

        setFailAuthData: (state, action) => {
            state.smallLoader = false;
            state.otpLoader = false;
        },

    }
})

export const { setScreenLoader, setLoginUserName, setAllCountries, setOtpLoader, setFailAuthData, setSuccessAuthData } = authenticationDataSlice.actions

export default authenticationDataSlice.reducer


const ROLES = {
    CLIENT: 'client',
    DEVELOPER: 'developer',
    ADMIN: 'admin',
    VENDOR: 'vendor'
};

const DASHBOARD_URLS = {
    [ROLES.CLIENT]: '/client/dashboard',
    [ROLES.DEVELOPER]: '/developer/dashboard',
    [ROLES.ADMIN]: '/admin/dashboard',
    [ROLES.VENDOR]: '/vendor-dashboard'
};

const storeUserData = (data) => {
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('role', data.data.role);
    localStorage.setItem('userId', data.data.id);
    localStorage.setItem('roleId', data.roleId);
    localStorage.setItem('permission_role_name', data.permission_role_name);
    localStorage.setItem('userName', data.data.name);
    localStorage.setItem('profile_picture', data.data.profile_picture);
};

const redirectToDashboard = (role) => {
    const url = DASHBOARD_URLS[role];
    if (url) {
        window.location.href = url;
    }
};

export function loginUser(payload, callback) {
    return async (dispatch) => {
        dispatch(setScreenLoader());
        try {
            const result = await authInstance.post('auth/login/', { ...payload });
            console.log(result.data, "loginResponse")
            if (result?.status === 200) {
                dispatch(setSuccessAuthData());
                toast.success(result.data.message, { position: 'top-center' });

                if (result.data.otp_sent) {
                    return callback();
                }

                const { role } = result.data.data;
                storeUserData(result.data);

                if (role in DASHBOARD_URLS) {
                    redirectToDashboard(role);
                }
            }
        } catch (error) {
            const message = error.message || 'Something went wrong';
            if (error?.response?.status === 401) {
                toast.error(error.response.data.message, { position: 'top-center' });
                dispatch(setFailAuthData());
            } else {
                toast.error(message, { position: 'top-center' });
                dispatch(setFailAuthData());
            }
        }
    };
}

export function getVerifyOtp(payload) {
    return async (dispatch) => {
        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post("/auth/verify-otp", { ...payload })
            if (result.status == 200) {
                if (result.data.data.role === "client") {
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role", "client")
                    localStorage.setItem("userId", result.data.data.id)
                    localStorage.setItem("userName", result?.data?.data?.name)
                    localStorage.setItem('roleId', result?.data.roleId);
                    localStorage.setItem('role_name', result?.data.role_name);
                    localStorage.setItem('profile_picture',result?.data?.data?.profile_picture);
                    window.location.href = '/client/dashboard'
                }

                if (result.data.data.role === "developer") {
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role", "developer")
                    localStorage.setItem("userId", result.data.data.id)
                    localStorage.setItem("userName", result?.data?.data?.name)
                    localStorage.setItem('profile_picture',result?.data?.data?.profile_picture);
                    window.location.href = '/developer/dashboard'
                }

                if (result.data.data.role === "admin" || result.data.data.role === "employee") {
                    console.log(result,"reso")
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role", result.data.data.role == "admin" ? "admin" : "employee")
                    localStorage.setItem("userId", result.data.data.id)
                    localStorage.setItem('profile_picture',result?.data?.data?.profile_picture);
                    localStorage.setItem("userName", result?.data?.data?.name)
                    localStorage.setItem('roleId', result?.data.roleId);
                    localStorage.setItem('permission_role_name', result?.data.permission_role_name);
                    window.location.href = `/${ result?.data.permission_role_name}/dashboard`
                }
                if (result.data.data.role === "vendor") {
                    localStorage.setItem("token", result.data.access_token);
                    localStorage.setItem("refreshToken", result.data.refresh_token);
                    localStorage.setItem("role", "vendor")
                    localStorage.setItem("userId", result.data.data.id)
                    localStorage.setItem("userName", result?.data?.data?.name)
                    localStorage.setItem('profile_picture',result?.data?.data?.profile_picture);
                    window.location.href = "/vendor-dashboard"
                }

            }

        } catch (error) {
            console.log(error, "error")
            toast.error(error?.response?.data?.message, { position: "top-center" })
            dispatch(setFailAuthData())
        }
    }
}

export function forgotPassword(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post(`auth/forgot-password`, { ...payload })
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAuthData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }

        }
    };
}

export function resetPassword(payload, callback) {
    return async (dispatch) => {

        dispatch(setScreenLoader())
        try {
            let result = await authInstance.post(`auth/reset-password`, { ...payload })
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAuthData())
                if (result?.data?.data?.role === "developer") {
                    window.location.href = "/developer-login"
                } else if (result?.data?.data?.role === "client") {
                    window.location.href = "/"
                } else {
                    window.location.href = "/admin-login"
                }
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }

        }
    };
}


export function resendOtpDispatch(payload, callback) {
    return async (dispatch) => {

        dispatch(setOtpLoader())
        try {
            let result = await authInstance.post(`auth/resend-otp`, payload)
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setSuccessAuthData())
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }

        }
    };
}

export function getAllCountries() {
    return async (dispatch) => {

        dispatch(setOtpLoader())
        try {
            let result = await clientInstance.get(`web/countries`)
            if (result.status === 200) {
                toast.success(result?.data.message, { position: "top-center" })
                dispatch(setAllCountries(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error?.response?.status === 404) {
                toast.error(error?.response.data.message, { position: "top-center" })
                dispatch(setFailAuthData())
            } else {
                toast.error(message, { position: "top-center" })
                dispatch(setFailAuthData())
            }

        }
    };
}
