import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {CircleX, Heart, Share2} from 'lucide-react';
import LoginModal from "../pages/Login";
import {Facebook, Twitter} from 'lucide-react';
import {FaWhatsapp} from 'react-icons/fa';

const RecipeDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {title, cookingtime, calories, rating, image, ingredients, instructions, username} = location.state || {};

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    const isLoggedIn = () => {
        const user = localStorage.getItem('users');
        return user ? true : false;
    };

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
    useEffect(() => {
        const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        const alreadyFavorite = favoriteRecipes.some(
            (recipe: any) => recipe.title === location.state?.title
        );
        setIsFavorite(alreadyFavorite);
    }, [location.state]);


    const handleHeartClick = () => {
        if (!isLoggedIn()) {
            setIsLoginModalOpen(true);
        } else {
            const recipeToSave = location.state;
            const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

            const isAlreadyFavorite = favoriteRecipes.some(
                (recipe: any) => recipe.title === recipeToSave.title
            );

            if (!isAlreadyFavorite) {
                const updatedFavorites = [...favoriteRecipes, recipeToSave];
                localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
                setIsFavorite(true); // Update state
                alert('Marked as favorite!');
            } else {
                alert('This recipe is already in your favorites.');
            }
        }
    };



    const handleShare = (platform: string) => {
        if (!isLoggedIn()) {
            setIsLoginModalOpen(true);
            return;
        }

        const url = window.location.href; // Get current page URL
        const text = `${title} Recipe\nCooking Time: ${cookingtime}\nCalories: ${calories}\nRating: ${rating}\nIngredients: ${ingredients?.join(", ")}\nInstructions: ${instructions?.join(", ")}\n\nAuthor: ${username}`;

        switch (platform) {
            case 'Facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank'
                );
                break;
            case 'Twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                    '_blank'
                );
                break;
            case 'WhatsApp':
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(text)}`,
                    '_blank'
                );
                break;
            default:
                alert('Invalid platform');
                break;
        }
    };

    const toggleShareOptions = () => {
        setShowShareOptions(!showShareOptions);
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 mt-20 md:h-[88vh] overflow-hidden">
                <div
                    className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-2xl overflow-hidden p-6 h-full">
                    {/* Left Column: Image, Recipe Details, Ingredients */}
                    <div className="flex flex-col items-center md:items-start">
                        <img
                            src={image}
                            alt={title}
                            className="w-80 h-40 object-cover border-2 border-gray-300 mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
                        <p className="text-sm text-gray-600">Cooking Time: {cookingtime}</p>
                        <p className="text-sm text-gray-600">Calories: {calories}</p>
                        <p className="text-sm text-yellow-600 font-medium">⭐ {rating}</p>
                        <br/>
                        <p className="text-sm text-gray-600">Author : {username}</p>

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
                            <CircleX className="w-6 h-6"/>
                        </button>

                        {/* Heart Button */}
                        <button
                            onClick={handleHeartClick}
                            className="text-red-500 bg-white p-2 rounded-full border-2 border-red-500 hover:bg-red-100"
                        >
                            {isFavorite ? (
                                <Heart fill="red" className="w-6 h-6"/> // Filled heart
                            ) : (
                                <Heart className="w-6 h-6"/> // Regular heart
                            )}
                        </button>


                        {/* Share Button & Popup */}
                        <div className="relative flex flex-col items-end space-y-2">
                            <button
                                onClick={toggleShareOptions}
                                className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600"
                            >
                                <Share2 className="w-6 h-6"/>
                            </button>

                            {showShareOptions && (
                                <div
                                    className="absolute bg-white shadow-lg rounded-md px-4 py-2 space-y-2 z-50 top-[-350%] left-[-40%] transform -translate-x-1/2">
                                    <p className="text-sm font-semibold text-gray-700">Share on:</p>
                                    <button
                                        onClick={() => handleShare('Facebook')}
                                        className="flex items-center text-blue-600 hover:underline"
                                    >
                                        <Facebook className="mr-2 w-4 h-4"/> Facebook
                                    </button>
                                    <button
                                        onClick={() => handleShare('Twitter')}
                                        className="flex items-center text-blue-400 hover:underline"
                                    >
                                        <Twitter className="mr-2 w-4 h-4"/> Twitter
                                    </button>
                                    <button
                                        onClick={() => handleShare('WhatsApp')}
                                        className="flex items-center text-green-500 hover:underline"
                                    >
                                        <FaWhatsapp className="mr-2 w-4 h-4"/> WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isLoginModalOpen && <LoginModal closeLoginModal={closeLoginModal} onLoginSuccess={onLoginSuccess}/>}
        </>
    );
};

export default RecipeDetail;
