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
    TextField, FormControlLabel, Checkbox
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateRecipe, deleteRecipe } from "../../reducers/recipeSlice.ts";
import Swal from "sweetalert2";

export interface RecipeType {
    id: string;
    title: string;
    cookingtime: string;
    calories: string;
    rating: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    dietaryRestrictions: string[];
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
                                                  dietaryRestrictions = [],
                                                  username
                                              }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [editTitle, setEditTitle] = useState(title);
    const [editCookingTime, setEditCookingTime] = useState(cookingtime);
    const [editCalories, setEditCalories] = useState(calories);
    const [editRating, setEditRating] = useState(rating);
    const [editImage, setEditImage] = useState(image);
    const [editIngredients, setEditIngredients] = useState<string[]>(ingredients);
    const [editInstructions, setEditInstructions] = useState<string[]>(instructions);
    const [editDietaryRestrictions, setEditDietaryRestrictions] = useState<string[]>(dietaryRestrictions); // Initialized with dietaryRestrictions

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
            dietaryRestrictions: editDietaryRestrictions,
            username
        };

        try {
            const actionResult = await dispatch(updateRecipe(updatedRecipe));

            if (updateRecipe.fulfilled.match(actionResult)) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Recipe Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                handleClose();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Update Recipe",
                    showConfirmButton: false,
                    timer: 1500
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
                    timer: 1500
                });
                handleClose();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Delete Recipe",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
            alert("Failed to delete recipe.");
        }
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedIngredients = [...editIngredients];
        updatedIngredients[index] = e.target.value;
        setEditIngredients(updatedIngredients);
    };

    const handleInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedInstructions = [...editInstructions];
        updatedInstructions[index] = e.target.value;
        setEditInstructions(updatedInstructions);
    };

    const handleDietaryRestrictionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEditDietaryRestrictions((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((restriction) => restriction !== value)
                : [...prevSelected, value]
        );
    };

    const dietaryOptions = [
        { label: "Vegan", value: "vegan" },
        { label: "Gluten-Free", value: "gluten-free" },
        { label: "Dairy-Free", value: "dairy-free" },
    ];

    return (
        <>
            <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
                <CardMedia sx={{ height: 140 }} image={image} title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {title}
                    </Typography>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Recipe</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <TextField
                        label="Cooking Time"
                        fullWidth
                        value={editCookingTime}
                        onChange={(e) => setEditCookingTime(e.target.value)}
                    />
                    <TextField
                        label="Calories"
                        fullWidth
                        value={editCalories}
                        onChange={(e) => setEditCalories(e.target.value)}
                    />
                    <TextField
                        label="Rating"
                        fullWidth
                        value={editRating}
                        onChange={(e) => setEditRating(e.target.value)}
                    />
                    <TextField
                        label="Image URL"
                        fullWidth
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                    />
                    <div>
                        <h3 className="font-medium mb-2">Ingredients:</h3>
                        {editIngredients.map((ingredient, index) => (
                            <input
                                key={index}
                                type="text"
                                value={ingredient}
                                onChange={(e) => handleIngredientsChange(e, index)}
                                placeholder={`Ingredient ${index + 1}`}
                                className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => setEditIngredients([...editIngredients, ""])}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Instructions:</h3>
                        {editInstructions.map((instruction, index) => (
                            <input
                                key={index}
                                type="text"
                                value={instruction}
                                onChange={(e) => handleInstructionsChange(e, index)}
                                placeholder={`Instruction ${index + 1}`}
                                className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => setEditInstructions([...editInstructions, ""])}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            + Add Instruction
                        </button>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Dietary Restrictions:</h3>
                        {dietaryOptions.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        value={option.value}
                                        onChange={handleDietaryRestrictionChange}
                                        checked={editDietaryRestrictions.includes(option.value)} // Use includes safely
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserRecipeCard;
