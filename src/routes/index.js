import { Route } from "react-router-dom";
import appRoutes from "./appRoutes";

const generateRoute = (routes) => {
    return routes.map(route => (
        <Route path={route.path} element={route.element}>
            {route.childRoutes && generateRoute(route.childRoutes)}
        </Route>
    ))
}

export const routes = generateRoute(appRoutes);