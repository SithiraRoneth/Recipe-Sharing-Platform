import React, {useState} from "react";
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
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateRecipe, deleteRecipe} from "../../reducers/recipeSlice.ts";
import Swal from "sweetalert2";

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
            username,
        };

        try {
            // Dispatch the async thunk for updating the recipe
            const actionResult = await dispatch(updateRecipe(updatedRecipe));

            if (updateRecipe.fulfilled.match(actionResult)) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Recipe Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });
                handleClose();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Update Recipe",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Failed to update recipe:", error);
            alert("Failed to update recipe.");
        }
    };


    const handleDelete = async () => {
        try {
            const actionResult = await dispatch(deleteRecipe(id));

            if (deleteRecipe.fulfilled.match(actionResult)) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Recipe Deleted",
                    showConfirmButton: false,
                    timer: 1500,
                });
                handleClose();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Delete Recipe",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
            alert("Failed to delete recipe.");
        }
    };


    return (
        <>
            <Card sx={{maxWidth: 345, cursor: "pointer"}} onClick={handleOpen}>
                <CardMedia sx={{height: 140}} image={image} title={title}/>
                <CardContent>
                    <Typography gutterBottom variant="h5">{title}</Typography>
                </CardContent>
            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Edit Recipe</DialogTitle>
                <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    <TextField label="Title" fullWidth value={editTitle}
                               onChange={(e) => setEditTitle(e.target.value)}/>
                    <TextField label="Cooking Time" fullWidth value={editCookingTime}
                               onChange={(e) => setEditCookingTime(e.target.value)}/>
                    <TextField label="Calories" fullWidth value={editCalories}
                               onChange={(e) => setEditCalories(e.target.value)}/>
                    <TextField label="Rating" fullWidth value={editRating}
                               onChange={(e) => setEditRating(e.target.value)}/>
                    <TextField label="Image URL" fullWidth value={editImage}
                               onChange={(e) => setEditImage(e.target.value)}/>
                    <TextField label="Ingredients" fullWidth multiline rows={2} value={editIngredients}
                               onChange={(e) => setEditIngredients(e.target.value)}/>
                    <TextField label="Instructions" fullWidth multiline rows={3} value={editInstructions}
                               onChange={(e) => setEditInstructions(e.target.value)}/>
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
