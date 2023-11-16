import { useContext, useEffect, useState } from "react";
import { CooksRating } from "../Components/CooksRating";
import { Context } from "..";
import { signOut } from "firebase/auth";
import { ref, onValue,} from "firebase/database";
import { Modal } from "../Components/Modal";

function HomePage() {
  const [users, setUsers] = useState([]);
  const { auth, database } = useContext(Context);

  


  const getUsers =  () => {
    const usersRef = ref(database, 'users/');onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const dataArray = Object.values(data);
      console.log(dataArray);
      setUsers(dataArray);
    })

  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
}, [])

const openModal = () => {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  
 
  overlay.style.display = 'flex';
  setTimeout(() => {
    modal.style.transform = 'scale(1)';
    modal.style.opacity = '1';
  }, 50);
}

  const logoutFn = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log("Ошибка", err);
    }
  };


 
  return (
    <>
      <Modal users={users} />
      <CooksRating />
      <div className="buttons">
      <button onClick={logoutFn}>ВЫЙТИ</button>
      <button onClick={openModal}>Оценить пользователя</button>

      </div>
    </>
  );
}

export { HomePage };
