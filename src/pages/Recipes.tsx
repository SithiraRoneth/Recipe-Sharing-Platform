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
}

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-12 mt-32">
            {recipes.map((recipe) => (
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
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Recipes;
