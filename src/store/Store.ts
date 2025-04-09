import {configureStore} from "@reduxjs/toolkit";
import recipeSlice from "../reducers/recipeSlice.ts";
import authSlice from "../reducers/authSlice.ts";

export const Store = configureStore({
    reducer: {
        recipeSlice: recipeSlice,
        authSlice: authSlice,
    }
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
