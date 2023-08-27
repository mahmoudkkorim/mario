import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All Rooms
const allRooms = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/room-backgrounds/all?page=${page ? page : 1}`,
        config
    );
    return data;
};

// Specfic Room
const specificRoom = async (token: string, room_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/room-backgrounds/${room_id}`,
        config
    );
    return data;
};

// Create Room
const createRoom = async (token: string, formData: object) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/room-backgrounds/store`,
        formData,
        config
    );
    return data;
};

// Edit Room
const editRoom = async (token: string, formData: object, room_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/room-backgrounds/update/${room_id}`,
        formData,
        config
    );
    return data;
};

// delete Room
const deleteRoom = async (token: string, room_id: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/room-backgrounds/delete/${room_id}`,
        {},
        config
    );
    return data;
};

const roomsServices = {
    allRooms,
    specificRoom,
    createRoom,
    editRoom,
    deleteRoom,
};

export default roomsServices;
