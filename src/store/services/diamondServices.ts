import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All diamond packages
const allDiamondPackages = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/diamond/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specific diamond package
const specificDiamondPackage = async (token: string, diamond_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/diamond/${diamond_id}`,
        config
    );
    return data;
};

// create diamond package
const createDiamondPackage = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/diamond/store`,
        formData,
        config
    );
    return data;
};

// edit diamond package
const editDiamondPackage = async (
    token: string,
    formData: FormData,
    diamond_id: string
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/diamond/update/${diamond_id}`,
        formData,
        config
    );
    return { data, formData, diamond_id };
};

// delete diamond packages
const deleteDiamondPackage = async (token: string, diamond_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/diamond/delete/${diamond_id}`,
        {},
        config
    );
    return data;
};

// charge user balance
const chargeUserBalance = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/diamond/give-to-user`,
        formData,
        config
    );
    return data;
};

// roll back from user
const rollBackFromUser = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/diamond/remove-from-user`,
        formData,
        config
    );

    return data;
};

const diamondServices = {
    allDiamondPackages,
    specificDiamondPackage,
    createDiamondPackage,
    editDiamondPackage,
    deleteDiamondPackage,
    chargeUserBalance,
    rollBackFromUser,
};

export default diamondServices;
