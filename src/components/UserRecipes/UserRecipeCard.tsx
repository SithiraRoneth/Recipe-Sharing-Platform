import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateRecipe, deleteRecipe } from "../../reducers/recipeSlice.ts";
// import { RecipeType } from "../../model/Recipe.ts";
export interface RecipeType {
    id: string;
    title: string;
    cookingtime: string;
    calories: string;
    rating: string;
    image: string;
    ingredients: string;
    instructions: string;
    username: string;
}
const UserRecipeCard: React.FC<RecipeType> = ({
                                                  id,
                                                  title,
                                                  cookingtime,
                                                  calories,
                                                  rating,
                                                  image,
                                                  ingredients,
                                                  instructions,
                                                  username
                                              }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [editTitle, setEditTitle] = useState(title);
    const [editCookingTime, setEditCookingTime] = useState(cookingtime);
    const [editCalories, setEditCalories] = useState(calories);
    const [editRating, setEditRating] = useState(rating);
    const [editImage, setEditImage] = useState(image);
    const [editIngredients, setEditIngredients] = useState(ingredients);
    const [editInstructions, setEditInstructions] = useState(instructions);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpdate = async () => {
        const updatedRecipe: RecipeType = {
            id,
            title: editTitle,
            cookingtime: editCookingTime,
            calories: editCalories,
            rating: editRating,
            image: editImage,
            ingredients: editIngredients,
            instructions: editInstructions,
            username
        };

        try {
            const response = await axios.put(
                `https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes/${id}`,
                updatedRecipe
            );
            dispatch(updateRecipe(response.data));
            alert("Recipe updated!");
            handleClose();
        } catch (error) {
            console.error("Failed to update recipe:", error);
            alert("Failed to update recipe.");
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes/${id}`);
            dispatch(deleteRecipe(id));
            alert("Recipe deleted!");
            handleClose();
        } catch (error) {
            console.error("Failed to delete recipe:", error);
            alert("Failed to delete recipe.");
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
                <CardMedia sx={{ height: 140 }} image={image} title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5">{title}</Typography>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Recipe</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField label="Title" fullWidth value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <TextField label="Cooking Time" fullWidth value={editCookingTime} onChange={(e) => setEditCookingTime(e.target.value)} />
                    <TextField label="Calories" fullWidth value={editCalories} onChange={(e) => setEditCalories(e.target.value)} />
                    <TextField label="Rating" fullWidth value={editRating} onChange={(e) => setEditRating(e.target.value)} />
                    <TextField label="Image URL" fullWidth value={editImage} onChange={(e) => setEditImage(e.target.value)} />
                    <TextField label="Ingredients" fullWidth multiline rows={2} value={editIngredients} onChange={(e) => setEditIngredients(e.target.value)} />
                    <TextField label="Instructions" fullWidth multiline rows={3} value={editInstructions} onChange={(e) => setEditInstructions(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserRecipeCard;
