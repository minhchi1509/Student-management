import { Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./appRoutes";
import CommonLayout from '../layouts/CommonLayout';
import PrivateLayout from '../layouts/PrivateLayout';

const generateRoutes = (routes) => {
    return routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
            {route.childRoutes && generateRoutes(route.childRoutes)}
        </Route>
    ))
}

const generateAppRoutes = (publicRoutes, privateRoutes) => {
    return (
        <Routes>
            <Route element={<CommonLayout />}>
                {generateRoutes(publicRoutes)}
                <Route element={<PrivateLayout />} path='/'>
                    {generateRoutes(privateRoutes)}
                </Route>
            </Route>
        </Routes>
    )
}

export const routes = generateAppRoutes(publicRoutes, privateRoutes);