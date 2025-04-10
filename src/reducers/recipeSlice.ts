import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Recipe} from '../model/Recipe';
import axios from "axios";

const initialState: Recipe[] = [];
const api = axios.create({
    baseURL: 'https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes'
});
export const addRecipe = createAsyncThunk<Recipe, Recipe>(
    'recipes/addRecipe',
    async (recipeData: Recipe) => {
        const response = await api.post<Recipe>('/', recipeData);
        return response.data;
    }
);
export const updateRecipe = createAsyncThunk(
    'recipes/updateRecipe',
    async (updatedRecipe: Recipe) => {
        const response = await api.put(`/${updatedRecipe.id}`, updatedRecipe);
        return response.data;
    }
);
export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id: string) => {
        await api.delete(`/${id}`);
        return id; // Return the id for the deleted recipe
    }
);
const recipeSlice = createSlice({
    name: 'recipes',
    initialState: initialState,
    reducers: {
        setRecipes: (state, action) => {
            return action.payload;
        },
        addFavorite: (state, action: PayloadAction<Recipe>) => {
            state.push(action.payload);
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            return state.filter((recipe) => recipe.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.push(action.payload);
            })
        builder
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const index = state.findIndex((recipe) => recipe.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            });
        builder
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                return state.filter((recipe) => recipe.id !== action.payload);
            });
    }
});

export const {setRecipes, addFavorite, removeFavorite} = recipeSlice.actions;

export default recipeSlice.reducer;
