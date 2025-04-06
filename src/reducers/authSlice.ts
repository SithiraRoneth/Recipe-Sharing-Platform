import {createSlice} from "@reduxjs/toolkit";
import {Auth} from "../model/Auth.ts";

const initialState: Auth[] = [];

const authSlice = createSlice({
    name: 'auths',
    initialState: initialState,
    reducers: {},
})

export default authSlice.reducer;
