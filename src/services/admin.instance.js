import axios from "axios";
import { toast } from "react-toastify";
import {getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";


const adminInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

});

// Request Interceptor
adminInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =  `${getToken("adminToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
adminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("adminRefreshToken");
        const response = await adminInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("adminToken",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return adminInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }

    }
    return Promise.reject(error);
  }

);

export default adminInstance;

