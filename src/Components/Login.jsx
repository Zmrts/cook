import { Form } from "./Form";


import { useContext,} from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../hoc/AuthProvider";

function Login() {
  const {auth,signIn, errorMessage,} = useContext(AuthContext);



  const navigate = useNavigate();
  const location = useLocation();

  
  if (auth.currentUser !== null) navigate('/', {replace:true})


  const fromPage = location.state?.from?.pathname || '/';



  return (
    <div className="login">

       ? <Form errorMessage={errorMessage} title="Вход" buttonTitle="Войти" handleClick={signIn} from={fromPage} /> 

    </div>
  );
}

export { Login };
