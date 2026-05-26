// src/api/favoriteTourApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/favoriteTours";

// CREATE
export const createFavoriteTour = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readFavoriteTours = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readFavoriteTour = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

export const readFavoriteToursByUserId = async (userId) => {

    const response = await axiosClient.get(
        `${BASE_URL}/user/${userId}`
    );

    return response.data;
}

// DELETE
export const deleteFavoriteTour = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}