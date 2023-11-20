import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "./Components/AppRouter";

import { Loader } from "./Components/Loader";
import { createContext, useContext, useState } from "react";
import { Context } from ".";


export const loadContext = createContext(null);
export const usersContext = createContext(null);
function App() {
  const { auth } = useContext(Context);
  const [user, loading, ] = useAuthState(auth);
  const [load, setLoad] = useState();






  
  return (
    <loadContext.Provider value={{
      load,
      setLoad,
      user,
    }}>
      <div className="App">
        {(loading || load) && <Loader />}
        <AppRouter />
      </div>
    </loadContext.Provider>
  );
}

export default App;
