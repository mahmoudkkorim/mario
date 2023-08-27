import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import VideoTarget_hostingAgenciesServices from "../../../../services/agencies/hostingAgency/target/videoTarget-hostingAgenciesServices";

// interfaces
import { Error } from "../../../../../interfaces/public";
import {
    InitialVideoTarget_hostingAgenciesState,
    CreateTargetVideoDate,
    UpdateTargetVideoDate,
    allTargetsVideoDate,
    specifcTargetVideoDate,
} from "../../../../../interfaces/store/agencies/hostingAgencies/target/videoTarget-hostingAgencies";

const initialState: InitialVideoTarget_hostingAgenciesState = {
    // create video target
    videoTargetCreateLoading: false,
    videoTargetCreateError: null,
    videoTargetCreateData: null,
    // update video target
    videoTargetUpdateLoading: false,
    videoTargetUpdateError: null,
    videoTargetUpdateData: null,
    // all video targets
    allVideoTargetLoading: false,
    allVideoTargetError: null,
    allVideoTargetData: null,
    // specific video target
    specificVideoTargetLoading: false,
    specificVideoTargetError: null,
    specificVideoTargetData: null,
};

// create video target
export const createVideoTarget = createAsyncThunk(
    "/super-admin/hosting-agency-video-targets/store",
    async (args: CreateTargetVideoDate, thunkAPI) => {
        try {
            const { token, formData } = args;
            return await VideoTarget_hostingAgenciesServices.createVideoTarget(
                token,
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

// update video target
export const updateVideoTarget = createAsyncThunk(
    "/super-admin/hosting-agency-video-targets/update/id",
    async (args: UpdateTargetVideoDate, thunkAPI) => {
        try {
            const { token, formData, target_id } = args;
            return await VideoTarget_hostingAgenciesServices.updateVideoTarget(
                token,
                target_id,
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

// all video targets
export const allVideoTarget = createAsyncThunk(
    "/super-admin/hosting-agency-video-targets/all",
    async (args: allTargetsVideoDate, thunkAPI) => {
        try {
            const { token } = args;
            return await VideoTarget_hostingAgenciesServices.allVideoTargets(
                token
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

// specific video targets
export const specificVideoTarget = createAsyncThunk(
    "/super-admin/hosting-agency-video-targets/show/id",
    async (args: specifcTargetVideoDate, thunkAPI) => {
        try {
            const { token, target_id } = args;
            return await VideoTarget_hostingAgenciesServices.specifcVideoTarget(
                token,
                target_id
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

export const videoTarget_hostingAgenciesSlice = createSlice({
    name: "videoTarget",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCreateEditLoadingErrorVideoTarget: (state) => {
            return {
                ...state,
                videoTargetCreateData: null,
                videoTargetCreateError: null,
                videoTargetUpdateData: null,
                videoTargetUpdateError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // create target video
            .addCase(createVideoTarget.pending, (state) => {
                state.videoTargetCreateLoading = true;
            })
            .addCase(createVideoTarget.fulfilled, (state, action) => {
                state.videoTargetCreateLoading = false;
                const { data } = action.payload;
                state.videoTargetCreateData = data;
            })
            .addCase(createVideoTarget.rejected, (state, action) => {
                state.videoTargetCreateLoading = false;
                state.videoTargetCreateError = action.payload;
            })
            // update target video
            .addCase(updateVideoTarget.pending, (state) => {
                state.videoTargetUpdateLoading = true;
            })
            .addCase(updateVideoTarget.fulfilled, (state, action) => {
                state.videoTargetUpdateLoading = false;
                const { data, formData } = action.payload;
                state.videoTargetUpdateData = data;

                // update specifc video target
                let currentState: InitialVideoTarget_hostingAgenciesState =
                    current(state);

                const diamonds_required = formData.get("diamonds_required");
                const hours_required = formData.get("hours_required");
                const salary = formData.get("salary");
                const owner_salary = formData.get("owner_salary");
                const newSpecifcAudioTarget = {
                    ...currentState.specificVideoTargetData,
                    diamonds_required: diamonds_required
                        ? diamonds_required
                        : currentState.specificVideoTargetData
                              ?.diamonds_required,
                    hours_required: hours_required
                        ? hours_required
                        : currentState.specificVideoTargetData?.hours_required,
                    salary: salary
                        ? salary
                        : currentState.specificVideoTargetData?.salary,
                    owner_salary: owner_salary
                        ? owner_salary
                        : currentState.specificVideoTargetData?.owner_salary,
                };
                // @ts-ignore
                state.specificVideoTargetData = newSpecifcAudioTarget;
            })
            .addCase(updateVideoTarget.rejected, (state, action) => {
                state.videoTargetUpdateLoading = false;
                state.videoTargetUpdateError = action.payload;
            })
            // all target video
            .addCase(allVideoTarget.pending, (state) => {
                state.allVideoTargetLoading = true;
            })
            .addCase(allVideoTarget.fulfilled, (state, action) => {
                state.allVideoTargetLoading = false;
                const { data } = action.payload;
                state.allVideoTargetData = data;
            })
            .addCase(allVideoTarget.rejected, (state, action) => {
                state.allVideoTargetLoading = false;
                state.allVideoTargetError = action.payload;
            })
            // specific target video
            .addCase(specificVideoTarget.pending, (state) => {
                state.specificVideoTargetLoading = true;
            })
            .addCase(specificVideoTarget.fulfilled, (state, action) => {
                state.specificVideoTargetLoading = false;
                const { data } = action.payload;
                state.specificVideoTargetData = data;
            })
            .addCase(specificVideoTarget.rejected, (state, action) => {
                state.specificVideoTargetLoading = false;
                state.specificVideoTargetError = action.payload;
            });
    },
});

export const { reset, resetCreateEditLoadingErrorVideoTarget } =
    videoTarget_hostingAgenciesSlice.actions;
export default videoTarget_hostingAgenciesSlice.reducer;
