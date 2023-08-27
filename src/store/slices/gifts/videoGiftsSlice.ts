import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import videoGiftsServices from "../../services/gifts/videoGiftsServices";

// interfaces
import {
    InitialVideoGiftsState,
    AllvideoGiftsData,
    specficVideoGiftsData,
    createVideoGiftsData,
    editVideoGiftsData,
    deleteVideoGiftsData,
    NormalVideoGiftsData,
} from "../../../interfaces/store/gifts/videoGifts";
import { Error } from "../../../interfaces/public";

const initialState: InitialVideoGiftsState = {
    // all video gifts
    allVideoGiftsLoading: false,
    allVideoGiftsError: null,
    allVideoGiftsData: null,
    // specific video gift
    specificVideoGiftLoading: false,
    specificVideoGiftError: null,
    specificVideoGiftData: null,
    // normal video gifts
    normalVideoGifstLoading: false,
    normalVideoGifstError: null,
    normalVideoGifstData: null,
    // create gift
    createVideoGiftLoading: false,
    createVideoGiftError: null,
    createVideoGiftData: null,
    // edit gift
    editVideoGiftLoading: false,
    editVideoGiftError: null,
    editVideoGiftData: null,
    // delete gift
    deleteVideoGiftLoading: false,
    deleteVideoGiftError: null,
    deleteVideoGiftData: null,
};

// all video gifts
export const getAllVidoGifts = createAsyncThunk(
    "/super-admin/video-gifts/all",
    async (args: AllvideoGiftsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await videoGiftsServices.allVideoGifts(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specific video gift
export const specifcVideoGift = createAsyncThunk(
    "/super-admin/video-gifts/show/id",
    async (args: specficVideoGiftsData, thunkAPI) => {
        try {
            const { gift_id, token } = args;
            return await videoGiftsServices.specifcVideoGift(token, gift_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// normal video gifts
export const normalVideoGifts = createAsyncThunk(
    "/super-admin/video-gifts/normal",
    async (args: NormalVideoGiftsData, thunkAPI) => {
        try {
            const { token } = args;
            return await videoGiftsServices.normalVideoGifts(token);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create video gift
export const createVideoGift = createAsyncThunk(
    "/super-admin/video-gifts/store",
    async (args: createVideoGiftsData, thunkAPI) => {
        try {
            const { giftData, token } = args;
            return await videoGiftsServices.createVideoGift(token, giftData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit video gift
export const editVideoGift = createAsyncThunk(
    "/super-admin/video-gifts/update/id",
    async (args: editVideoGiftsData, thunkAPI) => {
        try {
            const { giftData, token, gift_id } = args;
            return await videoGiftsServices.editVideoGift(
                token,
                giftData,
                gift_id
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

// delete video gift
export const deleteVideoGift = createAsyncThunk(
    "/super-admin/video-gifts/delete/id",
    async (args: deleteVideoGiftsData, thunkAPI) => {
        try {
            const { token, gift_id } = args;
            return await videoGiftsServices.deleteVideoGift(token, gift_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const videoGiftsSlice = createSlice({
    name: "video_gifts",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateVideoGiftData: (state) => ({
            ...state,
            editVideoGiftData: null,
            createVideoGiftData: null,
        }),
        resetEditCreateVideoGiftError: (state) => ({
            ...state,
            editVideoGiftError: null,
            createVideoGiftError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // all video gifts
            .addCase(getAllVidoGifts.pending, (state) => {
                state.allVideoGiftsLoading = true;
            })
            .addCase(getAllVidoGifts.fulfilled, (state, action) => {
                state.allVideoGiftsLoading = false;
                const { data } = action.payload;
                state.allVideoGiftsData = data;
            })
            .addCase(getAllVidoGifts.rejected, (state, action) => {
                state.allVideoGiftsLoading = false;
                state.allVideoGiftsError = action.payload;
            })
            // specific video gift
            .addCase(specifcVideoGift.pending, (state) => {
                state.specificVideoGiftLoading = true;
            })
            .addCase(specifcVideoGift.fulfilled, (state, action) => {
                state.specificVideoGiftLoading = false;
                const { data } = action.payload;
                state.specificVideoGiftData = data;
            })
            .addCase(specifcVideoGift.rejected, (state, action) => {
                state.specificVideoGiftLoading = false;
                state.specificVideoGiftError = action.payload;
            })
            // normal video gift
            .addCase(normalVideoGifts.pending, (state) => {
                state.normalVideoGifstLoading = true;
            })
            .addCase(normalVideoGifts.fulfilled, (state, action) => {
                state.normalVideoGifstLoading = false;
                const { data } = action.payload;
                state.normalVideoGifstData = data;
            })
            .addCase(normalVideoGifts.rejected, (state, action) => {
                state.normalVideoGifstLoading = false;
                state.normalVideoGifstError = action.payload;
            })
            // create video gift
            .addCase(createVideoGift.pending, (state) => {
                state.createVideoGiftLoading = true;
            })
            .addCase(createVideoGift.fulfilled, (state, action) => {
                state.createVideoGiftLoading = false;
                const { data } = action.payload;
                state.createVideoGiftData = data;
            })
            .addCase(createVideoGift.rejected, (state, action) => {
                state.createVideoGiftLoading = false;
                state.createVideoGiftError = action.payload;
            })
            // edit video gift
            .addCase(editVideoGift.pending, (state) => {
                state.editVideoGiftLoading = true;
            })
            .addCase(editVideoGift.fulfilled, (state, action) => {
                state.editVideoGiftLoading = false;
                const { data } = action.payload;
                state.editVideoGiftData = data;
            })
            .addCase(editVideoGift.rejected, (state, action) => {
                state.editVideoGiftLoading = false;
                state.editVideoGiftError = action.payload;
            })
            // delete video gift
            .addCase(deleteVideoGift.pending, (state) => {
                state.deleteVideoGiftLoading = true;
            })
            .addCase(deleteVideoGift.fulfilled, (state, action) => {
                state.deleteVideoGiftLoading = false;
                const { data } = action.payload;
                state.deleteVideoGiftData = data;

                // make sure to remove specifc video gift
                state.specificVideoGiftData = null;
            })
            .addCase(deleteVideoGift.rejected, (state, action) => {
                state.deleteVideoGiftLoading = false;
                state.deleteVideoGiftError = action.payload;
            });
    },
});

export const {
    reset,
    resetEditCreateVideoGiftData,
    resetEditCreateVideoGiftError,
} = videoGiftsSlice.actions;
export default videoGiftsSlice.reducer;
