import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import specialUidsServices from "../services/specialUidsServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialSpecialUidState,
    AllSpecialUidsData,
    CreateSpecialUidData,
    DeleteSpecialUidData,
    EditSpecialUidData,
    GiveSpecialUidToUserData,
    RemoveSpecialUidFromUserData,
    SpecificSpecialUidData,
} from "../../interfaces/store/specialUids";

const initialState: InitialSpecialUidState = {
    // All special uids
    allSpecialUidsLoading: false,
    allSpecialUidsError: null,
    allSpecialUidsData: null,
    // specific special uid
    specificSpecialUidLoading: false,
    specificSpecialUidError: null,
    specificSpecialUidData: null,
    // create special uid
    createSpecialUidLoading: false,
    createSpecialUidError: null,
    createSpecialUidData: null,
    // update special uid
    editSpecialUidLoading: false,
    editSpecialUidError: null,
    editSpecialUidData: null,
    // delete special uid
    deleteSpecialUidLoading: false,
    deleteSpecialUidError: null,
    deleteSpecialUidData: null,
    // give special uid to user
    giveSpecialUidToUserLoading: false,
    giveSpecialUidToUserError: null,
    giveSpecialUidToUserData: null,
    // remove special uid from user
    removeSpecialUidFromUserLoading: false,
    removeSpecialUidFromUserError: null,
    removeSpecialUidFromUserData: null,
};

