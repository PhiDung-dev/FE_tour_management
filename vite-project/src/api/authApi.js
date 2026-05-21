// src/api/authApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/auth";

// LOGIN
export const login = async (data) => {

    const response = await axiosClient.post(
        `${BASE_URL}/login`,
        data
    );

    return response.data;
}

// INTROSPECT
export const introspect = async (data) => {

    const response = await axiosClient.post(
        `${BASE_URL}/introspect`,
        data
    );

    return response.data;
}