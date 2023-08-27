import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All banners
const allBanners = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/banners/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific banner
const specificBanner = async (token: string, banner_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/banners/show/${banner_id}`,
        config
    );
    return data;
};

// create banner
const createBanner = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/banners/store`,
        formData,
        config
    );
    return data;
};

// edit banner
const editBanner = async (
    token: string,
    formData: FormData,
    banner_id: string
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/banners/update/${banner_id}`,
        formData,
        config
    );
    return data;
};

// delete banner
const deleteBanner = async (token: string, diamond_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.delete(
        `${API_URL}/super-admin/banners/delete/${diamond_id}`,
        config
    );

    return data;
};

// active banners
const activeBanners = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/banners/active?page=${page ? page : 1}`,
        config
    );
    return data;
};

const bannersServices = {
    allBanners,
    specificBanner,
    createBanner,
    editBanner,
    deleteBanner,
    activeBanners,
};

export default bannersServices;
