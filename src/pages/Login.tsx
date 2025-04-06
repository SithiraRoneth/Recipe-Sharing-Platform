import { useState } from 'react';
import { CircleX } from 'lucide-react';

const loginAPI = "https://67f29b43ec56ec1a36d3a01c.mockapi.io/users";

const LoginModal = ({ closeLoginModal, openSignupModal }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(loginAPI); // Fetch users from MockAPI
            const users = await response.json();

            const user = users.find(
                (user: any) => user.username === username && user.password === password
            );

            if (user) {
                alert('Login successful!');
                closeLoginModal();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
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
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded-lg">Login</button>
                    <p className='mt-4'>Don't have an account?
                        <button onClick={() => { closeLoginModal(); openSignupModal(); }} className='text-blue-700 ml-3'>
                            Signup
                        </button>
                    </p>
                </form>
                <button onClick={closeLoginModal} className="absolute top-2 right-2 text-gray-500">
                    <CircleX />
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
