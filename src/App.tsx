import './App.css';
import { Provider } from 'react-redux';
import store from './store/Store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout.tsx';
import Home from './pages/Home.tsx';
import Recipes from './pages/Recipes.tsx';
import { Navigate } from 'react-router-dom';

function App() {
    const routes = createBrowserRouter([
        {
            path: '/', element: <RootLayout />,
            children: [
                { path: '/', element: <Navigate to="/home" /> },
                { path: '/home', element: <Home /> },
                { path: '/recipes', element: <Recipes /> },
            ]
        }
    ]);
    return (
        <Provider store={store}>
            <RouterProvider router={routes} />
        </Provider>
    );
}

export default App;
