import axios from "axios";

// interfaces

const API_URL = process.env.REACT_APP_BACKEND_URL;

// all video gifts
const allVideoGifts = async (token: string, page: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/video-gifts/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific video gift
const specifcVideoGift = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/video-gifts/show/${gift_id}`,
        config
    );
    return data;
};

// normal video gifts
const normalVideoGifts = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/video-gifts/normal`,
        config
    );
    return data;
};

// create video gift
const createVideoGift = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/video-gifts/store`,
        formData,
        config
    );
    return data;
};

// edit video gift
const editVideoGift = async (
    token: string,
    formData: object,
    gift_id: string
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/video-gifts/update/${gift_id}`,
        formData,
        config
    );
    return data;
};

// delete video gift
const deleteVideoGift = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = await axios.delete(
        `${API_URL}/super-admin/video-gifts/delete/${gift_id}`,
        config
    );
    return data;
};

const videoGiftsServices = {
    allVideoGifts,
    specifcVideoGift,
    normalVideoGifts,
    createVideoGift,
    editVideoGift,
    deleteVideoGift,
};

export default videoGiftsServices;
