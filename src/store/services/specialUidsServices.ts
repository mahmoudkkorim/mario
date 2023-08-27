import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All special uids
const allSpecialUids = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/special-uids/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific special uid
const specificSpecialUid = async (token: string, uid: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/special-uids/${uid}`,
        config
    );
    return data;
};

// create special uid
const createSpecialUid = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/special-uids/store`,
        formData,
        config
    );
    return data;
};

// update special uid
const editSpecialUid = async (
    token: string,
    formData: FormData,
    specialUid_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/special-uids/update/${specialUid_id}`,
        formData,
        config
    );
    return { data, formData };
};

// delete special uid
const deleteSpecialUid = async (
    token: string,
    specialUid_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/special-uids/delete/${specialUid_id}`,
        {},
        config
    );
    return { data, specialUid_id };
};

// give special uid to user
const giveSpecialUidToUser = async (
    token: string,
    formData: FormData,
    specialUid_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/special-uids/give-to-user/${specialUid_id}`,
        formData,
        config
    );
    return data;
};

// remove special uid from user
const removeSpecialUidFromUser = async (
    token: string,
    user_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/special-uids/remove-from-user/${user_id}`,
        {},
        config
    );
    return data;
};

const specialUidsServices = {
    allSpecialUids,
    specificSpecialUid,
    createSpecialUid,
    editSpecialUid,
    deleteSpecialUid,
    giveSpecialUidToUser,
    removeSpecialUidFromUser,
};

export default specialUidsServices;
