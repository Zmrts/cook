import { useContext, useEffect, useState } from "react";
import { CooksRating } from "../Components/CooksRating";
import { Context } from "..";

import { ref, onValue } from "firebase/database";

import { Header } from "../layouts/Header";
import { Feed } from "../Components/Feed";

function HomePage() {
  const [users, setUsers] = useState([]);
  const { database } = useContext(Context);

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
    <>
    <Header users={users}/>
    <div className="container">
      <div className="home">
        <CooksRating users={users} />
        <Feed />
      </div>
    
    </div>
    </>
    
    
  );
}

export { HomePage };
