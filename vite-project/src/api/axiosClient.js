// src/api/axiosClient.js

import axios from "axios";

const axiosClient = axios.create({

    baseURL: "http://localhost:8080",

    headers: {
        "Content-Type": "application/json"
    }
});


// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 403) {
      window.location.href = "/403";
    }

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;