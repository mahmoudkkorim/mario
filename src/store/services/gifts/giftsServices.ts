import axios from "axios";

// interfaces

const API_URL = process.env.REACT_APP_BACKEND_URL;

// all gifts
const allGifts = async (token: string, page: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/gifts/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specfic gift
const specificGift = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/gifts/show/${gift_id}`,
        config
    );
    return data;
};

// create gift
const createGift = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/gifts/store`,
        formData,
        config
    );
    return data;
};

// edit gift
const eidtGift = async (token: string, gift_id: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/gifts/update/${gift_id}`,
        formData,
        config
    );
    return data;
};

// delete gift
const deleteGift = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": " application/json",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/gifts/delete/${gift_id}`,
        {},
        config
    );
    return data;
};

const giftsServices = {
    allGifts,
    specificGift,
    createGift,
    eidtGift,
    deleteGift,
};

export default giftsServices;
