import axios from "axios";

// interfaces

const API_URL = process.env.REACT_APP_BACKEND_URL;

// all users
const allUsers = async (token: string, page: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/users/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific user
const specificUser = async (token: string, userId: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/users/${userId}`,
        config
    );
    return data;
};

// edit user
const editUser = async (
    token: string,
    userId: string | number,
    formData: Object
) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/users/update/${userId}`,
        formData,
        config
    );
    return data;
};

// delete user
const deleteUser = async (token: string, userId: string | number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/users/delete/${userId}`,
        {},
        config
    );
    return data;
};

// block user
const blockUser = async (
    token: string,
    userId: string | number,
    formData: Object
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/users/block/${userId}`,
        { ...formData },
        config
    );
    return data;
};

// unblock user
const unblockUser = async (token: string, userId: string | number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/users/unblock/${userId}`,
        {},
        config
    );
    return data;
};

// user id by uid
const usersIdByUid = async (token: string, uid: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/users/search?uid=${uid}`,
        config
    );
    return data;
};

const usersServices = {
    allUsers,
    specificUser,
    editUser,
    deleteUser,
    blockUser,
    unblockUser,
    usersIdByUid
};

export default usersServices;
