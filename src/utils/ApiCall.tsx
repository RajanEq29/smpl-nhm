/* eslint-disable linebreak-style */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.nhmdashboard.in/api/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // Default Content-Type
  },
});

// Axios interceptor to add authorization token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token); // Example: fetch token from local storage
    if (token) {
      config.headers.Authorization = `${token}`; // Usually, you prefix the token with 'Bearer'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to determine Content-Type dynamically
const getContentType = (data: any) => {
  return data instanceof FormData ? "multipart/form-data" : "application/json";
};

// Reusable functions for GET, POST, DELETE requests
export const axiosGet = (url: string) => axiosInstance.get(url);

export const axiosPost = (url: string, data: any) => {
  return axiosInstance.post(url, data, {
    headers: {
      "Content-Type": getContentType(data),
    },
  });
};

export const axiosDelete = (url: string) => axiosInstance.delete(url);
