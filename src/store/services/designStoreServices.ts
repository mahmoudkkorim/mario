import axios from "axios";

// interfaces
import {
    CreateStoreDesign,
    EditStoreDesign,
    DeleteStoreDesign,
} from "../../interfaces/store/designStore";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All design store
const designStore = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/decorations/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// Sorted and filtered all design store
const sortedFiteredDesignStore = async (
    token: string,
    type: string,
    page: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/decorations/sort?type=${type}&page=${
            page ? page : 1
        }`,
        config
    );

    return data;
};

// specific design store
const specificDesignStore = async (token: string, id: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/decorations/${id}`,
        config
    );
    return data;
};

// create design store
const createDesignStore = async (args: CreateStoreDesign) => {
    const { formData, token } = args;
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/decorations/store`,
        formData,
        config
    );
    return data;
};

// edit design store
const editDesignStore = async (args: EditStoreDesign) => {
    const { formData, token, id } = args;
    console.log(args.id);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/decorations/update/${id}`,
        formData,
        config
    );
    return data;
};

// delte design store
const delteDesignStore = async (args: DeleteStoreDesign) => {
    const { token, id } = args;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.post(
        `${API_URL}/super-admin/decorations/delete/${id}`,
        {},
        config
    );
    return data;
};

// get user design store
const getUserDesignStore = async (token: string, user_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/decorations/get-user/${user_id}`,
        config
    );
    return data;
};

// give design store to user
const giveDesignStoreToUser = async (
    token: string,
    formData: object,
    designStore_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/decorations/give-to-user/${designStore_id}`,
        formData,
        config
    );
    return data;
};

// remove design store from user
const removeDesignStoreFromUser = async (
    token: string,
    formData: object,
    designStore_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/decorations/remove-from-user/${designStore_id}`,
        formData,
        config
    );
    return { data, designStore_id };
};

const designStoreServices = {
    designStore,
    sortedFiteredDesignStore,
    specificDesignStore,
    createDesignStore,
    editDesignStore,
    delteDesignStore,
    getUserDesignStore,
    giveDesignStoreToUser,
    removeDesignStoreFromUser,
};

export default designStoreServices;
