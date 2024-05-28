import axios from "axios";
import { toast } from "react-toastify";
import {getCurrentRole, getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";

const commanInstance = axios.create({
  baseURL: process.env.FRONTEND_URL,
});

// Request Interceptor
commanInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getCurrentRole()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
commanInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("developerRefreshToken");
        const response = await commanInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("developerToken",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return commanInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }
    }
    if(error.response.status === 403){
        window.location.href="/"
    }
    return Promise.reject(error);
  }

);

export default commanInstance;

