import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {

    const dateOptions = {day: 'numeric', month:'long'};
    const date = new Date().toLocaleDateString('ru-RU', dateOptions);
    const {auth} = useContext(Context);

    const [user] = useAuthState(auth)
    console.log('HEADER',user)



    return <div className="header">
        <div className="date">Сегодня: {date}</div>
        
        {user ? <div className="date">Пользователь: {user ? user.displayName : null}</div> : null}


    </div>
}

export {Header}