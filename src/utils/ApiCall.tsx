/* eslint-disable linebreak-style */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.nhmdashboard.in/api/", // Replace with your API base URL
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data", // Required for file uploads

    // You can add other headers like Authorization token if needed
  },
});

// Axios interceptor to add authorization token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: fetch token from local storage
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Reusable functions for GET, POST, DELETE requests
export const axiosGet = (url: string) => axiosInstance.get(url);
export const axiosPost = (url: string, data: any) =>
  axiosInstance.post(url, data);
export const axiosDelete = (url: string) => axiosInstance.delete(url);
