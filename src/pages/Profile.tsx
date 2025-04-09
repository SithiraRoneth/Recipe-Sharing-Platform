import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import AddRecipe from "../components/UserRecipes/Addrecipe";
import UserRecipeCard from "../components/UserRecipes/UserRecipeCard";
import {RootState} from "../store/Store";
import {deleteRecipe, setRecipes} from "../reducers/recipeSlice";
import axios from "axios";

export default function Profile() {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.authSlice.username)
        || localStorage.getItem("users")
        || "Guest";

    const recipes = useSelector((state: RootState) => state.recipeSlice);
    const [editingRecipe, setEditingRecipe] = useState(null);

    // Fetch user-specific recipes
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const response = await axios.get(`https://67f29b43ec56ec1a36d3a01c.mockapi.io/recipes?username=${username}`);
                dispatch(setRecipes(response.data));
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            }
        };

        if (username && username !== "Guest") {
            fetchUserRecipes();
        }
    }, [dispatch, username]);

    const userRecipes = recipes.filter(
        (recipe) => recipe.username?.toLowerCase().trim() === username?.toLowerCase().trim()
    );

    const handleDelete = (id: string) => {
        dispatch(deleteRecipe(id));
    };

    const handleEdit = (recipe: any) => {
        setEditingRecipe(recipe);
    };


    return (
        <div className="bg-gray-100 min-h-screen px-6 md:px-24 py-12">
            <div className="flex justify-between items-center mt-16 mb-6 md:mt-20">
                <h1 className="text-black font-bold text-2xl md:text-4xl">Recipes</h1>
                <AddRecipe username={username}/>
            </div>

            {/* User Created Recipes */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Your Created Recipes</h2>
                {userRecipes.length > 0 ? (
                    <div className="flex overflow-x-auto gap-4 pb-2">
                        {userRecipes.map((recipe) => (
                            <div key={recipe.id} className="min-w-[300px]">
                                <UserRecipeCard
                                    description={""} {...recipe}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No recipes added yet.</p>
                )}
            </div>

            {/* Favourite Recipes Section */}
            <h2 className="text-xl font-semibold mb-4 mt-8">Favourite Recipes</h2>
            <p className="text-gray-500">You haven’t saved any favorite recipes yet.</p>

        </div>
    );
}
