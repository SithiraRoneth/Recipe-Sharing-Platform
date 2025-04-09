import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Recipe} from '../model/Recipe';

const initialState: Recipe[] = [];

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            state.push(action.payload);
        },
        setRecipes: (state, action) => {
            return action.payload;
        },
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            const index = state.findIndex((recipe) => recipe.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteRecipe: (state, action: PayloadAction<string>) => {
            return state.filter((recipe) => recipe.id !== action.payload);
        },
    },
});

export const {addRecipe, updateRecipe, deleteRecipe, setRecipes} = recipeSlice.actions;

export default recipeSlice.reducer;
