import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import audioTarget_hostingAgenciesServices from "../../../../services/agencies/hostingAgency/target/audioTarget-hostingAgenciesServices";

// interfaces
import { Error } from "../../../../../interfaces/public";
import {
    InitialAudioTarget_hostingAgenciesState,
    CreateTargetAudioDate,
    UpdateTargetAudioDate,
    allTargetsAudioDate,
    specifcTargetAudioDate,
} from "../../../../../interfaces/store/agencies/hostingAgencies/target/audioTarget-hostingAgencies";

const initialState: InitialAudioTarget_hostingAgenciesState = {
    // create audio target
    audioTargetCreateLoading: false,
    audioTargetCreateError: null,
    audioTargetCreateData: null,
    // update audio target
    audioTargetUpdateLoading: false,
    audioTargetUpdateError: null,
    audioTargetUpdateData: null,
    // all audio targets
    allAudioTargetLoading: false,
    allAudioTargetError: null,
    allAudioTargetData: null,
    // specific audio target
    specificAudioTargetLoading: false,
    specificAudioTargetError: null,
    specificAudioTargetData: null,
};

// create audio target
export const createAudioTarget = createAsyncThunk(
    "/super-admin/hosting-agency-targets/store",
    async (args: CreateTargetAudioDate, thunkAPI) => {
        try {
            const { token, formData } = args;
            return await audioTarget_hostingAgenciesServices.createAudioTarget(
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

// update audio target
export const updateAudioTarget = createAsyncThunk(
    "/super-admin/hosting-agency-targets/update/id",
    async (args: UpdateTargetAudioDate, thunkAPI) => {
        try {
            const { token, formData, target_id } = args;
            return await audioTarget_hostingAgenciesServices.updateAudioTarget(
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

// all audio targets
export const allAudioTarget = createAsyncThunk(
    "/super-admin/hosting-agency-targets/all",
    async (args: allTargetsAudioDate, thunkAPI) => {
        try {
            const { token } = args;
            return await audioTarget_hostingAgenciesServices.allAudioTargets(
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

// specific audio targets
export const specificAudioTarget = createAsyncThunk(
    "/super-admin/hosting-agency-targets/show/id",
    async (args: specifcTargetAudioDate, thunkAPI) => {
        try {
            const { token, target_id } = args;
            return await audioTarget_hostingAgenciesServices.specificAudioTarget(
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

export const audioTarget_hostingAgenciesSlice = createSlice({
    name: "audioTarget",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCreateEditLoadingErrorAudioTarget: (state) => {
            return {
                ...state,
                audioTargetCreateData: null,
                audioTargetCreateError: null,
                audioTargetUpdateData: null,
                audioTargetUpdateError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // create target audio
            .addCase(createAudioTarget.pending, (state) => {
                state.audioTargetCreateLoading = true;
            })
            .addCase(createAudioTarget.fulfilled, (state, action) => {
                state.audioTargetCreateLoading = false;
                const { data } = action.payload;
                state.audioTargetUpdateData = data;
            })
            .addCase(createAudioTarget.rejected, (state, action) => {
                state.audioTargetCreateLoading = false;
                state.audioTargetCreateError = action.payload;
            })
            // update target audio
            .addCase(updateAudioTarget.pending, (state) => {
                state.audioTargetUpdateLoading = true;
            })
            .addCase(updateAudioTarget.fulfilled, (state, action) => {
                state.audioTargetUpdateLoading = false;
                const { data, formData } = action.payload;
                state.audioTargetUpdateData = data;

                // update specifc audio target
                let currentState: InitialAudioTarget_hostingAgenciesState =
                    current(state);

                const diamonds_required = formData.get("diamonds_required");
                const hours_required = formData.get("hours_required");
                const salary = formData.get("salary");
                const owner_salary = formData.get("owner_salary");
                const newSpecifcAudioTarget = {
                    ...currentState.specificAudioTargetData,
                    diamonds_required: diamonds_required
                        ? diamonds_required
                        : currentState.specificAudioTargetData
                              ?.diamonds_required,
                    hours_required: hours_required
                        ? hours_required
                        : currentState.specificAudioTargetData?.hours_required,
                    salary: salary
                        ? salary
                        : currentState.specificAudioTargetData?.salary,
                    owner_salary: owner_salary
                        ? owner_salary
                        : currentState.specificAudioTargetData?.owner_salary,
                };
                // @ts-ignore
                state.specificAudioTargetData = newSpecifcAudioTarget;
            })
            .addCase(updateAudioTarget.rejected, (state, action) => {
                state.audioTargetUpdateLoading = false;
                state.audioTargetUpdateError = action.payload;
            })
            // all target audio
            .addCase(allAudioTarget.pending, (state) => {
                state.allAudioTargetLoading = true;
            })
            .addCase(allAudioTarget.fulfilled, (state, action) => {
                state.allAudioTargetLoading = false;
                const { data } = action.payload;
                state.allAudioTargetData = data;
            })
            .addCase(allAudioTarget.rejected, (state, action) => {
                state.allAudioTargetLoading = false;
                state.allAudioTargetError = action.payload;
            })
            // specific target audio
            .addCase(specificAudioTarget.pending, (state) => {
                state.specificAudioTargetLoading = true;
            })
            .addCase(specificAudioTarget.fulfilled, (state, action) => {
                state.specificAudioTargetLoading = false;
                const { data } = action.payload;
                state.specificAudioTargetData = data;
            })
            .addCase(specificAudioTarget.rejected, (state, action) => {
                state.specificAudioTargetLoading = false;
                state.specificAudioTargetError = action.payload;
            });
    },
});

export const { reset, resetCreateEditLoadingErrorAudioTarget } =
    audioTarget_hostingAgenciesSlice.actions;
export default audioTarget_hostingAgenciesSlice.reducer;
