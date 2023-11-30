import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "./Components/AppRouter";

import { Loader } from "./Components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import { Context } from ".";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { set } from "firebase/database";


export const loadContext = createContext(null);
export const usersContext = createContext(null);
function App() {
  const { auth, database } = useContext(Context);
  const [user, loading, ] = useAuthState(auth);
  const [load, setLoad] = useState();
  const [isAdmin, setIsAdmin] = useState(null);
 





  
  return (
    <loadContext.Provider value={{
      load,
      setLoad,
      user,
      isAdmin
    }}>
      <div className="App">
        {(loading || load) && <Loader />}
        <AppRouter />
      </div>
    </loadContext.Provider>
  );
}

export default App;
