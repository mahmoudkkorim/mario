import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from "universal-cookie";

import authServices from "../services/authServices";

// interfaces
import { InitialAuthState, LoginFormData } from "../../interfaces/store/auth";
import { Error } from "../../interfaces/public";

// initialize cookie
const cookies = new Cookies();

const initialState: InitialAuthState = {
    // login
    loginLoading: false,
    loginError: null,
    loginData: null || { access_token: cookies.get("token") },
    // logout
    logoutLoading: false,
    logoutError: null,
    // me
    meLoading: false,
    meData: null,
    meError: null,
};

// Login
export const login = createAsyncThunk(
    "posts/super-admin/auth",
    async (formData: LoginFormData, thunkAPI) => {
        try {
            return await authServices.login(formData);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "posts/super-admin/logout",
    async (token: string, thunkAPI) => {
        try {
            return await authServices.logout(token);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

// me
export const me = createAsyncThunk(
    "posts/super-admin/me",
    async (token: string, thunkAPI) => {
        try {
            return await authServices.me(token);
        } catch (err: Error) {
            return thunkAPI.rejectWithValue(
                err.response && err.response.data.msg
                    ? err.response.data.msg
                    : err.msg
            );
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loginLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginLoading = false;
                const { data } = action.payload;

                // store token
                cookies.set("token", data?.access_token, {
                    expires: new Date(data.token_expires_in! * 1000),
                });

                state.loginData = data;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.logoutLoading = true;
                // remove token from cookies
                cookies.remove("token");
                state.loginData = {};
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.logoutLoading = false;
                state.loginData = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutLoading = false;
                state.loginError = action.payload;
            })
            // me
            .addCase(me.pending, (state) => {
                state.meLoading = true;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.meLoading = false;
                const { data } = action.payload;
                state.meData = data;
            })
            .addCase(me.rejected, (state, action) => {
                state.meLoading = false;
                state.loginError = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
