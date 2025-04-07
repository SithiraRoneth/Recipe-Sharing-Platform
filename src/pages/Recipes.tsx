import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard.tsx';

interface Recipe {
    id: string;
    title: string;
    cookingtime: string;
    calories: string;
    rating: string;
    image: string;
    ingredients: string[];  // Array of ingredients
    instructions: string[]; // Array of instructions
}

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch('https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes')
            .then((res) => res.json())
            .then((data) => setRecipes(data))
            .catch((err) => console.error('Error fetching recipes:', err));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-32">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    cookingtime={recipe.cookingtime}
                    calories={recipe.calories}
                    rating={recipe.rating}
                    image={recipe.image}
                    ingredients={recipe.ingredients}  // Pass ingredients
                    instructions={recipe.instructions} // Pass instructions
                />
            ))}
        </div>
    );
};

export default Recipes;
