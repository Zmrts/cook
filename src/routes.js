import { HOME_ROUTE, LOGIN_ROUTE, SETTINGS_ROUTE } from "./utils/consts";
import { LoginPage } from "./pages/LoginPage";


import { SettingsPage } from "./pages/SettingsPage";
import { HomePage } from "./pages/HomePage";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    }
]

export const privateRoutes = [

    {
        path:SETTINGS_ROUTE,
        Component:SettingsPage,
        name:'settings'
    },
    {
        path:HOME_ROUTE,
        Component:HomePage,
        name:'home',
        index:true
    }
]