import { Form } from "./Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "..";
import { useContext, useState } from "react";
import { loadContext } from "../App";

function Login() {
  const { auth } = useContext(Context);
  const { setLoad } = useContext(loadContext);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (email, password) => {
    try {
      setErrorMessage('');
      setLoad(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoad(false);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setErrorMessage("Некорректный формат электронной почты.");
          setLoad(false);
          break;
        case "auth/invalid-login-credentials":
          setErrorMessage("Неправильный логин и/или пароль.");
          setLoad(false);
          break;
        case "auth/wrong-password":
          setErrorMessage("Неверный пароль.");
          setLoad(false);
          break;
        case "auth/email-already-in-use":
          setErrorMessage("Указанный email-адрес уже существует.");
          setLoad(false);
          break;
        case "auth/network-request-failed":    
          setErrorMessage("Ошибка сети. Не удалось выполнить запрос к серверу.");
          setLoad(false);
          break;
        case "auth/weak-password": 
          setErrorMessage("Слишком слабый пароль.");
          setLoad(false);
          break;
        default:
          setErrorMessage("Необработанная ошибка. Проверь консоль!");
          console.log(err.code)
          setLoad(false);
          break;
      }
    }
  };

  return (
    <div className="login">
      <Form errorMessage={errorMessage} title="Вход" buttonTitle="Войти" handleClick={handleLogin} />
    </div>
  );
}

export { Login };
