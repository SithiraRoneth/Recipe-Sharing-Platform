import React from "react";
import { useNavigate } from "react-router-dom";

export interface RecipeCardProps {
    title: string;
    cookingtime: string;
    calories: string;
    rating: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    username: string;
    onFavorite: (title: string) => void;
    isFavorite: boolean;
}

const FavRecipes: React.FC<RecipeCardProps> = ({ title, cookingtime, calories, rating, image, ingredients, instructions, username, onFavorite, isFavorite }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/recipe/${title}`, {
            state: { title, cookingtime, calories, rating, image, ingredients, instructions, username }
        });
    };

    return (
        <div
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex items-center justify-between p-4 transition-transform hover:scale-105 duration-300 cursor-pointer relative"
            onClick={handleCardClick}
        >
            <div className="flex-1 pr-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-600 mt-2">Cooking Time: {cookingtime}</p>
                <p className="text-sm text-gray-600">Calories: {calories}</p>
                <p className="text-sm text-yellow-600 font-medium">⭐ {rating}</p>
                <br />
                <p className="text-sm text-gray-600 font-bold">Author : {username}</p>
            </div>

            {/* Right Side: Image */}
            <div className="w-24 h-24">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-300"
                />
            </div>

            {/* Heart Icon in Top Right Corner */}
            <div
                className={`absolute top-2 right-2 cursor-pointer text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(title);
                }}
            >
                {isFavorite ? '❤️' : '🤍'}
            </div>
        </div>
    );
};

export default FavRecipes;
