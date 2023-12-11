import { Outlet, NavLink } from "react-router-dom";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadContext } from "../App";
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { signOut } from "firebase/auth";
import {ref, update } from "firebase/database";
import { AnimatePresence, motion } from "framer-motion";
import { BuregerMenu } from "../Components/BuregerMenu";


function Layout() {
  const dateOptions = { day: "numeric", month: "long" };
  const date = new Date().toLocaleDateString("ru-RU", dateOptions);
  const { auth, database } = useContext(Context);
  const [user] = useAuthState(auth);
  const { setIsAdmin, isAdmin, users } = useContext(loadContext);

  const [isShowBurger, setIsShowBureger] = useState(null);

  const handleResize = () => {
    if (window.innerWidth < 768) {
        setIsShowBureger(true);
    } else {
        setIsShowBureger(false);
    }
}
window.addEventListener('resize', handleResize);
useLayoutEffect(handleResize, [])


  const activeLinkStyles = {
    color:'#12dced',

  }
  const checkIsAdmin = () => {
    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      if (idTokenResult.claims.admin) {
        setIsAdmin(idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });
  };
  useEffect(() => {
    checkIsAdmin();
  }, [auth]);

  const cooksQueue = [
    "Мария",
    "Кирилл",
    "Карина",
    "Король женских писек",
    "Tim",
  ];
  const logoutFn = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("Ошибка", err);
    }
  };

  const updateCurrentCoock = async () => {
    const currentCoock = users.find(
      (item) => item.isCurrentCoock === true
    ).userName;
    console.log(currentCoock);
    if (typeof currentCoock === "string") {
      const currentCoockRef = ref(database, `users/${currentCoock}`);
      const removeCurrentCoock = {
        isCurrentCoock: false,
      };
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
      };
      try {
        await update(currentCoockRef, removeCurrentCoock);
        await update(nextCoockRef, updateCoock);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("ERROR=current coock is not defined ");
    }
  };

  return (
    <>
      <header className="header">
        <div className="date">Сегодня: {date}</div>

        {isShowBurger 
        ? <BuregerMenu /> 
        : <div className="header_links">
        <NavLink style={({isActive}) => (isActive ? activeLinkStyles : {color:'white'})} className='header_links_item' to="/">Главная</NavLink>
        <NavLink style={({isActive}) => (isActive ? activeLinkStyles : {color:'white'})}  className='header_links_item' to="/settings">Настройки</NavLink>
        </div>  }

        
        

        {user ? (
          <div className="header_user">
            <span className="user_header-info">
              Пользователь:{user ? user.displayName : null}
            </span>
            {isAdmin && <button onClick={updateCurrentCoock}>Update</button>}
            <button onClick={logoutFn}>Выйти</button>
          </div>
        ) : null}
      </header>
      
      <main className="container">

              <Outlet />

      </main>

    </>
  );
}

export { Layout };
