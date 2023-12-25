
import { AppRouter } from "./Components/AppRouter";
import { useContext } from "react";
import { AuthContext } from "./hoc/AuthProvider";
import { Loader } from "./Components/Loader";



function App() {

  const {authLoading} = useContext(AuthContext);




  
  return (
    
      <div className="App">
        {authLoading && <Loader />}
        <AppRouter />
      </div>

  );
}

export default App;
