import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../../reducers/recipeSlice.ts';
import Swal from "sweetalert2";

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [cookingtime, setCookingtime] = useState('');
    const [calories, setCalories] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState<string[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedUsername = localStorage.getItem('users');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const dietaryOptions = [
        { label: 'Vegan', value: 'vegan' },
        { label: 'Gluten-Free', value: 'gluten-free' },
        { label: 'Dairy-Free', value: 'dairy-free' },
    ];

    const handleDietaryFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedDietaryRestrictions((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((restriction) => restriction !== value)
                : [...prevSelected, value]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newRecipe = {
                title,
                cookingtime,
                calories,
                rating,
                image,
                ingredients,
                instructions,
                username,
                dietaryRestrictions: selectedDietaryRestrictions,
            };
            await dispatch(addRecipe(newRecipe));

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Recipe Added",
                showConfirmButton: false,
                timer: 1500
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error details:', error);
            alert('Error adding recipe.');
        }
    };

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

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800 transition"
            >
                + New
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Recipe</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: 'Title', value: title, setter: setTitle },
                                { label: 'Cooking Time', value: cookingtime, setter: setCookingtime },
                                { label: 'Calories', value: calories, setter: setCalories },
                                { label: 'Rating', value: rating, setter: setRating },
                                { label: 'Image URL', value: image, setter: setImage },
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

                            {/* Dietary Restrictions Section */}
                            <div>
                                <h3 className="font-medium mb-2">Dietary Restrictions:</h3>
                                {dietaryOptions.map((option) => (
                                    <label key={option.value} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="checkbox"
                                            value={option.value}
                                            onChange={handleDietaryFilterChange}
                                            checked={selectedDietaryRestrictions.includes(option.value)}
                                            className="w-4 h-4"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRecipe;
