import { NavLink, useOutlet, useLocation } from "react-router-dom";
import { Context } from "..";
import React from "react";

import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { signOut } from "firebase/auth";

import { AnimatePresence,} from "framer-motion";
import { BuregerMenu } from "../Components/BuregerMenu";
import { AuthContext } from "../hoc/AuthProvider";

function Layout() {
  const dateOptions = { day: "numeric", month: "long" };
  const date = new Date().toLocaleDateString("ru-RU", dateOptions);

  const { user, auth, loading } = useContext(AuthContext);
  

  const [isShowBurger, setIsShowBureger] = useState(null);
  const element = useOutlet();
  const {pathname} = useLocation()
  const pathSections = pathname.split('/');

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsShowBureger(true);
    } else {
      setIsShowBureger(false);
    }
  };
  window.addEventListener("resize", handleResize);
  useLayoutEffect(handleResize, []);

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

  return (
    <>
      <header className="header">
        <div className="date">Сегодня: {date}</div>

        {isShowBurger ? (
          <BuregerMenu />
        ) : (
          <div className="header_links">
            <NavLink className="header_links_item" to="/">
              Главная
            </NavLink>
            <NavLink className="header_links_item" to="/settings">
              Настройки
            </NavLink>
          </div>
        )}

        {user ? (
          <div className="header_user">
            <span className="user_header-info">
              Пользователь:{user ? user.displayName : null}
            </span>
            {/* {isAdmin && <button onClick={updateCurrentCoock}>Update</button>}  */}
            <button onClick={logoutFn}>Выйти</button>
          </div>
        ) : null}
      </header>
     
      <main className="container">
      <AnimatePresence mode="wait">
     
         {element && React.cloneElement(element, {key:(pathname.length > 1 ) ? pathSections[1] : pathname})}
         </AnimatePresence>
      </main>
     
    </>
  );
}
export { Layout };
