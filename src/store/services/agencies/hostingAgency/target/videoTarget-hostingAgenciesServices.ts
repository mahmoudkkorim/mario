import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// create video target
const createVideoTarget = async (token: string, formData: Object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/hosting-agency-video-targets/store`,
        formData,
        config
    );

    return data;
};

// update video target
const updateVideoTarget = async (
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
        `${API_URL}/super-admin/hosting-agency-video-targets/update/${target_id}`,
        formData,
        config
    );

    return { data, formData };
};

// all video targets
const allVideoTargets = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency-video-targets/all`,
        config
    );

    return data;
};

// specifc video target
const specifcVideoTarget = async (token: string, target_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/hosting-agency-video-targets/show/${target_id}`,
        config
    );

    return data;
};

const VideoTarget_hostingAgenciesServices = {
    createVideoTarget,
    updateVideoTarget,
    allVideoTargets,
    specifcVideoTarget,
};

export default VideoTarget_hostingAgenciesServices;
