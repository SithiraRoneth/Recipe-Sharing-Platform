import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRecipe } from '../../reducers/recipeSlice';
import axios from 'axios';

const EditRecipeModal = ({ recipe, onClose, onSave }) => {
    const [title, setTitle] = useState(recipe.title || '');
    const [cookingtime, setCookingtime] = useState(recipe.cookingtime || '');
    const [calories, setCalories] = useState(recipe.calories || '');
    const [rating, setRating] = useState(recipe.rating || '');
    const [image, setImage] = useState(recipe.image || '');
    const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients || []);
    const [instructions, setInstructions] = useState<string[]>(recipe.instructions || []);
    const [username, setUsername] = useState(recipe.username || '');
    const dispatch = useDispatch();
    

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updated = [...ingredients];
        updated[index] = e.target.value;
        setIngredients(updated);
    };

    const handleInstructionsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updated = [...instructions];
        updated[index] = e.target.value;
        setInstructions(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedRecipe = {
            ...recipe,
            title,
            cookingtime,
            calories,
            rating,
            image,
            ingredients,
            instructions,
            username,
        };

        try {
            const response = await axios.put(`https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes/${recipe.id}`, updatedRecipe);
            dispatch(updateRecipe(response.data));

            alert('Recipe updated!');
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('Error updating recipe.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold mb-4 text-center">Edit Recipe</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Title', value: title, setter: setTitle },
                        { label: 'Cooking Time', value: cookingtime, setter: setCookingtime },
                        { label: 'Calories', value: calories, setter: setCalories },
                        { label: 'Rating', value: rating, setter: setRating },
                        { label: 'Image URL', value: image, setter: setImage }
                    ].map(({ label, value, setter }) => (
                        <input
                            key={label}
                            type="text"
                            placeholder={label}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    ))}

                    <div>
                        <h3 className="font-medium mb-2">Ingredients:</h3>
                        {ingredients.map((ingredient, index) => (
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
                            onClick={() => setIngredients([...ingredients, ''])}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Instructions:</h3>
                        {instructions.map((instruction, index) => (
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
                            onClick={() => setInstructions([...instructions, ''])}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            + Add Instruction
                        </button>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRecipeModal;
