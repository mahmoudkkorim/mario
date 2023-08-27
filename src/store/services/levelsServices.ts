import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All Levels
const allLevels = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/levels/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific Level
const specificLevel = async (token: string, level_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/levels/${level_id}`,
        config
    );
    return data;
};

// Change User's Level
const changeUserLevel = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/levels/change-user-level`,
        formData,
        config
    );
    return data;
};

// update Level
const updateLevel = async (
    token: string,
    level_id: string,
    formData: FormData
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/levels/update/${level_id}`,
        formData,
        config
    );
    return { data, formData };
};

const levelsServices = {
    allLevels,
    specificLevel,
    changeUserLevel,
    updateLevel,
};

export default levelsServices;
