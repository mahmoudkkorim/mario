import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import videoGiftsGenresServices from "../../services/gifts/videoGiftsGenresServices";

// interfaces
import {
    InitialVideoGiftsGenresState,
    AllVideoGiftsGenresData,
    createVideoGiftsGenreData,
    deleteVideoGiftsGenreData,
    editVideoGiftsGenreData,
    specficVideoGiftsGenreData,
} from "../../../interfaces/store/gifts/videoGiftsGenres";
import { Error } from "../../../interfaces/public";

const initialState: InitialVideoGiftsGenresState = {
    // all video gifts genres
    allVideoGiftsGenresLoading: false,
    allVideoGiftsGenresError: null,
    allVideoGiftsGenresData: null,
    // specific video gifts genre
    specficVideoGiftsGenreLoading: false,
    specficVideoGiftsGenreError: null,
    specficVideoGiftsGenreData: null,
    // create video gifts genre
    createVideoGiftsGenreLoading: false,
    createVideoGiftsGenreError: null,
    createVideoGiftsGenreData: null,
    // edit video gifts genre
    editVideoGiftsGenreLoading: false,
    editVideoGiftsGenreError: null,
    editVideoGiftsGenreData: null,
    // delete video gifts genre
    deleteVideoGiftsGenreLoading: false,
    deleteVideoGiftsGenreError: null,
    deleteVideoGiftsGenreData: null,
};

// all video gifts Genres
export const allVideoGiftsGenres = createAsyncThunk(
    "/super-admin/video-gifts-generes/all",
    async (args: AllVideoGiftsGenresData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await videoGiftsGenresServices.allVideoGiftsGenres(
                token,
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

// specific video gifts Genre
export const specificVideoGiftsGenre = createAsyncThunk(
    "/super-admin/video-gifts-generes/show",
    async (args: specficVideoGiftsGenreData, thunkAPI) => {
        try {
            const { gift_id, token } = args;
            return await videoGiftsGenresServices.specificVideoGiftsGenre(
                token,
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

// create video gifts Genre
export const createVideoGiftsGenre = createAsyncThunk(
    "/super-admin/video-gifts-generes/store",
    async (args: createVideoGiftsGenreData, thunkAPI) => {
        try {
            const { giftData, token } = args;
            return await videoGiftsGenresServices.createVideoGiftsGenre(
                token,
                giftData
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

// edit video gifts Genre
export const editVideoGiftsGenre = createAsyncThunk(
    "/super-admin/video-gifts-generes/edit",
    async (args: editVideoGiftsGenreData, thunkAPI) => {
        try {
            const { giftData, gift_id, token } = args;
            return await videoGiftsGenresServices.editVideoGiftsGenre(
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

// delete video gifts Genre
export const deleteVideoGiftsGenre = createAsyncThunk(
    "/super-admin/video-gifts-generes/delete",
    async (args: deleteVideoGiftsGenreData, thunkAPI) => {
        try {
            const { gift_id, token } = args;
            return await videoGiftsGenresServices.deleteVideoGiftsGenre(
                token,
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

export const VideoGiftsGenres = createSlice({
    name: "VideoGiftsGenres",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateVideoGiftsGenresDataError: (state) => ({
            ...state,
            editVideoGiftsGenreData: null,
            editVideoGiftsGenreError: null,
            createVideoGiftsGenreData: null,
            createVideoGiftsGenreError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // all video gifts genres
            .addCase(allVideoGiftsGenres.pending, (state) => {
                state.allVideoGiftsGenresLoading = true;
            })
            .addCase(allVideoGiftsGenres.fulfilled, (state, action) => {
                state.allVideoGiftsGenresLoading = false;
                const { data } = action.payload;
                state.allVideoGiftsGenresData = data;
            })
            .addCase(allVideoGiftsGenres.rejected, (state, action) => {
                state.allVideoGiftsGenresLoading = false;
                state.allVideoGiftsGenresError = action.payload;
            })
            // specific video gifts genre
            .addCase(specificVideoGiftsGenre.pending, (state) => {
                state.specficVideoGiftsGenreLoading = true;
            })
            .addCase(specificVideoGiftsGenre.fulfilled, (state, action) => {
                state.specficVideoGiftsGenreLoading = false;
                const { data } = action.payload;
                state.specficVideoGiftsGenreData = data;
            })
            .addCase(specificVideoGiftsGenre.rejected, (state, action) => {
                state.specficVideoGiftsGenreLoading = false;
                state.specficVideoGiftsGenreError = action.payload;
            })
            // create video gifts genre
            .addCase(createVideoGiftsGenre.pending, (state) => {
                state.createVideoGiftsGenreLoading = true;
            })
            .addCase(createVideoGiftsGenre.fulfilled, (state, action) => {
                state.createVideoGiftsGenreLoading = false;
                const { data } = action.payload;
                state.createVideoGiftsGenreData = data;
            })
            .addCase(createVideoGiftsGenre.rejected, (state, action) => {
                state.createVideoGiftsGenreLoading = false;
                state.createVideoGiftsGenreError = action.payload;
            })
            // edit video gifts Genre
            .addCase(editVideoGiftsGenre.pending, (state) => {
                state.editVideoGiftsGenreLoading = true;
            })
            .addCase(editVideoGiftsGenre.fulfilled, (state, action) => {
                state.editVideoGiftsGenreLoading = false;
                const { data, formData } = action.payload;
                state.editVideoGiftsGenreData = data;

                // update specifc video gifts Genre
                let currentState: InitialVideoGiftsGenresState = current(state);
                const name = formData.get("name");
                const precentage = formData.get("precentage");
                const newSpecficVideoGiftsGenreData = {
                    ...currentState.specficVideoGiftsGenreData,
                    name: name
                        ? name
                        : currentState.specficVideoGiftsGenreData?.name,
                    precentage: precentage
                        ? precentage
                        : currentState.specficVideoGiftsGenreData?.precentage,
                };

                // @ts-ignore
                state.specficVideoGiftsGenreData =
                    newSpecficVideoGiftsGenreData;
            })
            .addCase(editVideoGiftsGenre.rejected, (state, action) => {
                state.editVideoGiftsGenreLoading = false;
                state.editVideoGiftsGenreError = action.payload;
            })
            // delete video gifts Genre
            .addCase(deleteVideoGiftsGenre.pending, (state) => {
                state.deleteVideoGiftsGenreLoading = true;
            })
            .addCase(deleteVideoGiftsGenre.fulfilled, (state, action) => {
                state.deleteVideoGiftsGenreLoading = false;
                const { data } = action.payload;
                state.deleteVideoGiftsGenreData = data;

                // update specifc video gifts Genre
                state.specficVideoGiftsGenreData = null;
            })
            .addCase(deleteVideoGiftsGenre.rejected, (state, action) => {
                state.deleteVideoGiftsGenreLoading = false;
                state.deleteVideoGiftsGenreError = action.payload;
            });
    },
});

export const { reset, resetEditCreateVideoGiftsGenresDataError } =
    VideoGiftsGenres.actions;
export default VideoGiftsGenres.reducer;
