import { NavLink, useOutlet, useLocation } from "react-router-dom";
import React from "react";

import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { signOut } from "firebase/auth";

import { AnimatePresence } from "framer-motion";
import { BuregerMenu } from "../Components/BuregerMenu";
import { AuthContext } from "../hoc/AuthProvider";

function Layout() {
  const dateOptions = { day: "numeric", month: "long" };
  const date = new Date().toLocaleDateString("ru-RU", dateOptions);

  const { user, auth } = useContext(AuthContext);

  const [isShowBurger, setIsShowBureger] = useState(null);
  const element = useOutlet();
  const { pathname } = useLocation();
  const pathSections = pathname.split("/");

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
      alert(err);
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#ffffff"
                version="1.1"
                viewBox="0 0 495.398 495.398"
                xmlSpace="preserve"
              >
                <path d="M487.083 225.514l-75.08-75.08v-86.73c0-15.682-12.708-28.391-28.413-28.391-15.669 0-28.377 12.709-28.377 28.391v29.941L299.31 37.74c-27.639-27.624-75.694-27.575-103.27.05L8.312 225.514c-11.082 11.104-11.082 29.071 0 40.158 11.087 11.101 29.089 11.101 40.172 0l187.71-187.729c6.115-6.083 16.893-6.083 22.976-.018l187.742 187.747a28.337 28.337 0 0020.081 8.312c7.271 0 14.541-2.764 20.091-8.312 11.086-11.086 11.086-29.053-.001-40.158z"></path>
                <path d="M257.561 131.836c-5.454-5.451-14.285-5.451-19.723 0L72.712 296.913a13.977 13.977 0 00-4.085 9.877v120.401c0 28.253 22.908 51.16 51.16 51.16h81.754v-126.61h92.299v126.61h81.755c28.251 0 51.159-22.907 51.159-51.159V306.79c0-3.713-1.465-7.271-4.085-9.877L257.561 131.836z"></path>
              </svg>
            </NavLink>
            <NavLink className="header_links_item" to="/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 256 256"
              >
                <path
                  fill="#000"
                  strokeMiterlimit="10"
                  strokeWidth="0"
                  d="M88.568 54.357c-8.337-3.453-8.337-15.262 0-18.715a2.32 2.32 0 001.255-3.03l-4.369-10.547a2.32 2.32 0 00-3.03-1.255c-8.337 3.453-16.687-4.897-13.233-13.233a2.32 2.32 0 00-1.255-3.03L57.388.177a2.32 2.32 0 00-3.03 1.255c-3.453 8.337-15.262 8.337-18.715 0a2.32 2.32 0 00-3.03-1.255L22.065 4.546a2.32 2.32 0 00-1.255 3.03c3.453 8.337-4.897 16.687-13.234 13.234a2.32 2.32 0 00-3.03 1.255L.177 32.612a2.32 2.32 0 001.255 3.03c8.337 3.453 8.337 15.262 0 18.715a2.32 2.32 0 00-1.255 3.03l4.369 10.547a2.32 2.32 0 003.03 1.255c8.337-3.453 16.687 4.897 13.233 13.234a2.32 2.32 0 001.255 3.03l10.547 4.369a2.32 2.32 0 003.03-1.255c3.453-8.337 15.262-8.337 18.715 0a2.32 2.32 0 003.03 1.255l10.547-4.369a2.32 2.32 0 001.255-3.03c-3.453-8.337 4.897-16.687 13.234-13.233a2.32 2.32 0 003.03-1.255l4.369-10.547a2.318 2.318 0 00-1.253-3.031zM45 64.052c-10.522 0-19.052-8.53-19.052-19.052S34.478 25.948 45 25.948 64.052 34.478 64.052 45 55.522 64.052 45 64.052z"
                  transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                ></path>
              </svg>
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
          {element &&
            React.cloneElement(element, {
              key: pathname.length > 1 ? pathSections[1] : pathname,
            })}
        </AnimatePresence>
      </main>
    </>
  );
}
export { Layout };
