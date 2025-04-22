import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import RecipeCard from '../components/RecipeCard.tsx';

interface Recipe {
    id: string;
    title: string;
    cookingtime: string;
    calories: string;
    rating: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    username: string;
    dietaryRestrictions: string[];
}

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState<string[]>([]);

    useEffect(() => {
        axios
            .get('https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes')
            .then((response) => {
                const sortedRecipes = response.data.sort((a, b) => b.id - a.id);
                setRecipes(sortedRecipes);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleDietaryFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedDietaryRestrictions((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((restriction) => restriction !== value)
                : [...prevSelected, value]
        );
    };

    const dietaryOptions = [
        {label: 'Vegan', value: 'vegan'},
        {label: 'Gluten-Free', value: 'gluten-free'},
        {label: 'Dairy-Free', value: 'dairy-free'},
    ];

    const filteredRecipes = recipes.filter((recipe) => {
        const query = searchQuery.toLowerCase();

        // Ensure dietaryRestrictions is an array and check for dietary restrictions
        const matchesDietaryRestrictions =
            selectedDietaryRestrictions.length === 0 ||
            selectedDietaryRestrictions.every((restriction) =>
                Array.isArray(recipe.dietaryRestrictions) &&
                recipe.dietaryRestrictions.some((dietaryRestriction) =>
                    dietaryRestriction.toLowerCase().includes(restriction.toLowerCase()) // case-insensitive match
                )
            );

        // Filter by search query and dietary restrictions
        return (
            matchesDietaryRestrictions &&
            (recipe.title.toLowerCase().includes(query) ||
                recipe.cookingtime.toLowerCase().includes(query) ||
                recipe.username.toLowerCase().includes(query) ||
                recipe.calories.toLowerCase().includes(query) ||
                recipe.cookingtime.toLowerCase().includes(query) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().includes(query)
                ))
        );
    });


    return (
        <div className="container mx-auto p-12 mt-24">
            <div className="mb-8 flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 border border-gray-300 rounded-full md:w-1/2 w-11/12 mb-4"
                />

                <div className="flex justify-center space-x-4">
                    {dietaryOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredRecipes.length === 0 ? (
                    <p className="col-span-full text-center text-lg">No recipes found</p>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, ease: 'easeOut'}}
                            viewport={{once: true}}
                            className="recipe-card"
                        >
                            <RecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                cookingtime={recipe.cookingtime}
                                calories={recipe.calories}
                                rating={recipe.rating}
                                image={recipe.image}
                                ingredients={recipe.ingredients}
                                instructions={recipe.instructions}
                                username={recipe.username}
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Recipes;
