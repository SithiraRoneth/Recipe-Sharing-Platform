// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
    username: string;
    email?: string;
    token: string;
}

const initialState: Auth[] = [];

const authSlice = createSlice({
    name: 'auths',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<Auth>) => {
            state.push(action.payload);
        },
        logoutUser: () => {
            return [];
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
