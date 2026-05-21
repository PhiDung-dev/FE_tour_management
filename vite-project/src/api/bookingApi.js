// src/api/bookingApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/bookings";

// CREATE
export const createBooking = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readBookings = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readBooking = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

// UPDATE
export const updateBooking = async (id, data) => {

    const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
}

// DELETE
export const deleteBooking = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}