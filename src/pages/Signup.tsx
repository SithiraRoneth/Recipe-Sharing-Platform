import { useState } from 'react';
import { CircleX } from 'lucide-react';

const signupAPI = "https://67f29b43ec56ec1a36d3a01c.mockapi.io/users";

const SignupModal = ({ closeSignupModal, openLoginModal }: any) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(signupAPI, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (data) {
                alert('Signup successful!');
                closeSignupModal();
            } else {
                alert('Error during signup');
            }
        } catch (error) {
            alert('Error during signup');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-lg">Signup</button>
                    <p className='mt-4'>Already have an account?
                        <button onClick={() => { closeSignupModal(); openLoginModal(); }} className='text-blue-700 ml-3'>
                            Login
                        </button>
                    </p>
                </form>
                <button onClick={closeSignupModal} className="absolute top-2 right-2 text-gray-500">
                    <CircleX />
                </button>
            </div>
        </div>
    );
};

export default SignupModal;
