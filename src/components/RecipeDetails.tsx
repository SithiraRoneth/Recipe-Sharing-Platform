import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircleX, Heart } from 'lucide-react';
import LoginModal from "../pages/Login"; // Import the LoginModal component

const RecipeDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, cookingtime, calories, rating, image, ingredients, instructions } = location.state || {};

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const isLoggedIn = () => {
        const user = localStorage.getItem('users');
        return user ? true : false;
    };

    // Handles closing the login modal
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const onLoginSuccess = (username: string) => {
        localStorage.setItem('users', username);
        alert('Login successful!');
        closeLoginModal();
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleHeartClick = () => {
        if (isLoggedIn()) {
            alert('Marked as favorite!');
        } else {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mt-20 md:h-[88vh] overflow-hidden">
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl overflow-hidden p-6 h-full">
                    {/* Left Column: Image, Recipe Details, Ingredients */}
                    <div className="flex flex-col items-center md:items-start">
                        <img
                            src={image}
                            alt={title}
                            className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
                        <p className="text-sm text-gray-600">Cooking Time: {cookingtime}</p>
                        <p className="text-sm text-gray-600">Calories: {calories}</p>
                        <p className="text-sm text-yellow-600 font-medium">⭐ {rating}</p>

                        {/* Ingredients Section */}
                        <div className="mt-6 w-full overflow-y-auto h-[40vh] md:h-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
                            <ul className="list-disc text-gray-600 pl-6">
                                {ingredients?.map((ingredient, index) => (
                                    <li key={index} className="text-sm">{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Instructions */}
                    <div className="overflow-y-auto h-[50vh] md:h-auto">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
                        <ol className="list-decimal pl-6 text-gray-600">
                            {instructions?.map((step, index) => (
                                <li key={index} className="text-sm">{step}</li>
                            ))}
                        </ol>
                    </div>

                    {/* Cancel Button and Heart Button */}
                    <div className="absolute bottom-4 right-4 flex space-x-4">
                        {/* Cancel Button */}
                        <button
                            onClick={handleClose}
                            className="text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
                        >
                            <CircleX className="w-6 h-6" />
                        </button>

                        {/* Heart Button */}
                        <button
                            onClick={handleHeartClick}
                            className="text-red-500 bg-white p-2 rounded-full border-2 border-red-500 hover:bg-red-100"
                        >
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {isLoginModalOpen && <LoginModal closeLoginModal={closeLoginModal} onLoginSuccess={onLoginSuccess} />}
        </>
    );
};

export default RecipeDetail;
