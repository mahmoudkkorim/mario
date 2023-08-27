import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import levelsServices from "../services/levelsServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialLevelsState,
    AllLevelsData,
    ChangeUserLevelData,
    specificLevelData,
    updateLevelData,
} from "../../interfaces/store/levels";

const initialState: InitialLevelsState = {
    // All Levels
    allLevelsLoading: false,
    allLevelsError: null,
    allLevelsData: null,
    // specific Level
    specificLevelLoading: false,
    specificLevelError: null,
    specificLevelData: null,
    // change user level
    changeUserLevelLoading: false,
    changeUserLevelError: null,
    changeUserLevelData: null,
    // update level
    updateLevelLoading: false,
    updateLevelError: null,
    updateLevelData: null,
};

// AllLevels
export const allLevels = createAsyncThunk(
    "/super-admin/levels/all",
    async (args: AllLevelsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await levelsServices.allLevels(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specificLevel
export const specificLevel = createAsyncThunk(
    "/super-admin/levels/id",
    async (args: specificLevelData, thunkAPI) => {
        try {
            const { level_id, token } = args;
            return await levelsServices.specificLevel(token, level_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// changeUserLevel
export const changeUserLevel = createAsyncThunk(
    "/super-admin/levels/id/changeuserlevel",
    async (args: ChangeUserLevelData, thunkAPI) => {
        try {
            const { formData, token } = args;
            return await levelsServices.changeUserLevel(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// updateLevel
export const updateLevel = createAsyncThunk(
    "/super-admin/levels/update",
    async (args: updateLevelData, thunkAPI) => {
        try {
            const { formData, token, level_id } = args;
            return await levelsServices.updateLevel(token, level_id, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const levelsSlice = createSlice({
    name: "levels",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetChargeUserLevelDataError: (state) => ({
            ...state,
            changeUserLevelData: null,
            changeUserLevelError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // AllLevels
            .addCase(allLevels.pending, (state) => {
                state.allLevelsLoading = true;
            })
            .addCase(allLevels.fulfilled, (state, action) => {
                state.allLevelsLoading = false;
                const { data } = action.payload;
                state.allLevelsData = data;
            })
            .addCase(allLevels.rejected, (state, action) => {
                state.allLevelsLoading = false;
                state.allLevelsError = action.payload;
            })
            // specificLevels
            .addCase(specificLevel.pending, (state) => {
                state.specificLevelLoading = true;
            })
            .addCase(specificLevel.fulfilled, (state, action) => {
                state.specificLevelLoading = false;
                const { data } = action.payload;
                state.specificLevelData = data;
            })
            .addCase(specificLevel.rejected, (state, action) => {
                state.specificLevelLoading = false;
                state.specificLevelError = action.payload;
            })
            // changeUserLevel
            .addCase(changeUserLevel.pending, (state) => {
                state.changeUserLevelLoading = true;
            })
            .addCase(changeUserLevel.fulfilled, (state, action) => {
                state.changeUserLevelLoading = false;
                const { data } = action.payload;
                state.changeUserLevelData = data;
            })
            .addCase(changeUserLevel.rejected, (state, action) => {
                state.changeUserLevelLoading = false;
                state.changeUserLevelError = action.payload;
            })
            // updateLevel
            .addCase(updateLevel.pending, (state) => {
                state.updateLevelLoading = true;
            })
            .addCase(updateLevel.fulfilled, (state, action) => {
                state.updateLevelLoading = false;
                const { data, formData } = action.payload;
                state.updateLevelData = data;

                // update exp requied in level
                let currentState: InitialLevelsState = current(state);
                const required_exp = formData.get("required_exp");

                if (required_exp) {
                    const newSpecificLevel = {
                        ...currentState.specificLevelData,
                        required_exp: required_exp,
                    };

                    // @ts-ignore
                    state.specificLevelData = newSpecificLevel;
                }
            })

            .addCase(updateLevel.rejected, (state, action) => {
                state.updateLevelLoading = false;
                state.updateLevelError = action.payload;
            });
    },
});

export const { reset, resetChargeUserLevelDataError } = levelsSlice.actions;
export default levelsSlice.reducer;
