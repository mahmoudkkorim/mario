import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// create agency
const createHostingAgency = async (token: string, formData: Object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/hosting-agency/store`,
        formData,
        config
    );

    return data;
};

// all hosting agency
const AllhostingAgencies = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// specifc hosting agency
const specifcHostingAgency = async (token: string, id: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency/show/${id}`,
        config
    );
    return data;
};

// update hosting agency
const updateHostingAgency = async (
    token: string,
    id: string | number,
    formData: Object
) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/hosting-agency/update/${id}`,
        formData,
        config
    );
    return data;
};

// delete hosting agency
const deleteHostingAgency = async (token: string, id: string | number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.delete(
        `${API_URL}/super-admin/hosting-agency/delete/${id}`,
        config
    );
    return { data, id };
};

const hostingAgenciesServices = {
    createHostingAgency,
    AllhostingAgencies,
    specifcHostingAgency,
    updateHostingAgency,
    deleteHostingAgency,
};

export default hostingAgenciesServices;
