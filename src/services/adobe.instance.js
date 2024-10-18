import axios from "axios";
import { toast } from "react-toastify";
import { getRefreshToken, getToken, updateLocalAccessToken } from "../helper/utlis";
import { E_SIGN_PUBLIC_KEY } from "./urlConfig";

// Base axios instance configuration
const createAxiosInstance = (contentType) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ADOBE_API,
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      config.headers["X-Public-Key"] = E_SIGN_PUBLIC_KEY;
      if (contentType) {
        config.headers["content-type"] = contentType;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken("refreshToken");
          const { data } = await instance.post("auth/refresh-token", { refresh_token: refreshToken });
          const newToken = updateLocalAccessToken("token", data.access_token);
          originalRequest.headers["Authorization"] = `${newToken}`;
          return instance(originalRequest);
        } catch (err) {
          console.error("Error refreshing token:", err);
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create two instances with different content-type
export const adobeInstance = createAxiosInstance();
export const adobeFormInstance = createAxiosInstance("multipart/form-data");