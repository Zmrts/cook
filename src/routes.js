import { LOGIN_ROUTE, HOME_ROUTE } from "./utils/consts";
import { LoginPage } from "./pages/LoginPage";

import { HomePage } from "./pages/HomePage";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    }
]

export const privateRoutes = [
    {
        path:HOME_ROUTE,
        Component: HomePage,
    }
]