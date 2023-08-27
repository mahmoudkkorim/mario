import axios from "axios";

// interfaces

const API_URL = process.env.REACT_APP_BACKEND_URL;

// all video gifts Genres
const allVideoGiftsGenres = async (token: string, page: number | string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/video-gifts-generes/all?page=${
            page ? page : 1
        }`,
        config
    );
    return data;
};

// specific video gifts Genre
const specificVideoGiftsGenre = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/video-gifts-generes/show/${gift_id}`,
        config
    );
    return data;
};

// create video gifts Genre
const createVideoGiftsGenre = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/video-gifts-generes/store`,
        formData,
        config
    );
    return data;
};

// edit video gifts Genre
const editVideoGiftsGenre = async (
    token: string,
    formData: FormData,
    gift_id: string
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/video-gifts-generes/update/${gift_id}`,
        formData,
        config
    );
    return { data, formData };
};

// delete video gifts Genre
const deleteVideoGiftsGenre = async (token: string, gift_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = await axios.delete(
        `${API_URL}/super-admin/video-gifts-generes/delete/${gift_id}`,
        config
    );
    return data;
};

const videoGiftsGenresServices = {
    allVideoGiftsGenres,
    specificVideoGiftsGenre,
    createVideoGiftsGenre,
    editVideoGiftsGenre,
    deleteVideoGiftsGenre,
};

export default videoGiftsGenresServices;
