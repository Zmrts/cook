import { useContext, } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";



function Header() {

    const dateOptions = {day: 'numeric', month:'long'};
    const date = new Date().toLocaleDateString('ru-RU', dateOptions);
    const {auth} = useContext(Context);

    const [user] = useAuthState(auth)
    const logoutFn = () => {
        try {
          signOut(auth);
        } catch (err) {
          console.log("Ошибка", err);
        }
      };



    return <div className="header">
        <div className="date">Сегодня: {date}</div>
        
        {user ? <div className="header_user">
                <span className="user_header-info">Пользователь:{user ? user.displayName : null}</span>
                <button onClick={logoutFn}>Выйти</button>
        </div> 
        : null}


    </div>
}

export {Header}