import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import designStoreServices from "../services/designStoreServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialDesignStoreState,
    SpecificDesignsStoreData,
    SortedFiterdDesignStoreData,
    CreateStoreDesign,
    EditStoreDesign,
    DeleteStoreDesign,
    AllDesignsStoreData,
    GetUserDesignStoreData,
    GiveDesignStoreToUserData,
    RemoveDesignStoreFromUserData,
} from "../../interfaces/store/designStore";

const initialState: InitialDesignStoreState = {
    // All designs store
    allDesignsStoreLoading: false,
    allDesignsStoreError: null,
    allDesignsStoreData: null,
    // sorted design store
    sortedFilteredDesignsStoreLoading: false,
    sortedFilteredDesignsStoreError: null,
    sortedFilteredDesignsStoreData: null,
    // specifc design store
    specificDesignStoreLoading: false,
    specificDesignStoreData: null,
    specificDesignStoreError: null,
    // create design store
    createDesignStoreLoading: false,
    createDesignStoreError: null,
    createDesignStoreData: null,
    // edit design store
    editDesignStoreLoading: false,
    editDesignStoreError: null,
    editDesignStoreData: null,
    // delete design store
    deleteDesignStoreLoading: false,
    deleteDesignStoreError: null,
    deleteDesignStoreData: null,
    // get user design store
    getUserDesignStoreLoading: false,
    getUserDesignStoreError: null,
    getUserDesignStoreData: null,
    // give design store to user
    giveDesignStoreToUserLoading: false,
    giveDesignStoreToUserError: null,
    giveDesignStoreToUserData: null,
    // remove design store from user
    removeDesignStoreFromUserLoading: false,
    removeDesignStoreFromUserError: null,
    removeDesignStoreFromUserData: null,
};

