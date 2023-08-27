import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// All Conversations
const allConversations = async (token: string, page: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/support-chat/get-all-conversations?page=${
            page ? page : 1
        }`,
        config
    );
    return data;
};

// user Conversation
const userConversation = async (
    token: string,
    user_id: string | number,
    page: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const { data } = await axios.get(
        `${API_URL}/super-admin/support-chat/get-conversation/${user_id}?page=${
            page ? page : 1
        }`,
        config
    );
    return data;
};

// delete Conversation
const deleteConversation = async (
    token: string,
    conversation_id: string | number
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/support-chat/delete-conversation/${conversation_id}`,
        {},
        config
    );
    return { data, conversation_id };
};

// send Message
const sendMessage = async (
    token: string,
    user_id: string | number,
    formData: FormData
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/support-chat/send-message/${user_id}`,
        formData,
        config
    );
    return data;
};

// delete Message
const deleteMessage = async (token: string, message_id: string | number) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const data = await axios.post(
        `${API_URL}/super-admin/support-chat/delete-message/${message_id}`,
        {},
        config
    );
    return { data, message_id };
};

const supportMessageServices = {
    allConversations,
    userConversation,
    deleteConversation,
    sendMessage,
    deleteMessage,
};

export default supportMessageServices;
