import {createSlice} from "@reduxjs/toolkit";
import {Recipe} from "../model/Recipe.ts";

const initialState: Recipe[] = [];

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {},
});

export default recipeSlice.reducer;
