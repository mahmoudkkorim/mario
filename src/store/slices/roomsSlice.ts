import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import roomsServices from "../services/roomsServices";

// interfaces
import { Error } from "../../interfaces/public";
import {
    InitialRoomsState,
    AllRoomsData,
    createRoomData,
    deleteRoomData,
    editRoomData,
    specificRoomData,
} from "../../interfaces/store/room";

const initialState: InitialRoomsState = {
    // AllRooms
    allRoomsLoading: false,
    allRoomsError: null,
    allRoomsData: null,
    // specific Room
    specificRoomLoading: false,
    specificRoomError: null,
    specificRoomData: null,
    // create Room
    createRoomLoading: false,
    createRoomError: null,
    createRoomData: null,
    // edit Room
    editRoomLoading: false,
    editRoomError: null,
    editRoomData: null,
    // delete Room
    deleteRoomLoading: false,
    deleteRoomError: null,
    deleteRoomData: null,
};

// AllRooms
export const allRooms = createAsyncThunk(
    "/super-admin/room-backgrounds/all",
    async (args: AllRoomsData, thunkAPI) => {
        try {
            const { page, token } = args;
            return await roomsServices.allRooms(token, page);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// Specfic Room
export const specificRoom = createAsyncThunk(
    "/super-admin/room-backgrounds/id",
    async (args: specificRoomData, thunkAPI) => {
        try {
            const { room_id, token } = args;
            return await roomsServices.specificRoom(token, room_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// Create Room
export const createRoom = createAsyncThunk(
    "/super-admin/room-backgrounds/store",
    async (args: createRoomData, thunkAPI) => {
        try {
            const { formData, token } = args;
            return await roomsServices.createRoom(token, formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// edit Room
export const editRoom = createAsyncThunk(
    "/super-admin/room-backgrounds/update/id",
    async (args: editRoomData, thunkAPI) => {
        try {
            const { formData, token, room_id } = args;
            return await roomsServices.editRoom(token, formData, room_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// delete Room
export const deleteRoom = createAsyncThunk(
    "/super-admin/room-backgrounds/delete/id",
    async (args: deleteRoomData, thunkAPI) => {
        try {
            const { token, room_id } = args;
            return await roomsServices.deleteRoom(token, room_id);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetEditCreateRoom: (state) => ({
            ...state,
            editRoomData: null,
            createRoomData: null,
        }),
    },
    extraReducers: (builder) => {
        builder
            // All Rooms
            .addCase(allRooms.pending, (state) => {
                state.allRoomsLoading = true;
            })
            .addCase(allRooms.fulfilled, (state, action) => {
                state.allRoomsLoading = false;
                const { data } = action.payload;
                state.allRoomsData = data;
            })
            .addCase(allRooms.rejected, (state, action) => {
                state.allRoomsLoading = false;
                state.allRoomsError = action.payload;
            })
            // Specific Room
            .addCase(specificRoom.pending, (state) => {
                state.specificRoomLoading = true;
            })
            .addCase(specificRoom.fulfilled, (state, action) => {
                state.specificRoomLoading = false;
                const { data } = action.payload;
                state.specificRoomData = data;
            })
            .addCase(specificRoom.rejected, (state, action) => {
                state.specificRoomLoading = false;
                state.specificRoomError = action.payload;
            })
            // create Room
            .addCase(createRoom.pending, (state) => {
                state.createRoomLoading = true;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.createRoomLoading = false;
                const { data } = action.payload;
                state.createRoomData = data;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.createRoomLoading = false;
                state.createRoomError = action.payload;
            })
            // edit Room
            .addCase(editRoom.pending, (state) => {
                state.editRoomLoading = true;
            })
            .addCase(editRoom.fulfilled, (state, action) => {
                state.editRoomLoading = false;
                const { data } = action.payload;
                state.editRoomData = data;
            })
            .addCase(editRoom.rejected, (state, action) => {
                state.editRoomLoading = false;
                state.editRoomError = action.payload;
            })
            // delete Room
            .addCase(deleteRoom.pending, (state) => {
                state.deleteRoomLoading = true;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.deleteRoomLoading = false;
                const { data } = action.payload;
                state.deleteRoomData = data;
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.deleteRoomLoading = false;
                state.deleteRoomError = action.payload;
            });
    },
});

export const { reset, resetEditCreateRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
