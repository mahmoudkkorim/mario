import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// create audio target
const createAudioTarget = async (token: string, formData: Object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/hosting-agency-targets/store`,
        formData,
        config
    );

    return data;
};

// update audio target
const updateAudioTarget = async (
    token: string,
    target_id: string,
    formData: FormData
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.put(
        `${API_URL}/super-admin/hosting-agency-targets/update/${target_id}`,
        formData,
        config
    );

    return { data, formData };
};

// all audio targets
const allAudioTargets = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency-targets/all`,
        config
    );

    return data;
};

// specifc audio target
const specificAudioTarget = async (token: string, target_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency-targets/show/${target_id}`,
        config
    );

    return data;
};

const audioTarget_hostingAgenciesServices = {
    createAudioTarget,
    updateAudioTarget,
    allAudioTargets,
    specificAudioTarget,
};

export default audioTarget_hostingAgenciesServices;
