import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import bannersServices from "../services/bannersServices";

// interfaces
import {
    InitialBannersState,
    ActiveBannersData,
    AllBannersData,
    createBannerData,
    deleteBannerData,
    editBannerData,
    specificBannerData,
} from "../../interfaces/store/banners";
import { Error } from "../../interfaces/public";

const initialState: InitialBannersState = {
    // All banners
    allBannersLoading: false,
    allBannersData: null,
    allBannersError: null,
    // specific banners
    specificBannerLoading: false,
    specificBannerData: null,
    specificBannerError: null,
    // create banners
    createBannerLoading: false,
    createBannerData: null,
    createBannerError: null,
    // edit banners
    editBannerLoading: false,
    editBannerData: null,
    editBannerError: null,
    // delete banners
    deleteBannerLoading: false,
    deleteBannerData: null,
    deleteBannerError: null,
    // active banners
    activeBannersLoading: false,
    activeBannersData: null,
    activeBannersError: null,
};

// All banners
export const allBanners = createAsyncThunk(
    "/super-admin/banners/all",
    async (args: AllBannersData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await bannersServices.allBanners(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specifc banner
export const specificBanner = createAsyncThunk(
    "/super-admin/banners/show",
    async (args: specificBannerData, thunkAPI) => {
        try {
            const { banner_id, token } = args;
            return await bannersServices.specificBanner(token, banner_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create banner
export const createBanner = createAsyncThunk(
    "/super-admin/banners/store",
    async (args: createBannerData, thunkAPI) => {
        try {
            const { formData, token } = args;
            return await bannersServices.createBanner(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit banner
export const editBanner = createAsyncThunk(
    "/super-admin/banners/update",
    async (args: editBannerData, thunkAPI) => {
        try {
            const { formData, token, banner_id } = args;
            return await bannersServices.editBanner(token, formData, banner_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete banner
export const deleteBanner = createAsyncThunk(
    "/super-admin/banners/delete",
    async (args: deleteBannerData, thunkAPI) => {
        try {
            const { token, banner_id } = args;
            return await bannersServices.deleteBanner(token, banner_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// active banners
export const activeBanners = createAsyncThunk(
    "/super-admin/banners/active",
    async (args: ActiveBannersData, thunkAPI) => {
        try {
            const { token, page } = args;
            return await bannersServices.activeBanners(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const bannersSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateBanner: (state) => ({
            ...state,
            editBannerData: null,
            createBannerData: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All banners
            .addCase(allBanners.pending, (state) => {
                state.allBannersLoading = true;
            })
            .addCase(allBanners.fulfilled, (state, action) => {
                state.allBannersLoading = false;
                const { data } = action.payload;
                state.allBannersData = data;
            })
            .addCase(allBanners.rejected, (state, action) => {
                state.allBannersLoading = false;
                state.allBannersError = action.payload;
            })
            // specific banner
            .addCase(specificBanner.pending, (state) => {
                state.specificBannerLoading = true;
            })
            .addCase(specificBanner.fulfilled, (state, action) => {
                state.specificBannerLoading = false;
                const { data } = action.payload;
                state.specificBannerData = data;
            })
            .addCase(specificBanner.rejected, (state, action) => {
                state.specificBannerLoading = false;
                state.specificBannerError = action.payload;
            })
            // create banner
            .addCase(createBanner.pending, (state) => {
                state.createBannerLoading = true;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.createBannerLoading = false;
                const { data } = action.payload;
                state.createBannerData = data;
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.createBannerLoading = false;
                state.createBannerError = action.payload;
            })
            // edit banner
            .addCase(editBanner.pending, (state) => {
                state.editBannerLoading = true;
            })
            .addCase(editBanner.fulfilled, (state, action) => {
                state.editBannerLoading = false;
                const { data } = action.payload;
                state.editBannerData = data;
            })
            .addCase(editBanner.rejected, (state, action) => {
                state.editBannerLoading = false;
                state.editBannerError = action.payload;
            })
            // delete banner
            .addCase(deleteBanner.pending, (state) => {
                state.deleteBannerLoading = true;
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.deleteBannerLoading = false;
                const { data } = action.payload;
                state.deleteBannerData = data;
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.deleteBannerLoading = false;
                state.deleteBannerError = action.payload;
            })
            // active banners
            .addCase(activeBanners.pending, (state) => {
                state.activeBannersLoading = true;
            })
            .addCase(activeBanners.fulfilled, (state, action) => {
                state.activeBannersLoading = false;
                const { data } = action.payload;
                state.activeBannersData = data;
            })
            .addCase(activeBanners.rejected, (state, action) => {
                state.activeBannersLoading = false;
                state.activeBannersError = action.payload;
            });
    },
});

export const { reset, resetEditCreateBanner } = bannersSlice.actions;
export default bannersSlice.reducer;
