import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://67f29b43ec56ec1a36d3a01c.mockapi.io/users',
});
export const signup = createAsyncThunk(
    'auth/signup',
    async ({username, email, password}: { username: string; email: string; password: string }) => {
        try {
            const response = await api.post('', {username, email, password});
            return response.data;
        } catch (error) {
            throw new Error('Error during signup');
        }
    }
);

const initialState = {
    username: localStorage.getItem("users") || null,
    status: 'idle',
    error: null,
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
            localStorage.removeItem("password");
            localStorage.removeItem("favoriteRecipes");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload.username; // Assuming the API returns the username
                localStorage.setItem("users", action.payload.username);
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {setUsername, logout} = authSlice.actions;
export default authSlice.reducer;
