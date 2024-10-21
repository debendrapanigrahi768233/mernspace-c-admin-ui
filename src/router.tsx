import { createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";

export const router= createBrowserRouter([
    {
        path: '/',
        element: <Dashboard/>,
        children: [
            {
                path: '/',
                element: <Homepage/>
            },
        ]
    },
    {
        path: '/auth',
        element: <NonAuth/>,
        children:[
            {
                path:'login',
                element:<LoginPage/>
            }
        ]
    },
])