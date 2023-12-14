import { privateRoutes, publicRoutes } from "../routes";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";
import { Layout } from "../layouts/Layout";
import { HomePage } from "../pages/HomePage";
import { AnimatePresence, motion } from "framer-motion";
function AppRouter() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
        
      <Route path="/" element={<Layout />}> 
        {privateRoutes.map(({ path, Component, name, index }) => {
          return (
            <Route
            
              key={path}
              exact
              path={path}
              {...(index ? { index: index } : {})}
              element={

                <motion.div
                    key={path}
                    className={name}
                    initial={{ opacity:0.2, }}
                    animate={{opacity:1,  }} 
                    transition={{duration:0.3, ease:[0.25, 0.1, 0.25, 0.1]}}
                >
                  <Component />
                </motion.div>

                
              }
            />
          );
        })}
        
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
        
      </Route>
      
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} exact path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export { AppRouter };
