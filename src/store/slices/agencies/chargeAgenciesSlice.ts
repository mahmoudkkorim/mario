import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import chargeAgenciesServices from "../../services/agencies/chargeAgenciesServices";

// interfaces
import { Error } from "../../../interfaces/public";
import {
    InitialChargeAgenciesState,
    ChargeShowCopy,
    ChargeAdminHistory,
    ChargeUserHistory,
    ChargeUpdateBalance,
    ChargeDeleteAgency,
    ChargeCreateAgency,
    ChargeShowIndex,
} from "../../../interfaces/store/agencies/chargeAgencies";

const initialState: InitialChargeAgenciesState = {
    // store new agency
    ChargeCreateAgencyLoading: false,
    ChargeCreateAgencyData: null,
    ChargeCreateAgencyError: null,
    // index copy
    ChargeIndexCopyLoading: false,
    ChargeIndexCopyData: null,
    ChargeIndexCopyError: null,
    // show copy
    ChargeShowCopyLoading: false,
    ChargeShowCopyData: null,
    ChargeShowCopyError: null,
    // admin history
    ChargeAdminHistoryLoading: false,
    ChargeAdminHistoryData: null,
    ChargeAdminHistoryError: null,
    // user history
    ChargeUserHistoryLoading: false,
    ChargeUserHistoryData: null,
    ChargeUserHistoryError: null,
    // update balance
    ChargeUpdateBalanceLoading: false,
    ChargeUpdateBalanceData: null,
    ChargeUpdateBalanceError: null,
    // delete agency
    ChargeDeleteAgencyLoading: false,
    ChargeDeleteAgencyData: null,
    ChargeDeleteAgencyError: null,
};

