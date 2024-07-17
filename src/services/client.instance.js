import axios from "axios";
import { toast } from "react-toastify";
import { getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";


const clientInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
export const clientFormInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

});

// Request Interceptor
clientInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getToken("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientFormInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getToken("token")}`;
    config.headers["content-type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
clientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("refreshToken");
        const response = await clientInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("token",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return clientInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }

    }
    return Promise.reject(error);
  }

);

export default clientInstance;

