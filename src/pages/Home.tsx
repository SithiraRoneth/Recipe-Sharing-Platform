import { Link } from "react-router-dom"; // Note: Use 'react-router-dom' for React Router v6

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center mt-52 md:mt-40 px-4">
            <h1 className="md:text-5xl text-2xl font-bold text-center tracking-wide md:tracking-widest">
                Healthy Cooking Recipes
            </h1>
            <h1 className="md:text-4xl text-2xl font-bold text-center tracking-wide mt-2 md:tracking-widest">
                and the Right Nutrition
            </h1>
            <p className="md:font-semibold md:mt-6 text-center mt-4 text-lg">
                Browse through Over 50 Tasty Recipes
            </p>
            <Link to="/recipes">
                <button className="px-11 py-2.5 bg-amber-900 text-white rounded-tl-3xl rounded-br-3xl mt-16 md:mt-8 text-lg">
                    More Recipes
                </button>
            </Link>
        </div>
    );
}
