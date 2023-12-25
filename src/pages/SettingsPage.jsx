import React from "react";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { SetttingsList } from "../Components/SettingsList";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
function SettingsPage() {
  const element = useOutlet();
  const { pathname } = useLocation();

  return (
    <motion.div
    className="settings"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    
    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 0.1] }}
  >
      <div className="settings_title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 256 256"
        >
          <path
            fill="#000"
            strokeMiterlimit="10"
            strokeWidth="1"
            d="M88.568 54.357c-8.337-3.453-8.337-15.262 0-18.715a2.32 2.32 0 001.255-3.03l-4.369-10.547a2.32 2.32 0 00-3.03-1.255c-8.337 3.453-16.687-4.897-13.233-13.233a2.32 2.32 0 00-1.255-3.03L57.388.177a2.32 2.32 0 00-3.03 1.255c-3.453 8.337-15.262 8.337-18.715 0a2.32 2.32 0 00-3.03-1.255L22.065 4.546a2.32 2.32 0 00-1.255 3.03c3.453 8.337-4.897 16.687-13.234 13.234a2.32 2.32 0 00-3.03 1.255L.177 32.612a2.32 2.32 0 001.255 3.03c8.337 3.453 8.337 15.262 0 18.715a2.32 2.32 0 00-1.255 3.03l4.369 10.547a2.32 2.32 0 003.03 1.255c8.337-3.453 16.687 4.897 13.233 13.234a2.32 2.32 0 001.255 3.03l10.547 4.369a2.32 2.32 0 003.03-1.255c3.453-8.337 15.262-8.337 18.715 0a2.32 2.32 0 003.03 1.255l10.547-4.369a2.32 2.32 0 001.255-3.03c-3.453-8.337 4.897-16.687 13.234-13.233a2.32 2.32 0 003.03-1.255l4.369-10.547a2.318 2.318 0 00-1.253-3.031zM45 64.052c-10.522 0-19.052-8.53-19.052-19.052S34.478 25.948 45 25.948 64.052 34.478 64.052 45 55.522 64.052 45 64.052z"
            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          ></path>
        </svg>
        <h2>Настройки</h2>
      </div>
      <div className="settings_content">
      <SetttingsList />
      <AnimatePresence mode="wait">
      {element && React.cloneElement(element, {key:pathname})}
      </AnimatePresence>
      
      </div>
      

     

     </motion.div>
 

  );
}

export { SettingsPage };
