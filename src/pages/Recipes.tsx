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
    username:string;
}

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        axios
            .get('https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes')
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = recipes.filter((recipe) => {
        const query = searchQuery.toLowerCase();

        return (
            recipe.title.toLowerCase().includes(query) ||
            recipe.cookingtime.toLowerCase().includes(query) ||
            recipe.username.toLowerCase().includes(query) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(query)
            )
        );
    });


    return (
        <div className="container mx-auto p-12 mt-24">
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 border border-gray-300 rounded-full md:w-1/2 w-11/12"
                />
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
