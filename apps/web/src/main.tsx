import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';

const router = createBrowserRouter([{
    path: "/",
    element: <Outlet/>,
    children: [
        {
            path: "",
            element: <Home/>
        }
    ]
}]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
);