import Login from "../page/Login";
import Signup from "../page/Signup";
import EditProfile from "../page/EditProfile";
import Home from "../page/Home";

const publicRoutes = [
    {
        element: <Signup />,
        path: '/signup',
    },
    {
        element: <Login />,
        path: '/login',
    },
    {
        element: <p>404 Not Found</p>,
        path: '*'
    },
]

const privateRoutes = [
    {
        element: <Home />,
        path: '',
    },
    {
        element: <EditProfile />,
        path: 'edit',
    },
]

export { publicRoutes, privateRoutes };