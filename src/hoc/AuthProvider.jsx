import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader } from "../Components/Loader";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const signIn = async (email, password,cb) => {
        try {
          setErrorMessage('');
          setAuthLoading(true);
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          cb();
        } catch (err) {
          switch (err.code) {
            case "auth/invalid-email":
              setErrorMessage("Некорректный формат электронной почты.");
              
              break;
            case "auth/invalid-login-credentials":
              setErrorMessage("Неправильный логин и/или пароль.");
              
              break;
            case "auth/wrong-password":
              setErrorMessage("Неверный пароль.");
              
              break;
            case "auth/email-already-in-use":
              setErrorMessage("Указанный email-адрес уже существует.");
              
              break;
            case "auth/network-request-failed":    
              setErrorMessage("Ошибка сети. Не удалось выполнить запрос к серверу.");
              
              break;
            case "auth/weak-password": 
              setErrorMessage("Слишком слабый пароль.");
              
              break;
            default:
              setErrorMessage("Необработанная ошибка. Проверь консоль!");
              console.log(err.code)
              
              break;
          }
          
        }
        finally {
          setAuthLoading(false);
        }
      };

    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const value = {user, loading, auth, authLoading, setAuthLoading, signIn, errorMessage}


    
    return <AuthContext.Provider value={value}>
      {loading ? <Loader /> :children}
        
    </AuthContext.Provider>
}