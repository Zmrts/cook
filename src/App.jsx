
import { AppRouter } from "./Components/AppRouter";
import { useContext } from "react";
import { AuthContext } from "./hoc/AuthProvider";
import { Loader } from "./Components/Loader";
import { Context } from ".";
import { ref } from "firebase/storage";


function App() {
  const {storage} = useContext(Context);
  const storageRef = ref(storage, 'images');


  const {authLoading} = useContext(AuthContext);




  
  return (
    
      <div className="App">
        {authLoading && <Loader />}
        <AppRouter />
      </div>

  );
}

export default App;
