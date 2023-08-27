import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import supportMessageServices from "../services/SupportChatServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialSupportChatState,
    AllConversationsData,
    DeleteConversationData,
    DeleteMessageData,
    SendMessageData,
    UserConversationData,
} from "../../interfaces/store/supportChat";

const initialState: InitialSupportChatState = {
    // all Conversations
    allConversationsLoading: false,
    allConversationsError: null,
    allConversationsData: null,
    // user Conversation
    userConversationLoading: false,
    userConversationError: null,
    userConversationData: null,
    // delete Conversation
    deleteConversationLoading: false,
    deleteConversationError: null,
    deleteConversationData: null,
    // send Conversation
    sendMessageLoading: false,
    sendMessageError: null,
    sendMessageData: null,
    // delete Conversation
    deleteMessageLoading: false,
    deleteMessageError: null,
    deleteMessageData: null,
};

// All Conversations
export const allConversations = createAsyncThunk(
    "/super-admin/support-chat/get-all-conversations",
    async (args: AllConversationsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await supportMessageServices.allConversations(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// user Conversation
export const userConversation = createAsyncThunk(
    "/super-admin/support-chat/get-conversation/id",
    async (args: UserConversationData, thunkAPI) => {
        try {
            const { user_id, token, page } = args;
            return await supportMessageServices.userConversation(
                token,
                user_id,
                page
            );
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete Conversation
export const deleteConversation = createAsyncThunk(
    "/super-admin/support-chat/delete-conversation/id",
    async (args: DeleteConversationData, thunkAPI) => {
        try {
            const { conversation_id, token } = args;
            return await supportMessageServices.deleteConversation(
                token,
                conversation_id
            );
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// send Message
export const sendMessage = createAsyncThunk(
    "/super-admin/support-chat/send-message/id",
    async (args: SendMessageData, thunkAPI) => {
        try {
            const { formData, user_id, token } = args;
            return await supportMessageServices.sendMessage(
                token,
                user_id,
                formData
            );
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete Message
export const deleteMessage = createAsyncThunk(
    "/super-admin/support-chat/delete-message/id",
    async (args: DeleteMessageData, thunkAPI) => {
        try {
            const { token, message_id } = args;
            return await supportMessageServices.deleteMessage(
                token,
                message_id
            );
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const supportChatSlice = createSlice({
    name: "supportChat",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetSendMessageData: (state) => ({
            ...state,
            sendMessageData: null,
        }),
        resetSendMessageError: (state) => ({
            ...state,
            sendMessageError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All Conversations
            .addCase(allConversations.pending, (state) => {
                state.allConversationsLoading = true;
            })
            .addCase(allConversations.fulfilled, (state, action) => {
                state.allConversationsLoading = false;
                const { data } = action.payload;
                state.allConversationsData = data;
            })
            .addCase(allConversations.rejected, (state, action) => {
                state.allConversationsLoading = false;
                state.allConversationsError = action.payload;
            })
            // user Conversation
            .addCase(userConversation.pending, (state) => {
                state.userConversationLoading = true;
            })
            .addCase(userConversation.fulfilled, (state, action) => {
                state.userConversationLoading = false;
                const { data } = action.payload;
                state.userConversationData = data;
            })
            .addCase(userConversation.rejected, (state, action) => {
                state.userConversationLoading = false;
                state.userConversationError = action.payload;
            })
            // delete Conversation
            .addCase(deleteConversation.pending, (state) => {
                state.deleteConversationLoading = true;
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                state.deleteConversationLoading = false;
                const { data, conversation_id } = action.payload;
                state.deleteConversationData = data;

                // userConversationData
                state.userConversationData = null;

                const currentState: InitialSupportChatState = current(state);

                const newData = [
                    ...currentState.allConversationsData?.data!,
                ].filter((one) => one.id !== +conversation_id);

                const newAllConversationsData = {
                    ...currentState.allConversationsData,
                    data: newData,
                };
                // @ts-ignore
                state.allConversationsData = newAllConversationsData;
            })
            .addCase(deleteConversation.rejected, (state, action) => {
                state.deleteConversationLoading = false;
                state.deleteConversationError = action.payload;
            })
            // send Message
            .addCase(sendMessage.pending, (state) => {
                state.sendMessageLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendMessageLoading = false;
                const { data } = action.payload;
                state.sendMessageData = data;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sendMessageLoading = false;
                state.sendMessageError = action.payload;
            })
            // delete Message
            .addCase(deleteMessage.pending, (state) => {
                state.deleteMessageLoading = true;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.deleteMessageLoading = false;
                const { data, message_id } = action.payload;
                state.deleteMessageData = data;

                // userConversationData
                const currentState: InitialSupportChatState = current(state);

                const newData = [
                    ...currentState.userConversationData?.messages.data!,
                ].filter((one) => one.id !== +message_id);

                const newuserConversationData = {
                    conversation: {
                        ...currentState.userConversationData?.conversation,
                    },
                    messages: {
                        ...currentState.userConversationData?.messages,
                        data: newData,
                    },
                };

                // @ts-ignore
                state.userConversationData = newuserConversationData;
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.deleteMessageLoading = false;
                state.deleteMessageError = action.payload;
            });
    },
});

export const { reset, resetSendMessageData, resetSendMessageError } =
    supportChatSlice.actions;
export default supportChatSlice.reducer;
