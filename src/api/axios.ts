import axios from "axios";
import { apiBaseUrl } from "./rootUrls";
import { notifySessionExpired } from "./authSessionEvents";
import { APIError } from "./types";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
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
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status ?? 500;
    const responseMessage = error.response?.data?.message;
    const apiError: APIError = {
      status,
      message:
        error?.status === 0 ||
        error?.code === "OFFLINE" ||
        error?.code === "NETWORK_ERROR"
          ? "You aren't connected to the internet. Please connect and try again."
          : responseMessage || error.message || "Something went wrong",
      details: error.response?.data || null,
    };

    if (status === 401) {
      notifySessionExpired(apiError);
    }

    return Promise.reject(apiError);
  },
);

export default axiosInstance;
