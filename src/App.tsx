import './App.css'
import {Provider} from "react-redux";
import store from "./store/Store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
    const routes = createBrowserRouter([]);
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routes}/>
            </Provider>
        </>
    )
}

export default App;
