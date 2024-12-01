import { createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import UserPage from "./pages/users/UserPage";

export const router= createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children:[
            {
                path: '',
                element: <Dashboard/>,
                children: [
                    {
                        path: '',
                        element: <Homepage/>
                    },
                    {
                        path: '/users',
                        element: <UserPage/>
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
        ]
    }
])