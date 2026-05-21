// src/api/paymentApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/payments";

// CREATE
export const createPayment = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readPayments = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readPayment = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

// UPDATE
export const updatePayment = async (id, data) => {

    const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
}

// DELETE
export const deletePayment = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}