import axios from "axios";
import { toast } from "react-toastify";
import {getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";



const developerInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

});

// Request Interceptor
developerInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =  `${getToken("developerToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
developerInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("developerRefreshToken");
        console.log(refreshToken,"refreshToken")
        const response = await developerInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("developerToken",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return developerInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }

    }
    return Promise.reject(error);
  }

);

export default developerInstance;

