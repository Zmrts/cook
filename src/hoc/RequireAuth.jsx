
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { Loader } from "../Components/Loader";

function RequireAuth({children}) {
    const {auth, user, loading} = useContext(AuthContext);

    const location = useLocation();
    
   

    if(loading === false && !auth.currentUser) {
      return  <Navigate to='/login' state={{from:location}} />
    }


    return children;

    
}


export {RequireAuth}