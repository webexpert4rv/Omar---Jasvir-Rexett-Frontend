import axios from "axios";
import { toast } from "react-toastify";
import { getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";


const adobeInstance = axios.create({
  baseURL: process.env.REACT_APP_ADOBE_API,
});

// Request Interceptor
adobeInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getToken("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Response Interceptor
adobeInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("refreshToken");
        const response = await adobeInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("token",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return adobeInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }

    }
    return Promise.reject(error);
  }

);

export default adobeInstance;