// create agency
export const chargeCreateAgency = createAsyncThunk(
    "/super-admin/charge-agents/store",
    async (args: ChargeCreateAgency, thunkAPI) => {
        try {
            const { token, user_id } = args;
            return await chargeAgenciesServices.chargeCreateAgency(
                token,
                user_id
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

// index copy
export const chargeIndexCopy = createAsyncThunk(
    "/super-admin/charge-agents/all",
    async (args: ChargeShowIndex, thunkAPI) => {
        try {
            const { token, page } = args;
            return await chargeAgenciesServices.chargeIndexCopy(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// show copy
export const chargeShowCopy = createAsyncThunk(
    "/super-admin/charge-agents/show",
    async (args: ChargeShowCopy, thunkAPI) => {
        const { id, token } = args;
        try {
            return await chargeAgenciesServices.chargeShowCopy(token, id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// admin history
export const chargeAdminHistory = createAsyncThunk(
    "/super-admin/charge-agents/get-admin-history",
    async (args: ChargeAdminHistory, thunkAPI) => {
        const { id, token, page } = args;
        try {
            return await chargeAgenciesServices.chargeAdminHistory(
                token,
                id,
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

// user history
export const chargeUserHistory = createAsyncThunk(
    "/super-admin/charge-agents/get-users-history",
    async (args: ChargeUserHistory, thunkAPI) => {
        const { id, token, page } = args;
        try {
            return await chargeAgenciesServices.chargeUserHistory(
                token,
                id,
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

// update balance
export const chargeUpdateBalance = createAsyncThunk(
    "/super-admin/charge-agents/update-balance",
    async (args: ChargeUpdateBalance, thunkAPI) => {
        const { id, token, amount, type } = args;
        try {
            return await chargeAgenciesServices.chargeUpdateBalance(
                token,
                id,
                amount,
                type
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

// delete agency
export const chargeDeleteAgency = createAsyncThunk(
    "/super-admin/charge-agents/delete",
    async (args: ChargeDeleteAgency, thunkAPI) => {
        const { id, token } = args;
        try {
            return await chargeAgenciesServices.chargeDeleteAgency(token, id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const chargeAgenciesSlice = createSlice({
    name: "agency",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCreateDataError: (state) => {
            return {
                ...state,
                ChargeCreateAgencyData: null,
                ChargeCreateAgencyError: null,
            };
        },
        resetUpdateBalanceDataError: (state) => {
            return {
                ...state,
                ChargeUpdateBalanceData: null,
                ChargeUpdateBalanceError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // create agency
            .addCase(chargeCreateAgency.pending, (state) => {
                state.ChargeCreateAgencyLoading = true;
            })
            .addCase(chargeCreateAgency.fulfilled, (state, action) => {
                state.ChargeCreateAgencyLoading = false;
                const { data } = action.payload;
                //  if the server not give me a data
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تم اضافه الوكاله",
                    };
                    state.ChargeCreateAgencyData = modifiedChargeData;
                } else {
                    state.ChargeCreateAgencyData = data;
                }
            })
            .addCase(chargeCreateAgency.rejected, (state, action) => {
                state.ChargeCreateAgencyLoading = false;
                state.ChargeCreateAgencyError = action.payload;
            })
            // index copy
            .addCase(chargeIndexCopy.pending, (state) => {
                state.ChargeIndexCopyLoading = true;
            })
            .addCase(chargeIndexCopy.fulfilled, (state, action) => {
                state.ChargeIndexCopyLoading = false;
                const { data } = action.payload;
                state.ChargeIndexCopyData = data;
            })
            .addCase(chargeIndexCopy.rejected, (state, action) => {
                state.ChargeIndexCopyLoading = false;
                state.ChargeIndexCopyError = action.payload;
            })
            // show copy
            .addCase(chargeShowCopy.pending, (state) => {
                state.ChargeShowCopyLoading = true;
            })
            .addCase(chargeShowCopy.fulfilled, (state, action) => {
                state.ChargeShowCopyLoading = false;
                const { data } = action.payload;
                state.ChargeShowCopyData = data;
            })
            .addCase(chargeShowCopy.rejected, (state, action) => {
                state.ChargeShowCopyLoading = false;
                state.ChargeShowCopyError = action.payload;
            })
            // admin history
            .addCase(chargeAdminHistory.pending, (state) => {
                state.ChargeAdminHistoryLoading = true;
            })
            .addCase(chargeAdminHistory.fulfilled, (state, action) => {
                state.ChargeAdminHistoryLoading = false;
                const { data } = action.payload;
                state.ChargeAdminHistoryData = data;
            })
            .addCase(chargeAdminHistory.rejected, (state, action) => {
                state.ChargeAdminHistoryLoading = false;
                state.ChargeAdminHistoryError = action.payload;
            })
            // user history
            .addCase(chargeUserHistory.pending, (state) => {
                state.ChargeUserHistoryLoading = true;
            })
            .addCase(chargeUserHistory.fulfilled, (state, action) => {
                state.ChargeUserHistoryLoading = false;
                const { data } = action.payload;
                state.ChargeUserHistoryData = data;
            })
            .addCase(chargeUserHistory.rejected, (state, action) => {
                state.ChargeUserHistoryLoading = false;
                state.ChargeUserHistoryError = action.payload;
            })
            // update balance
            .addCase(chargeUpdateBalance.pending, (state) => {
                state.ChargeUpdateBalanceLoading = true;
            })
            .addCase(chargeUpdateBalance.fulfilled, (state, action) => {
                state.ChargeUpdateBalanceLoading = false;
                const { data } = action.payload;
                console.log(data);
                //  if the server not give me a data
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تمت العمليه بنجاح",
                    };
                    state.ChargeUpdateBalanceData = modifiedChargeData;
                } else {
                    state.ChargeUpdateBalanceData = data;
                }
            })
            .addCase(chargeUpdateBalance.rejected, (state, action) => {
                state.ChargeUpdateBalanceLoading = false;
                state.ChargeUpdateBalanceError = action.payload;
            })
            // delete agency
            .addCase(chargeDeleteAgency.pending, (state) => {
                state.ChargeDeleteAgencyLoading = true;
            })
            .addCase(chargeDeleteAgency.fulfilled, (state, action) => {
                state.ChargeDeleteAgencyLoading = false;
                const { data, id } = action.payload;
                state.ChargeDeleteAgencyData = data;

                // delete agency from ChargeIndexCopyData
                let currentState: InitialChargeAgenciesState = current(state);

                const newData = [
                    ...currentState.ChargeIndexCopyData?.data!,
                ].filter((one) => one.id !== id);

                const newChargeIndexCopyData = {
                    ...currentState.ChargeIndexCopyData,
                    data: newData,
                };

                // @ts-ignore
                state.ChargeIndexCopyData = newChargeIndexCopyData;
            })
            .addCase(chargeDeleteAgency.rejected, (state, action) => {
                state.ChargeDeleteAgencyLoading = false;
                state.ChargeDeleteAgencyError = action.payload;
            });
    },
});

export const { reset, resetCreateDataError, resetUpdateBalanceDataError } =
    chargeAgenciesSlice.actions;
export default chargeAgenciesSlice.reducer;
