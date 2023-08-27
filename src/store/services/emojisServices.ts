import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All Emojis
const allEmojis = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/emojis/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific Emoji
const specificEmoji = async (token: string, emoji_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/emojis/${emoji_id}`,
        config
    );
    return data;
};

// create Emoji
const createEmoji = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/emojis/store`,
        formData,
        config
    );
    return data;
};

// edit Emoji
const editEmoji = async (token: string, emoji_id: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/emojis/update/${emoji_id}`,
        formData,
        config
    );
    return data;
};

// delete Emoji
const deleteEmoji = async (token: string, emoji_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/emojis/delete/${emoji_id}`,
        {},
        config
    );
    return data;
};

const emojiServices = {
    allEmojis,
    specificEmoji,
    createEmoji,
    editEmoji,
    deleteEmoji,
};

export default emojiServices;
