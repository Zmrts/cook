import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "./Components/AppRouter";
import { ref, onValue } from "firebase/database";

import { Loader } from "./Components/Loader";
import { createContext, useContext,  useState, useEffect } from "react";
import { Context } from ".";




export const loadContext = createContext(null);
export const usersContext = createContext(null);
function App() {
  const { auth, database} = useContext(Context);
  const [user, loading, ] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState();
  const [isAdmin, setIsAdmin] = useState(null);
 

  const getUsers = () => {
    const usersRef = ref(database, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data);
      setUsers(dataArray);
    });
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);




  
  return (
    <loadContext.Provider value={{
      load,
      setLoad,
      user,
      users,
      loading,
      isAdmin,
      setIsAdmin
    }}>
      <div className="App">
        {!(loading || load) && <Loader />}
        <AppRouter />
      </div>
    </loadContext.Provider>
  );
}

export default App;
