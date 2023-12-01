import { useContext, useEffect} from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {ref, update } from "firebase/database";
import { loadContext } from "../App";




function Header(props) {
  const {users} = props;

    const dateOptions = {day: 'numeric', month:'long'};
    const date = new Date().toLocaleDateString('ru-RU', dateOptions);
    const {auth, database,} = useContext(Context);
    const [user] = useAuthState(auth);
    const {setIsAdmin, isAdmin} = useContext(loadContext);

    const chechIsAdmin = () => {
      auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setIsAdmin(idTokenResult.claims.admin);
          } else {
            setIsAdmin(false);
          }
        })
    }
    useEffect(() => {
      chechIsAdmin();
    },[auth])


   


    const cooksQueue = ['Мария', "Кирилл", "Карина", "Король женских писек", "Tim"];
    const logoutFn = () => {
        try {
          signOut(auth);
        } catch (err) {
          console.log("Ошибка", err);
        }
      };

      const updateCurrentCoock = async  () => {
        const currentCoock = users.find((item) => item.isCurrentCoock === true).userName;
        console.log(currentCoock);
        if (typeof currentCoock === 'string') {
          const currentCoockRef = ref(database, `users/${currentCoock}`);
          const removeCurrentCoock = {
            isCurrentCoock: false,
          }
          const indexOfNextCoock = cooksQueue.indexOf(currentCoock) + 1;
  
          let nextCoock;
          if (!(indexOfNextCoock >= cooksQueue.length)) {
            nextCoock = cooksQueue[indexOfNextCoock];
          } else {
            nextCoock = cooksQueue[0];
          }
  
          const nextCoockRef = ref(database, `users/${nextCoock}`); 
          const updateCoock = {
            isCurrentCoock: true,
          }
          try {
              await update(currentCoockRef, removeCurrentCoock);
              await update(nextCoockRef, updateCoock); 
          } catch(err) {
              console.log(err);
          }
        } else {
          console.log('ERROR=current coock is not defined ');
        }
       
      }


  


    return <div className="header">
        <div className="date">Сегодня: {date}</div>
        
        {user ? <div className="header_user">
                <span className="user_header-info">Пользователь:{user ? user.displayName : null}</span>
                {isAdmin && <button onClick={updateCurrentCoock}>Update</button> }
                <button onClick={logoutFn}>Выйти</button>
        </div> 
        : null}


    </div>
}

export {Header}