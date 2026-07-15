import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Layout from './components/layout';
import "./i18n";
import Dishes from '@/components/dishes';
import Tables from '@/components/tables';
import UniqueTable from '@/components/tables/unique';

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "",
            element: <Dishes/>
        },
        {
            path: "tables",
            element: <Outlet/>,
            children: [
                {
                    path: "",
                    element: <Tables/>
                },
                {
                    path: ":id",
                    element: <UniqueTable/>
                }
            ]
        }
    ]
}]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
);