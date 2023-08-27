import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import emojiServices from "../services/emojisServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialEmojisState,
    AllEmojisData,
    createEmojiData,
    deleteEmojiData,
    editEmojiData,
    specificEmojiData,
} from "../../interfaces/store/emoji";

const initialState: InitialEmojisState = {
    // AllEmojis
    allEmojisLoading: false,
    allEmojisError: null,
    allEmojisData: null,
    // specific Emoji
    specificEmojiLoading: false,
    specificEmojiError: null,
    specificEmojiData: null,
    // create Emoji
    createEmojiLoading: false,
    createEmojiError: null,
    createEmojiData: null,
    // edit Emoji
    editEmojiLoading: false,
    editEmojiError: null,
    editEmojiData: null,
    // delete Emoji
    deleteEmojiLoading: false,
    deleteEmojiError: null,
    deleteEmojiData: null,
};

// AllEmojis
export const allEmojis = createAsyncThunk(
    "/super-admin/emojis/all",
    async (args: AllEmojisData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await emojiServices.allEmojis(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specific Emoji
export const specificEmoji = createAsyncThunk(
    "/super-admin/emojis/id",
    async (args: specificEmojiData, thunkAPI) => {
        try {
            const { emoji_id, token } = args;
            return await emojiServices.specificEmoji(token, emoji_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create Emoji
export const createEmoji = createAsyncThunk(
    "/super-admin/emojis/store",
    async (args: createEmojiData, thunkAPI) => {
        try {
            const { formData, token } = args;
            return await emojiServices.createEmoji(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit Emoji
export const editEmoji = createAsyncThunk(
    "/super-admin/emojis/update/id",
    async (args: editEmojiData, thunkAPI) => {
        try {
            const { formData, token, emoji_id } = args;
            return await emojiServices.editEmoji(token, emoji_id, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete Emoji
export const deleteEmoji = createAsyncThunk(
    "/super-admin/emojis/delete/id",
    async (args: deleteEmojiData, thunkAPI) => {
        try {
            const { token, emoji_id } = args;
            return await emojiServices.deleteEmoji(token, emoji_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const emojisSlice = createSlice({
    name: "emojis",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateEmoji: (state) => ({
            ...state,
            editEmojiData: null,
            createEmojiData: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All Emojis
            .addCase(allEmojis.pending, (state) => {
                state.allEmojisLoading = true;
            })
            .addCase(allEmojis.fulfilled, (state, action) => {
                state.allEmojisLoading = false;
                const { data } = action.payload;
                state.allEmojisData = data;
            })
            .addCase(allEmojis.rejected, (state, action) => {
                state.allEmojisLoading = false;
                state.allEmojisError = action.payload;
            })
            // Specific Emoji
            .addCase(specificEmoji.pending, (state) => {
                state.specificEmojiLoading = true;
            })
            .addCase(specificEmoji.fulfilled, (state, action) => {
                state.specificEmojiLoading = false;
                const { data } = action.payload;
                state.specificEmojiData = data;
            })
            .addCase(specificEmoji.rejected, (state, action) => {
                state.specificEmojiLoading = false;
                state.specificEmojiError = action.payload;
            })
            // create Emoji
            .addCase(createEmoji.pending, (state) => {
                state.createEmojiLoading = true;
            })
            .addCase(createEmoji.fulfilled, (state, action) => {
                state.createEmojiLoading = false;
                const { data } = action.payload;
                state.createEmojiData = data;
            })
            .addCase(createEmoji.rejected, (state, action) => {
                state.createEmojiLoading = false;
                state.createEmojiError = action.payload;
            })
            // edit Emoji
            .addCase(editEmoji.pending, (state) => {
                state.editEmojiLoading = true;
            })
            .addCase(editEmoji.fulfilled, (state, action) => {
                state.editEmojiLoading = false;
                const { data } = action.payload;
                state.editEmojiData = data;
            })
            .addCase(editEmoji.rejected, (state, action) => {
                state.editEmojiLoading = false;
                state.editEmojiError = action.payload;
            })
            // delete Emoji
            .addCase(deleteEmoji.pending, (state) => {
                state.deleteEmojiLoading = true;
            })
            .addCase(deleteEmoji.fulfilled, (state, action) => {
                state.deleteEmojiLoading = false;
                const { data } = action.payload;
                state.deleteEmojiData = data;
            })
            .addCase(deleteEmoji.rejected, (state, action) => {
                state.deleteEmojiLoading = false;
                state.deleteEmojiError = action.payload;
            });
    },
});

export const { reset, resetEditCreateEmoji } = emojisSlice.actions;
export default emojisSlice.reducer;
