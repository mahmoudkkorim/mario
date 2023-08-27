import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import hostingAgenciesServices from "../../../services/agencies/hostingAgency/hostingAgencyServices";

// interfaces
import { Error } from "../../../../interfaces/public";
import {
    InitialhostingAgenciesState,
    HostingCreateAgency,
    HostingAllAgency,
    HostingDeleteAgency,
    HostingSpecficAgency,
    HostingUpdateAgency,
} from "../../../../interfaces/store/agencies/hostingAgencies/hostingAgencies";

const initialState: InitialhostingAgenciesState = {
    // create new agency
    hostingCreateAgencyLoading: false,
    hostingCreateAgencyError: null,
    hostingCreateAgencyData: null,
    // all hosting agencies
    hostingAllAgenciesLoading: false,
    hostingAllAgenciesError: null,
    hostingAllAgenciesData: null,
    // specifc hosting agency
    hostingSpecificAgencyLoading: false,
    hostingSpecificAgencyError: null,
    hostingSpecificAgencyData: null,
    // update agency
    hostingUpdateAgencyLoading: false,
    hostingUpdateAgencyData: null,
    hostingUpdateAgencyError: null,
    // delete agency
    hostingDeleteAgencyLoading: false,
    hostingDeleteAgencyData: null,
    hostingDeleteAgencyError: null,
};

// create agency
export const createHostingAgency = createAsyncThunk(
    "/super-admin/hosting-agency/store",
    async (args: HostingCreateAgency, thunkAPI) => {
        try {
            const { token, formData } = args;
            return await hostingAgenciesServices.createHostingAgency(
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

// all hosting agencies
export const AllHostingAgencies = createAsyncThunk(
    "/super-admin/hosting-agents/all",
    async (args: HostingAllAgency, thunkAPI) => {
        try {
            const { token, page } = args;
            return await hostingAgenciesServices.AllhostingAgencies(
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

// specific hosting agency
export const specficHostingAgency = createAsyncThunk(
    "/super-admin/charge-agents/show",
    async (args: HostingSpecficAgency, thunkAPI) => {
        const { id, token } = args;
        try {
            return await hostingAgenciesServices.specifcHostingAgency(
                token,
                id
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

// update hosting agency
export const updateHostingAgency = createAsyncThunk(
    "/super-admin/hosting-agents/update-balance",
    async (args: HostingUpdateAgency, thunkAPI) => {
        const { id, token, formData } = args;
        try {
            return await hostingAgenciesServices.updateHostingAgency(
                token,
                id,
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

// delete agency
export const deleteHostingAgency = createAsyncThunk(
    "/super-admin/hosting-agents/delete",
    async (args: HostingDeleteAgency, thunkAPI) => {
        const { id, token } = args;
        try {
            return await hostingAgenciesServices.deleteHostingAgency(token, id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const hostingAgenciesSlice = createSlice({
    name: "agency",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetCreateEditLoadingErrorAgency: (state) => {
            return {
                ...state,
                hostingCreateAgencyData: null,
                hostingCreateAgencyError: null,
                hostingUpdateAgencyData: null,
                hostingUpdateAgencyError: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // create agency
            .addCase(createHostingAgency.pending, (state) => {
                state.hostingCreateAgencyLoading = true;
            })
            .addCase(createHostingAgency.fulfilled, (state, action) => {
                state.hostingCreateAgencyLoading = false;
                const { data } = action.payload;

                //  if the server not give me a data
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تم اضافه الوكاله",
                    };
                    state.hostingCreateAgencyData = modifiedChargeData;
                } else {
                    state.hostingCreateAgencyData = data;
                }
            })
            .addCase(createHostingAgency.rejected, (state, action) => {
                state.hostingCreateAgencyLoading = false;
                state.hostingCreateAgencyError = action.payload;
                console.log(action.payload);
            })
            // all hosting agencies
            .addCase(AllHostingAgencies.pending, (state) => {
                state.hostingAllAgenciesLoading = true;
            })
            .addCase(AllHostingAgencies.fulfilled, (state, action) => {
                state.hostingAllAgenciesLoading = false;
                const { data } = action.payload;

                state.hostingAllAgenciesData = data;
            })
            .addCase(AllHostingAgencies.rejected, (state, action) => {
                state.hostingAllAgenciesLoading = false;
                state.hostingAllAgenciesError = action.payload;
            })
            // specfic hosting agency
            .addCase(specficHostingAgency.pending, (state) => {
                state.hostingSpecificAgencyLoading = true;
            })
            .addCase(specficHostingAgency.fulfilled, (state, action) => {
                state.hostingSpecificAgencyLoading = false;
                const { data } = action.payload;
                console.log("data", data);

                state.hostingSpecificAgencyData = data;
            })
            .addCase(specficHostingAgency.rejected, (state, action) => {
                state.hostingSpecificAgencyLoading = false;
                state.hostingSpecificAgencyError = action.payload;
            })
            // update hosting agency
            .addCase(updateHostingAgency.pending, (state) => {
                state.hostingUpdateAgencyLoading = true;
            })
            .addCase(updateHostingAgency.fulfilled, (state, action) => {
                state.hostingUpdateAgencyLoading = false;
                const { data } = action.payload;
                console.log(data);
                //  if the server not give me a data
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تمت العمليه بنجاح",
                    };
                    state.hostingUpdateAgencyData = modifiedChargeData;
                } else {
                    state.hostingUpdateAgencyData = data;
                }
            })
            .addCase(updateHostingAgency.rejected, (state, action) => {
                state.hostingUpdateAgencyLoading = false;
                state.hostingUpdateAgencyError = action.payload;
            })
            // delete agency
            .addCase(deleteHostingAgency.pending, (state) => {
                state.hostingDeleteAgencyLoading = true;
            })
            .addCase(deleteHostingAgency.fulfilled, (state, action) => {
                state.hostingDeleteAgencyLoading = false;
                const { data, id } = action.payload;
                state.hostingDeleteAgencyData = data;

                // delete agency from allHostingAgencies
                let currentState: InitialhostingAgenciesState = current(state);

                const newData = [
                    ...currentState.hostingAllAgenciesData?.data!,
                ].filter((one) => one.id !== id);

                const newHostingAgeciesData = {
                    ...currentState.hostingAllAgenciesData,
                    data: newData,
                };

                // @ts-ignore
                state.hostingAllAgenciesData = newHostingAgeciesData;
            })
            .addCase(deleteHostingAgency.rejected, (state, action) => {
                state.hostingDeleteAgencyLoading = false;
                state.hostingDeleteAgencyError = action.payload;
            });
    },
});

export const { reset, resetCreateEditLoadingErrorAgency } =
    hostingAgenciesSlice.actions;
export default hostingAgenciesSlice.reducer;
