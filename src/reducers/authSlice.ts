// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("users") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
            localStorage.setItem("users", action.payload);
        },
        logout: (state) => {
            state.username = null;
            localStorage.removeItem("users");
        },
    },
});

export const { setUsername, logout } = authSlice.actions;
export default authSlice.reducer;
