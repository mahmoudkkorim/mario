import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// create agency
const chargeCreateAgency = async (token: string, user_id: number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/charge-agents/store`,
        {
            user_id: user_id,
        },
        config
    );
    return data;
};

// index copy
const chargeIndexCopy = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/charge-agents/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// show copy
const chargeShowCopy = async (token: string, id: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/charge-agents/show/${id}`,
        config
    );
    return data;
};

// admin history
const chargeAdminHistory = async (
    token: string,
    id: string | number,
    page: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/charge-agents/get-admin-history/${id}?page=${
            page ? page : 1
        }`,
        config
    );
    return data;
};

// user history
const chargeUserHistory = async (
    token: string,
    id: string | number,
    page: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/charge-agents/get-users-history/${id}?page=${
            page ? page : 1
        }`,
        config
    );
    return data;
};

// update balance
const chargeUpdateBalance = async (
    token: string,
    id: string | number,
    amount: number,
    type: number
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/charge-agents/update-balance/${id}`,
        { amount, type },
        config
    );
    return data;
};

// delete agency
const chargeDeleteAgency = async (token: string, id: string | number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.delete(
        `${API_URL}/super-admin/charge-agents/delete/${id}`,
        config
    );
    return { data, id };
};

const chargeAgenciesServices = {
    chargeCreateAgency,
    chargeIndexCopy,
    chargeShowCopy,
    chargeAdminHistory,
    chargeUserHistory,
    chargeUpdateBalance,
    chargeDeleteAgency,
};

export default chargeAgenciesServices;
