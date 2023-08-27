import axios from "axios";

// interfaces
import { LoginFormData } from "../../interfaces/store/auth";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Login
const login = async (formData: LoginFormData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/auth`,
        formData,
        config
    );
    return data;
};

// Logout
const logout = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/logout`,
        {},
        config
    );
    return data;
};

// me
const me = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(`${API_URL}/super-admin/me`, {}, config);
    return data;
};

const authServices = {
    login,
    logout,
    me,
};

export default authServices;
