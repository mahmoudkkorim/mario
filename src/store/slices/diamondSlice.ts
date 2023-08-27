import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import diamondServices from "../services/diamondServices";

// interfaces
import {
    InitialDiamondState,
    AllDiamondPackageData,
    specificDiamondPackageData,
    createDiamondPackageData,
    editDiamondPackageData,
    deleteDiamondPackageData,
    chargeUserBalanceData,
    rollBackFromUserData,
} from "../../interfaces/store/diamond";
import { Error } from "../../interfaces/public";

const initialState: InitialDiamondState = {
    // All diamond packages
    allDiamondPackagesLoading: false,
    allDiamondPackagesData: null,
    allDiamondPackagesError: null,
    // specific diamond package
    specificDiamondPackageLoading: false,
    specificDiamondPackageData: null,
    specificDiamondPackageError: null,
    // create diamond package
    createDiamondPackageLoading: false,
    createDiamondPackageData: null,
    createDiamondPackageError: null,
    // edit diamond package
    editDiamondPackageLoading: false,
    editDiamondPackageData: null,
    editDiamondPackageError: null,
    // delete diamond package
    deleteDiamondPackageLoading: false,
    deleteDiamondPackageData: null,
    deleteDiamondPackageError: null,
    // charge user balance
    chargeUserBalanceLoading: false,
    chargeUserBalanceData: null,
    chargeUserBalanceError: null,
    // roll back from user
    rollBackFromUserLoading: false,
    rollBackFromUserData: null,
    rollBackFromUserError: null,
};

// All diamond packages
export const allDiamondPackages = createAsyncThunk(
    "/super-admin/diamond/all",
    async (args: AllDiamondPackageData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await diamondServices.allDiamondPackages(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specific diamond package
export const specificDiamondPackage = createAsyncThunk(
    "/super-admin/diamond/id",
    async (arg: specificDiamondPackageData, thunkAPI) => {
        try {
            const { diamond_id, token } = arg;
            return await diamondServices.specificDiamondPackage(
                token,
                diamond_id
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

// create diamond packages
export const createDiamondPackage = createAsyncThunk(
    "/super-admin/diamond/store",
    async (arg: createDiamondPackageData, thunkAPI) => {
        try {
            const { formData, token } = arg;
            return await diamondServices.createDiamondPackage(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit diamond packages
export const editDiamondPackage = createAsyncThunk(
    "/super-admin/diamond/update/id",
    async (arg: editDiamondPackageData, thunkAPI) => {
        try {
            const { formData, token, diamond_id } = arg;
            return await diamondServices.editDiamondPackage(
                token,
                formData,
                diamond_id
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

// delete diamond packages
export const deleteDiamondPackage = createAsyncThunk(
    "/super-admin/diamond/delete/id",
    async (arg: deleteDiamondPackageData, thunkAPI) => {
        try {
            const { token, diamond_id } = arg;
            return await diamondServices.deleteDiamondPackage(
                token,
                diamond_id
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

// charge user balance
export const chargeUserBalance = createAsyncThunk(
    "/super-admin/diamond/give-to-user",
    async (arg: chargeUserBalanceData, thunkAPI) => {
        try {
            const { token, formData } = arg;
            return await diamondServices.chargeUserBalance(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// roll back from user
export const rollBackFromUser = createAsyncThunk(
    "/super-admin/diamond/remove-from-user",
    async (arg: rollBackFromUserData, thunkAPI) => {
        try {
            const { token, formData } = arg;
            return await diamondServices.rollBackFromUser(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const diamondSlice = createSlice({
    name: "diamond",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateDiamond: (state) => ({
            ...state,
            editDiamondPackageData: null,
            createDiamondPackageData: null,
        }),
        resetRollbackChargeDataError: (state) => ({
            ...state,
            rollBackFromUserData: null,
            rollBackFromUserError: null,
            chargeUserBalanceData: null,
            chargeUserBalanceError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All diamond packages
            .addCase(allDiamondPackages.pending, (state) => {
                state.allDiamondPackagesLoading = true;
            })
            .addCase(allDiamondPackages.fulfilled, (state, action) => {
                state.allDiamondPackagesLoading = false;
                const { data } = action.payload;
                state.allDiamondPackagesData = data;
            })
            .addCase(allDiamondPackages.rejected, (state, action) => {
                state.allDiamondPackagesLoading = false;
                state.allDiamondPackagesError = action.payload;
            })
            // specific diamond package
            .addCase(specificDiamondPackage.pending, (state) => {
                state.specificDiamondPackageLoading = true;
            })
            .addCase(specificDiamondPackage.fulfilled, (state, action) => {
                state.specificDiamondPackageLoading = false;
                const { data } = action.payload;
                state.specificDiamondPackageData = data;
            })
            .addCase(specificDiamondPackage.rejected, (state, action) => {
                state.specificDiamondPackageLoading = false;
                state.specificDiamondPackageError = action.payload;
            })
            // create diamond package
            .addCase(createDiamondPackage.pending, (state) => {
                state.createDiamondPackageLoading = true;
            })
            .addCase(createDiamondPackage.fulfilled, (state, action) => {
                state.createDiamondPackageLoading = false;
                const { data } = action.payload;
                state.createDiamondPackageData = data;
            })
            .addCase(createDiamondPackage.rejected, (state, action) => {
                state.createDiamondPackageLoading = false;
                state.createDiamondPackageError = action.payload;
            })
            // edit diamond package
            .addCase(editDiamondPackage.pending, (state) => {
                state.editDiamondPackageLoading = true;
            })
            .addCase(editDiamondPackage.fulfilled, (state, action) => {
                state.editDiamondPackageLoading = false;
                const { data, formData, diamond_id } = action.payload;
                state.editDiamondPackageData = data;
            })
            .addCase(editDiamondPackage.rejected, (state, action) => {
                state.editDiamondPackageLoading = false;
                state.editDiamondPackageError = action.payload;
            })
            // delete diamond package
            .addCase(deleteDiamondPackage.pending, (state) => {
                state.deleteDiamondPackageLoading = true;
            })
            .addCase(deleteDiamondPackage.fulfilled, (state, action) => {
                state.deleteDiamondPackageLoading = false;
                const { data } = action.payload;
                state.deleteDiamondPackageData = data;
            })
            .addCase(deleteDiamondPackage.rejected, (state, action) => {
                state.deleteDiamondPackageLoading = false;
                state.deleteDiamondPackageError = action.payload;
            })
            // charge user balance
            .addCase(chargeUserBalance.pending, (state) => {
                state.chargeUserBalanceLoading = true;
            })
            .addCase(chargeUserBalance.fulfilled, (state, action) => {
                state.chargeUserBalanceLoading = false;
                const { data } = action.payload;
                state.chargeUserBalanceData = data;
            })
            .addCase(chargeUserBalance.rejected, (state, action) => {
                state.chargeUserBalanceLoading = false;
                state.chargeUserBalanceError = action.payload;
            })
            // roll back from user
            .addCase(rollBackFromUser.pending, (state) => {
                state.rollBackFromUserLoading = true;
            })
            .addCase(rollBackFromUser.fulfilled, (state, action) => {
                state.rollBackFromUserLoading = false;
                const { data } = action.payload;
                state.rollBackFromUserData = data;
            })
            .addCase(rollBackFromUser.rejected, (state, action) => {
                state.rollBackFromUserLoading = false;
                state.rollBackFromUserError = action.payload;
            });
    },
});

export const { reset, resetEditCreateDiamond, resetRollbackChargeDataError } =
    diamondSlice.actions;
export default diamondSlice.reducer;
