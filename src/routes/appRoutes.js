import EditProfile from "../component/EditProfile";
import Login from "../component/Login";
import Signup from "../component/Signup";
import Home from "../page/Home";

const appRoutes = [
    {
        element: <Signup />,
        path: '/signup',
    },
    {
        element: <Login />,
        path: '/login',
    },
    {
        element: <Home />,
        path: '/',
        childRoutes: [
            {
                element: <EditProfile />,
                path: 'edit',
            }
        ]
    },
    {
        element: <p>404 Not Found</p>,
        path: '*'
    },
]

export default appRoutes;