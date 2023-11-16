import { Link } from "react-router-dom"
import { Register } from "../Components/Register"

function RegisterPage() {


    return <div className="register">
        <h1>Register</h1>
        <p>
            Есть аккаунт? <Link to='/login'>Войти</Link>
        </p>
        <Register />

    </div>
}

export {RegisterPage}