// All special uids
export const allSpecialUids = createAsyncThunk(
    "/super-admin/special-uids/all",
    async (args: AllSpecialUidsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await specialUidsServices.allSpecialUids(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specific special uid
export const specificSpecialUid = createAsyncThunk(
    "/super-admin/special-uids/id",
    async (args: SpecificSpecialUidData, thunkAPI) => {
        try {
            const { uid, token } = args;
            return await specialUidsServices.specificSpecialUid(token, uid);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create special uid
export const createSpecialUid = createAsyncThunk(
    "/super-admin/special-uids/store",
    async (args: CreateSpecialUidData, thunkAPI) => {
        try {
            const { formData, token } = args;
            return await specialUidsServices.createSpecialUid(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// update special uid
export const editSpecialUid = createAsyncThunk(
    "/super-admin/special-uids/update/id",
    async (args: EditSpecialUidData, thunkAPI) => {
        try {
            const { formData, token, specialUid_id } = args;
            return await specialUidsServices.editSpecialUid(
                token,
                formData,
                specialUid_id
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

// delete special uid
export const deleteSpecialUid = createAsyncThunk(
    "/super-admin/special-uids/delete/id",
    async (args: DeleteSpecialUidData, thunkAPI) => {
        try {
            const { token, uid } = args;
            return await specialUidsServices.deleteSpecialUid(token, uid);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// give special uid to user
export const giveSpecialUidToUser = createAsyncThunk(
    "/super-admin/special-uids/give-to-user/specialUid_id",
    async (args: GiveSpecialUidToUserData, thunkAPI) => {
        try {
            const { token, formData, specialUid_id } = args;
            return await specialUidsServices.giveSpecialUidToUser(
                token,
                formData,
                specialUid_id
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

// remove special uid from user
export const removeSpecialUidFromUser = createAsyncThunk(
    "/super-admin/special-uids/remove-from-user/user_id",
    async (args: RemoveSpecialUidFromUserData, thunkAPI) => {
        try {
            const { token, specialUid_id } = args;
            return await specialUidsServices.removeSpecialUidFromUser(
                token,
                specialUid_id
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

export const specialUidsSlice = createSlice({
    name: "specialUids",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetGiveSpecialUidToUserDataError: (state) => ({
            ...state,
            giveSpecialUidToUserData: null,
            giveSpecialUidToUserError: null,
        }),
        resetCreateEditSpecialUidDataError: (state) => ({
            ...state,
            createSpecialUidData: null,
            createSpecialUidError: null,
            editSpecialUidData: null,
            editSpecialUidError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All Rooms
            .addCase(allSpecialUids.pending, (state) => {
                state.allSpecialUidsLoading = true;
            })
            .addCase(allSpecialUids.fulfilled, (state, action) => {
                state.allSpecialUidsLoading = false;
                const { data } = action.payload;
                state.allSpecialUidsData = data;
            })
            .addCase(allSpecialUids.rejected, (state, action) => {
                state.allSpecialUidsLoading = false;
                state.allSpecialUidsError = action.payload;
            })
            // specific special uid
            .addCase(specificSpecialUid.pending, (state) => {
                state.specificSpecialUidLoading = true;
            })
            .addCase(specificSpecialUid.fulfilled, (state, action) => {
                state.specificSpecialUidLoading = false;
                const { data } = action.payload;
                state.specificSpecialUidData = data;
            })
            .addCase(specificSpecialUid.rejected, (state, action) => {
                state.specificSpecialUidLoading = false;
                state.specificSpecialUidError = action.payload;
            })
            // create special uid
            .addCase(createSpecialUid.pending, (state) => {
                state.createSpecialUidLoading = true;
            })
            .addCase(createSpecialUid.fulfilled, (state, action) => {
                state.createSpecialUidLoading = false;
                const { data } = action.payload;
                state.createSpecialUidData = data;
            })
            .addCase(createSpecialUid.rejected, (state, action) => {
                state.createSpecialUidLoading = false;
                state.createSpecialUidError = action.payload;
            })
            // update special uid
            .addCase(editSpecialUid.pending, (state) => {
                state.editSpecialUidLoading = true;
            })
            .addCase(editSpecialUid.fulfilled, (state, action) => {
                state.editSpecialUidLoading = false;
                const { data, formData } = action.payload;
                state.editSpecialUidData = data;

                // edit special uid
                const body = formData.get("body");
                const price = formData.get("price");
                const currentState: InitialSpecialUidState = current(state);

                const newSpecificSpecialUid = {
                    ...currentState.specificSpecialUidData,
                    price: price
                        ? +price
                        : currentState.specificSpecialUidData?.price,
                    body: body
                        ? +body
                        : currentState.specificSpecialUidData?.body,
                };

                // @ts-ignore
                state.specificSpecialUidData = newSpecificSpecialUid;
            })
            .addCase(editSpecialUid.rejected, (state, action) => {
                state.editSpecialUidLoading = false;
                state.editSpecialUidError = action.payload;
            })
            // delete special uid
            .addCase(deleteSpecialUid.pending, (state) => {
                state.deleteSpecialUidLoading = true;
            })
            .addCase(deleteSpecialUid.fulfilled, (state, action) => {
                state.deleteSpecialUidLoading = false;
                const { data, specialUid_id } = action.payload;
                state.deleteSpecialUidData = data;

                // delete special uid => specifc uid page

                // @ts-ignore
                state.specificSpecialUidData = null;

                // delete special uid => uids page
                const currentState: InitialSpecialUidState = current(state);
                const filteredData = [
                    ...currentState.allSpecialUidsData?.data!,
                ].filter((one) => one.id !== +specialUid_id);

                const newAllSpecialUid = {
                    ...currentState.allSpecialUidsData,
                    data: filteredData,
                };

                // @ts-ignore
                state.allSpecialUidsData = newAllSpecialUid;
            })
            .addCase(deleteSpecialUid.rejected, (state, action) => {
                state.deleteSpecialUidLoading = false;
                state.deleteSpecialUidError = action.payload;
            })
            // give special uid to user
            .addCase(giveSpecialUidToUser.pending, (state) => {
                state.giveSpecialUidToUserLoading = true;
            })
            .addCase(giveSpecialUidToUser.fulfilled, (state, action) => {
                state.giveSpecialUidToUserLoading = false;
                const { data } = action.payload;
                state.giveSpecialUidToUserData = data;

                // give specialUid from user
                const currentState: InitialSpecialUidState = current(state);
                const newSpecificSpecialUid = {
                    ...currentState.specificSpecialUidData,
                    is_purchased: 1,
                };

                // @ts-ignore
                state.specificSpecialUidData = newSpecificSpecialUid;
            })
            .addCase(giveSpecialUidToUser.rejected, (state, action) => {
                state.giveSpecialUidToUserLoading = false;
                state.giveSpecialUidToUserError = action.payload;
            })
            // remove special uid from user
            .addCase(removeSpecialUidFromUser.pending, (state) => {
                state.removeSpecialUidFromUserLoading = true;
            })
            .addCase(removeSpecialUidFromUser.fulfilled, (state, action) => {
                state.removeSpecialUidFromUserLoading = false;
                const { data } = action.payload;
                state.removeSpecialUidFromUserData = data;

                // remove specialUid from user
                const currentState: InitialSpecialUidState = current(state);
                const newSpecificSpecialUid = {
                    ...currentState.specificSpecialUidData,
                    is_purchased: 0,
                    user: null,
                };

                // @ts-ignore
                state.specificSpecialUidData = newSpecificSpecialUid;
            })
            .addCase(removeSpecialUidFromUser.rejected, (state, action) => {
                state.removeSpecialUidFromUserLoading = false;
                state.removeSpecialUidFromUserError = action.payload;
            });
    },
});

export const {
    reset,
    resetGiveSpecialUidToUserDataError,
    resetCreateEditSpecialUidDataError,
} = specialUidsSlice.actions;
export default specialUidsSlice.reducer;
