import { Link, useNavigate } from 'react-router';
import { Menu, X, CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import LoginModal from "../pages/Login";
import SignupModal from "../pages/Signup";

export default function Navigation() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile", { state: { username } });
    };

    return (
        <>
            <header className="text-black bg-transparent fixed top-0 z-10 w-full">
                <nav className="w-full bg-transparent py-4 px-8 flex justify-between items-center shadow-sm backdrop-blur-md md:shadow-lg">
                    <div className="font-mono font-extrabold text-xl md:ml-24">
                        <Link to="/">Superfood!</Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="hidden md:flex items-center font-mono space-x-8 md:mr-24">
                            <Link to="/home" className="text-gray-800 hover:text-gray-600">Home</Link>
                            <Link to="/recipes" className="text-gray-800 hover:text-gray-600">Recipes</Link>
                            {!isLoggedIn ? (
                                <button onClick={() => setLoginModalOpen(true)} className="px-4 py-2 bg-black text-white rounded-full">
                                    Login
                                </button>
                            ) : (
                                <button onClick={handleProfileClick}>
                                    <CircleUserRound className="text-gray-800" size={28} />
                                </button>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </nav>

                {isMobileMenuOpen && (
                    <div className="md:hidden p-4 space-y-4 bg-white flex flex-col items-center">
                        <Link to="/home" className="text-gray-800 hover:text-gray-600">Home</Link>
                        <Link to="/recipes" className="text-gray-800 hover:text-gray-600">Recipes</Link>
                        {!isLoggedIn ? (
                            <button onClick={() => setLoginModalOpen(true)} className="px-4 py-2 bg-black text-white rounded-full">Login</button>
                        ) : (
                            <button onClick={handleProfileClick}>
                                <CircleUserRound className="text-gray-800" size={28} />
                            </button>
                        )}
                    </div>
                )}
            </header>

            {isLoginModalOpen && (
                <LoginModal
                    closeLoginModal={() => setLoginModalOpen(false)}
                    openSignupModal={() => setSignupModalOpen(true)}
                    onLoginSuccess={(username: string) => {
                        setIsLoggedIn(true);
                        setUsername(username);
                        setLoginModalOpen(false);
                    }}
                />
            )}

            {isSignupModalOpen && (
                <SignupModal
                    closeSignupModal={() => setSignupModalOpen(false)}
                    openLoginModal={() => setLoginModalOpen(true)}
                />
            )}
        </>
    );
}
