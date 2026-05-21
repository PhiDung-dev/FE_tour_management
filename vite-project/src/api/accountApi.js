// src/api/accountApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/accounts";

// CREATE
export const createAccount = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readAccounts = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readAccount = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

// UPDATE
export const updateAccount = async (id, data) => {

    const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
}

// DELETE
export const deleteAccount = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}