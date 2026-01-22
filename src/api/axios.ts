import axios from "axios";
import { apiBaseUrl } from "./rootUrls";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status ?? 500;
    return Promise.reject({
      status,
      message:
        (error?.status === 0 || error?.code === "OFFLINE" || error?.code === "NETWORK_ERROR")
          ? "You aren't connected to the internet. Please connect and try again."
          :
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      details: error.response?.data || null,
    });
  }
);

export default axiosInstance;
