import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import usersServices from "../../services/users/usersServices";

// interfaces
import {
    InitialUsersState,
    AllUsersData,
    SpecificUserData,
    editUserDataI,
    deleteUserDataI,
    blockUserDataI,
    unblockUserDataI,
    UserIdByUidData,
} from "../../../interfaces/store/users/users";
import { Error } from "../../../interfaces/public";

const initialState: InitialUsersState = {
    // all users
    allUsersLoading: false,
    allUsersData: null,
    allUsersError: null,
    // specific user
    specificUserLoading: false,
    specificUserData: null,
    specificUserError: null,
    // edit user
    editUserLoading: false,
    editUserData: null,
    editUserError: null,
    // delete user
    deleteUserLoading: false,
    deleteUserData: null,
    deleteUserError: null,
    // block user
    blockUserLoading: false,
    blockUserData: null,
    blockUserError: null,
    // unblock user
    unblockUserLoading: false,
    unblockUserData: null,
    unblockUserError: null,
    // user id by uid
    useridByIdLoading: false,
    useridByIdData: null,
    useridByIdError: null,
};

// all users
export const getAllUsers = createAsyncThunk(
    "/super-admin/users/all",
    async (args: AllUsersData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await usersServices.allUsers(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// specifc users
export const specificUser = createAsyncThunk(
    "/super-admin/users/id",
    async (args: SpecificUserData, thunkAPI) => {
        try {
            const { userId, token } = args;
            return await usersServices.specificUser(token, userId);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit users
export const editUser = createAsyncThunk(
    "/super-admin/users/update/id",
    async (args: editUserDataI, thunkAPI) => {
        try {
            const { userId, token, formData } = args;
            return await usersServices.editUser(token, userId, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete users
export const deleteUser = createAsyncThunk(
    "/super-admin/users/delete/id",
    async (args: deleteUserDataI, thunkAPI) => {
        try {
            const { userId, token } = args;
            return await usersServices.deleteUser(token, userId);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// block user
export const blockUser = createAsyncThunk(
    "/super-admin/users/block/id",
    async (args: blockUserDataI, thunkAPI) => {
        try {
            const { userId, token, formData } = args;
            return await usersServices.blockUser(token, userId, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// unblock user
export const unblockUser = createAsyncThunk(
    "/super-admin/users/unblock/id",
    async (args: unblockUserDataI, thunkAPI) => {
        try {
            const { userId, token } = args;
            return await usersServices.unblockUser(token, userId);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// user id by uid
export const usersIdByUid = createAsyncThunk(
    "/super-admin/users/search?uid",
    async (args: UserIdByUidData, thunkAPI) => {
        try {
            const { uid, token } = args;
            return await usersServices.usersIdByUid(token, uid);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // all users
            .addCase(getAllUsers.pending, (state) => {
                state.allUsersLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsersLoading = false;
                const { data } = action.payload;
                state.allUsersData = data;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.allUsersLoading = false;
                state.allUsersError = action.payload;
            })
            // specifc users
            .addCase(specificUser.pending, (state) => {
                state.specificUserLoading = true;
            })
            .addCase(specificUser.fulfilled, (state, action) => {
                state.specificUserLoading = false;
                const { data } = action.payload;
                state.specificUserData = data;
            })
            .addCase(specificUser.rejected, (state, action) => {
                state.specificUserLoading = false;
                state.specificUserError = action.payload;
            })
            // edit users
            .addCase(editUser.pending, (state) => {
                state.editUserLoading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.editUserLoading = false;
                const { data } = action.payload;
                state.editUserData = data;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.editUserLoading = false;
                state.editUserError = action.payload;
            })
            // delete users
            .addCase(deleteUser.pending, (state) => {
                state.deleteUserLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteUserLoading = false;
                const { data } = action.payload;
                state.deleteUserData = data;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserLoading = false;
                state.deleteUserError = action.payload;
            })
            // block users
            .addCase(blockUser.pending, (state) => {
                state.blockUserLoading = true;
            })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.blockUserLoading = false;
                const { data } = action.payload;
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تمت العمليه بنجاح",
                    };
                    state.blockUserData = modifiedChargeData;
                    state.unblockUserData = null;
                } else {
                    state.blockUserData = data;
                }
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.blockUserLoading = false;
                state.blockUserError = action.payload;
            })
            // unblock users
            .addCase(unblockUser.pending, (state) => {
                state.unblockUserLoading = true;
            })
            .addCase(unblockUser.fulfilled, (state, action) => {
                state.unblockUserLoading = false;
                const { data } = action.payload;
                if (!data) {
                    const modifiedChargeData = {
                        status: true,
                        errNum: "",
                        msg: "لقد تمت العمليه بنجاح",
                    };
                    state.blockUserData = null;
                    state.unblockUserData = modifiedChargeData;
                } else {
                    state.unblockUserData = data;
                }
            })
            .addCase(unblockUser.rejected, (state, action) => {
                state.unblockUserLoading = false;
                state.unblockUserError = action.payload;
            })
            // user id by uid
            .addCase(usersIdByUid.pending, (state) => {
                state.useridByIdLoading = true;
            })
            .addCase(usersIdByUid.fulfilled, (state, action) => {
                state.useridByIdLoading = false;
                const { data } = action.payload;
                state.useridByIdData = data;
            })
            .addCase(usersIdByUid.rejected, (state, action) => {
                state.useridByIdLoading = false;
                state.useridByIdError = action.payload;
            });
    },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
