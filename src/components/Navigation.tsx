import { Link } from 'react-router-dom';
import {Menu, X } from 'lucide-react';
import { useState } from 'react';
import LoginModal from "../pages/Login.tsx";
import SignupModal from "../pages/Signup.tsx";

export default function Navigation() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const openSignupModal = () => {
        setSignupModalOpen(true);
    };

    const closeSignupModal = () => {
        setSignupModalOpen(false);
    };

    return (
        <>
            <header className="text-black bg-transparent fixed top-0 z-10 w-full">
                <nav className="w-full bg-transparent py-4 px-8 flex justify-between items-center shadow-sm backdrop-blur-md">
                    <div className="font-mono font-extrabold text-xl md:ml-24">
                        <Link to="/">Superfood!</Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center font-mono space-x-8 md:mr-24">
                            <Link to="/home" className="text-gray-800 hover:text-gray-600">Home</Link>
                            <Link to="/recipes" className="text-gray-800 hover:text-gray-600">Recipes</Link>
                            <button onClick={openLoginModal} className="px-4 py-2 bg-black text-white rounded-full">Login</button>
                        </div>

                        {/* Hamburger Icon for Mobile */}
                        <div className="md:hidden">
                            <button onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? (
                                    <X className="text-gray-800" size={24} />
                                ) : (
                                    <Menu className="text-gray-800" size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden p-4 space-y-4 bg-white flex flex-col items-center ">
                        <Link to="/home" className="text-gray-800 hover:text-gray-600">Home</Link>
                        <Link to="/recipes" className="text-gray-800 hover:text-gray-600">Recipes</Link>
                        <button onClick={openLoginModal} className="block justify-center items-center md:w-full px-4 py-2 bg-black text-white rounded-full">Login</button>
                    </div>
                )}
            </header>
            {isLoginModalOpen && (
                <LoginModal closeLoginModal={closeLoginModal} openSignupModal={openSignupModal} />
            )}
            {isSignupModalOpen && (
                <SignupModal closeSignupModal={closeSignupModal} openLoginModal={openLoginModal} />
            )}
        </>
    );
}
