import { Form } from "./Form";
import {signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "..";
import { useContext } from "react";
import { loadContext } from "../App";

function Login() {
    const {auth} = useContext(Context);
    const { setLoad} = useContext(loadContext);
    const handleLogin = async  (email, password) => {
        try {
            setLoad(true);
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            console.log('userInfo', user);
            setLoad(false);
        } catch(err) {
            console.log('ОШИБКА', err);
        }
         

    }

    return <>
        <Form title="ВОЙТИ" handleClick={handleLogin} />
    </>
}

export {Login}