// All designs store
export const allDesignsStore = createAsyncThunk(
    "/super-admin/decorations/all",
    async (args: AllDesignsStoreData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await designStoreServices.designStore(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// Sorted and filterd designs store
export const sortedFilteredDesignsStore = createAsyncThunk(
    "/super-admin/decorations/sort/filter",
    async (
        SortedFiterdDesignStoreData: SortedFiterdDesignStoreData,
        thunkAPI
    ) => {
        try {
            const { token, type, page } = SortedFiterdDesignStoreData;

            return await designStoreServices.sortedFiteredDesignStore(
                token,
                type,
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

// specific designs store
export const specificDesignsStore = createAsyncThunk(
    "/super-admin/decorations/all/id",
    async (data: SpecificDesignsStoreData, thunkAPI) => {
        try {
            const { id, token } = data;
            return await designStoreServices.specificDesignStore(token, id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// create designs store
export const createDesignsStore = createAsyncThunk(
    "/super-admin/decorations/store",
    async (data: CreateStoreDesign, thunkAPI) => {
        try {
            const { formData, token } = data;
            return await designStoreServices.createDesignStore({
                token,
                formData,
            });
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit designs store
export const editDesignsStore = createAsyncThunk(
    "/super-admin/decorations/update",
    async (data: EditStoreDesign, thunkAPI) => {
        try {
            const { formData, token, id } = data;
            return await designStoreServices.editDesignStore({
                token,
                formData,
                id,
            });
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete designs store
export const deleteDesignsStore = createAsyncThunk(
    "/super-admin/decorations/delete",
    async (data: DeleteStoreDesign, thunkAPI) => {
        try {
            const { token, id } = data;
            return await designStoreServices.delteDesignStore({
                token,
                id,
            });
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// get user design store
export const getUserDesignStore = createAsyncThunk(
    "/super-admin/decorations/get-user/id",
    async (data: GetUserDesignStoreData, thunkAPI) => {
        try {
            const { token, user_id } = data;
            return await designStoreServices.getUserDesignStore(token, user_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// give design store to user
export const giveDesignStoreToUser = createAsyncThunk(
    "/super-admin/decorations/give-to-user/id",
    async (data: GiveDesignStoreToUserData, thunkAPI) => {
        try {
            const { token, designStore_id, formData } = data;
            return await designStoreServices.giveDesignStoreToUser(
                token,
                formData,
                designStore_id
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

// remove design store from user
export const removeDesignStoreFromUser = createAsyncThunk(
    "/super-admin/decorations/remove-from-user/id",
    async (data: RemoveDesignStoreFromUserData, thunkAPI) => {
        try {
            const { token, designStore_id, formData } = data;
            return await designStoreServices.removeDesignStoreFromUser(
                token,
                formData,
                designStore_id
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

export const designStoreSlice = createSlice({
    name: "designStore",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateDesignStore: (state) => ({
            ...state,
            editDesignStoreData: null,
            createDesignStoreData: null,
        }),
        resetgiveDesignStoreDataError: (state) => ({
            ...state,
            giveDesignStoreToUserData: null,
            giveDesignStoreToUserError: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // allDesignsStore
            .addCase(allDesignsStore.pending, (state) => {
                state.allDesignsStoreLoading = true;
            })
            .addCase(allDesignsStore.fulfilled, (state, action) => {
                state.allDesignsStoreLoading = false;
                const { data } = action.payload;
                state.allDesignsStoreData = data;
            })
            .addCase(allDesignsStore.rejected, (state, action) => {
                state.allDesignsStoreLoading = false;
                state.allDesignsStoreError = action.payload;
            })
            // sortedFilteredDesignsStore
            .addCase(sortedFilteredDesignsStore.pending, (state) => {
                state.sortedFilteredDesignsStoreLoading = true;
            })
            .addCase(sortedFilteredDesignsStore.fulfilled, (state, action) => {
                state.sortedFilteredDesignsStoreLoading = false;
                const { data } = action.payload;
                state.sortedFilteredDesignsStoreData = data;
            })
            .addCase(sortedFilteredDesignsStore.rejected, (state, action) => {
                state.sortedFilteredDesignsStoreLoading = false;
                state.sortedFilteredDesignsStoreError = action.payload;
            })
            // specificDesignStore
            .addCase(specificDesignsStore.pending, (state) => {
                state.specificDesignStoreLoading = true;
            })
            .addCase(specificDesignsStore.fulfilled, (state, action) => {
                state.specificDesignStoreLoading = false;
                const { data } = action.payload;
                state.specificDesignStoreData = data;
            })
            .addCase(specificDesignsStore.rejected, (state, action) => {
                state.specificDesignStoreLoading = false;
                state.specificDesignStoreError = action.payload;
            })
            // createDesignStore
            .addCase(createDesignsStore.pending, (state) => {
                state.createDesignStoreLoading = true;
            })
            .addCase(createDesignsStore.fulfilled, (state, action) => {
                state.createDesignStoreLoading = false;
                // const { data } = action.payload;

                // backend api never give me any response
                state.createDesignStoreData = "created";
            })
            .addCase(createDesignsStore.rejected, (state, action) => {
                state.createDesignStoreLoading = false;
                state.createDesignStoreError = action.payload;
            })
            // editDesignStore
            .addCase(editDesignsStore.pending, (state) => {
                state.editDesignStoreLoading = true;
            })
            .addCase(editDesignsStore.fulfilled, (state, action) => {
                state.editDesignStoreLoading = false;
                // const { data } = action.payload;

                // backend api never give me any response
                state.editDesignStoreData = "edited";
            })
            .addCase(editDesignsStore.rejected, (state, action) => {
                state.editDesignStoreLoading = false;
                state.editDesignStoreError = action.payload;
            })
            // deleteDesignStore
            .addCase(deleteDesignsStore.pending, (state) => {
                state.deleteDesignStoreLoading = true;
            })
            .addCase(deleteDesignsStore.fulfilled, (state, action) => {
                state.deleteDesignStoreLoading = false;
                const { data } = action.payload;
                state.deleteDesignStoreData = data;
            })
            .addCase(deleteDesignsStore.rejected, (state, action) => {
                state.deleteDesignStoreLoading = false;
                state.deleteDesignStoreError = action.payload;
            })
            // get user design store
            .addCase(getUserDesignStore.pending, (state) => {
                state.getUserDesignStoreLoading = true;
            })
            .addCase(getUserDesignStore.fulfilled, (state, action) => {
                state.getUserDesignStoreLoading = false;
                const { data } = action.payload;
                state.getUserDesignStoreData = data;
            })
            .addCase(getUserDesignStore.rejected, (state, action) => {
                state.getUserDesignStoreLoading = false;
                state.getUserDesignStoreError = action.payload;
            })
            // give design store to user
            .addCase(giveDesignStoreToUser.pending, (state) => {
                state.giveDesignStoreToUserLoading = true;
            })
            .addCase(giveDesignStoreToUser.fulfilled, (state, action) => {
                state.giveDesignStoreToUserLoading = false;
                const { data } = action.payload;
                state.giveDesignStoreToUserData = data;
            })
            .addCase(giveDesignStoreToUser.rejected, (state, action) => {
                state.giveDesignStoreToUserLoading = false;
                state.giveDesignStoreToUserError = action.payload;
            })
            // remove design store from user
            .addCase(removeDesignStoreFromUser.pending, (state) => {
                state.removeDesignStoreFromUserLoading = true;
            })
            .addCase(removeDesignStoreFromUser.fulfilled, (state, action) => {
                state.removeDesignStoreFromUserLoading = false;
                const { data, designStore_id } = action.payload;
                state.removeDesignStoreFromUserData = data;

                // remove design from decorations array
                let currentState: InitialDesignStoreState = current(state);
                const newGetUserDesignStoreData = {
                    ...currentState.getUserDesignStoreData,
                    decorations:
                        currentState.getUserDesignStoreData?.decorations.filter(
                            (dec) => dec.id !== designStore_id
                        ),
                };

                // @ts-ignore
                state.getUserDesignStoreData = newGetUserDesignStoreData;
            })
            .addCase(removeDesignStoreFromUser.rejected, (state, action) => {
                state.removeDesignStoreFromUserLoading = false;
                state.removeDesignStoreFromUserError = action.payload;
            });
    },
});

export const {
    reset,
    resetEditCreateDesignStore,
    resetgiveDesignStoreDataError,
} = designStoreSlice.actions;
export default designStoreSlice.reducer;
