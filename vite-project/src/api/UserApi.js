// src/api/userApi.js

import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:8080/users";

// CREATE
export const createUser = async (data) => {

    const response = await axiosClient.post(
        BASE_URL,
        data
    );

    return response.data;
}

// READ ALL
export const readUsers = async () => {

    const response = await axiosClient.get(
        BASE_URL
    );

    return response.data;
}

// READ ONE
export const readUser = async (id) => {

    const response = await axiosClient.get(
        `${BASE_URL}/${id}`
    );

    return response.data;
}

export const readUserByAccountId = async (accountId) => {
  const response = await axiosClient.get(
    `/users/account/${accountId}`
  );

  return response.data;
};

// UPDATE
export const updateUser = async (id, data) => {

    const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        data
    );

    return response.data;
}

// DELETE
export const deleteUser = async (id) => {

    const response = await axiosClient.delete(
        `${BASE_URL}/${id}`
    );

    return response.data;
}