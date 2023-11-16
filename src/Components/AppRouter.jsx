
import { privateRoutes, publicRoutes } from "../routes";
import { Routes, Route, Navigate, } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "..";
import {useAuthState} from 'react-firebase-hooks/auth';


function AppRouter() {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return user
        ? (
            <Routes>
                {privateRoutes.map(({path, Component}) => {
                    return (<Route key={path} exact path={path} element={<Component />} />)
                })}
                <Route path="*" element={<Navigate to={HOME_ROUTE} />} />

            </Routes>
        )
        : (
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} exact path={path} element={<Component />} />
                )}
                <Route path="*" element={<Navigate to='/login' />} />

            </Routes>

        )

}

export { AppRouter }