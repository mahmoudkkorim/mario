import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import giftsServices from "../../services/gifts/giftsServices";

// interfaces
import {
    InitialGiftsState,
    AllGiftsData,
    specficGiftsData,
    createGiftsData,
    editGiftsData,
    deleteGiftsData,
} from "../../../interfaces/store/gifts/gitfts";
import { Error } from "../../../interfaces/public";

const initialState: InitialGiftsState = {
    // all gifts
    allGiftsLoading: false,
    allGiftsError: null,
    allGiftsData: null,
    // specfic gift
    specficGiftLoading: false,
    specficGiftError: null,
    specficGiftData: null,
    // create gift
    createGiftLoading: false,
    createGiftError: null,
    createGiftData: null,
    // edit gift
    editGiftLoading: false,
    editGiftError: null,
    editGiftData: null,
    // delete gift
    deleteGiftLoading: false,
    deleteGiftError: null,
    deleteGiftData: null,
};

// all gifts
export const getAllGifts = createAsyncThunk(
    "/super-admin/gifts/all",
    async (args: AllGiftsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await giftsServices.allGifts(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specfic Gift
export const specficGift = createAsyncThunk(
    "/super-admin/gifts/show",
    async (args: specficGiftsData, thunkAPI) => {
        try {
            const { gift_id, token } = args;
            return await giftsServices.specificGift(token, gift_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create Gift
export const createGift = createAsyncThunk(
    "/super-admin/gifts/store",
    async (args: createGiftsData, thunkAPI) => {
        try {
            const { giftData, token } = args;
            return await giftsServices.createGift(token, giftData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit Gift
export const editGift = createAsyncThunk(
    "/super-admin/gifts/edit",
    async (args: editGiftsData, thunkAPI) => {
        try {
            const { giftData, gift_id, token } = args;
            return await giftsServices.eidtGift(token, gift_id, giftData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete Gift
export const deleteGift = createAsyncThunk(
    "/super-admin/gifts/delete",
    async (args: deleteGiftsData, thunkAPI) => {
        try {
            const { gift_id, token } = args;
            return await giftsServices.deleteGift(token, gift_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const giftsSlice = createSlice({
    name: "gifts",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateGift: (state) => ({
            ...state,
            editGiftData: null,
            createGiftData: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // all gifts
            .addCase(getAllGifts.pending, (state) => {
                state.allGiftsLoading = true;
            })
            .addCase(getAllGifts.fulfilled, (state, action) => {
                state.allGiftsLoading = false;
                const { data } = action.payload;
                console.log(data);

                state.allGiftsData = data;
            })
            .addCase(getAllGifts.rejected, (state, action) => {
                state.allGiftsLoading = false;
                state.allGiftsError = action.payload;
            })
            // specfic gift
            .addCase(specficGift.pending, (state) => {
                state.specficGiftLoading = true;
            })
            .addCase(specficGift.fulfilled, (state, action) => {
                state.specficGiftLoading = false;
                const { data } = action.payload;
                state.specficGiftData = data;
            })
            .addCase(specficGift.rejected, (state, action) => {
                state.specficGiftLoading = false;
                state.specficGiftError = action.payload;
            })
            // create gift
            .addCase(createGift.pending, (state) => {
                state.createGiftLoading = true;
            })
            .addCase(createGift.fulfilled, (state, action) => {
                state.createGiftLoading = false;
                // const { data } = action.payload;

                // backend api never give me any response
                state.createGiftData = "created";
            })
            .addCase(createGift.rejected, (state, action) => {
                state.createGiftLoading = false;
                state.createGiftError = action.payload;
            })
            // edit gift
            .addCase(editGift.pending, (state) => {
                state.editGiftLoading = true;
            })
            .addCase(editGift.fulfilled, (state, action) => {
                state.editGiftLoading = false;
                // const { data } = action.payload;

                // backend api never give me any response
                state.editGiftData = "edited";
            })
            .addCase(editGift.rejected, (state, action) => {
                state.editGiftLoading = false;
                state.editGiftError = action.payload;
            })
            // delete gift
            .addCase(deleteGift.pending, (state) => {
                state.deleteGiftLoading = true;
            })
            .addCase(deleteGift.fulfilled, (state, action) => {
                state.deleteGiftLoading = false;
                const { data } = action.payload;
                state.deleteGiftData = data;
            })
            .addCase(deleteGift.rejected, (state, action) => {
                state.deleteGiftLoading = false;

                state.deleteGiftError = action.payload;
            });
    },
});

export const { reset, resetEditCreateGift } = giftsSlice.actions;
export default giftsSlice.reducer;
