import { Form } from "./Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "..";
import { useContext } from "react";
import { loadContext } from "../App";

function Login() {
  const { auth } = useContext(Context);
  const { setLoad } = useContext(loadContext);
  const handleLogin = async (email, password) => {
    try {
      setLoad(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoad(false);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          alert("Некорректный формат электронной почты");
          break;
        case "auth/invalid-login-credentials":
          alert("Неправильный логин и/или пароль. Пользователь не найден");
          break;
        case "auth/wrong-password":
          alert("Неверный пароль");
          break;
        case "auth/email-already-in-use":
          alert("Указанный email-адрес уже существует");
          break;
        case "auth/network-request-failed":
          alert("Ошибка сети. Не удалось выполнить запрос к серверу.");
          break;
        case "auth/weak-password":
          alert("Слишком слабый пароль.");
          break;

        default:
          console.log(err.code)
          break;
      }
    }
  };

  return (
    <div className="login">
      <Form title="Вход" buttonTitle="Войти" handleClick={handleLogin} />
    </div>
  );
}

export { Login };
