import Signup from "page/Signup"
import Login from "page/Login"
import Home from "page/Home"
import EditProfile from "page/EditProfile"

const routes = {
    publicRoutes: [
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
    ],
    privateRoutes: [
        {
            element: <Home />,
            path: '',
        },
        {
            element: <EditProfile />,
            path: 'edit',
        },
    ]
}

export default routes