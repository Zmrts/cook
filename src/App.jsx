import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "./Components/AppRouter";
import { Header } from "./layouts/Header";
import { Loader } from "./Components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import { Context } from ".";
import { onValue, ref } from "firebase/database";

export const loadContext = createContext(null);
export const usersContext = createContext(null);
function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  const [load, setLoad] = useState();
  const {database} = useContext(Context);





  if (loading || load) {
    return <Loader />;
  }
  return (
    <loadContext.Provider value={{
      load,
      setLoad,
      user,
    }}>
      <div className="App">
        <Header />
        <AppRouter />
      </div>
    </loadContext.Provider>
  );
}

export default App;
