// src/api/scheduleApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/schedules";

// CREATE
export const createSchedule = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readSchedules = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readSchedule = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

// UPDATE
export const updateSchedule = async (id, data) => {

    const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
}

// DELETE
export const deleteSchedule = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}