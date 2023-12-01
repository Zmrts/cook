import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ref, onValue, connectDatabaseEmulator } from "firebase/database";
import { Modal } from "./GradeForm";
import { CooksRatingItem } from "./CooksRatingItem";


function CooksRating(props) {
  const {users} = props;
  const [usersRating, setUsersRating] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { database, auth } = useContext(Context);

  const styleForPreloader = {
    justifyContent:'center',
    alignItems: 'center',
  }
  
  const openModal = (user) => (evt) => {
    evt.preventDefault();
    setSelectedUser(user);
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    overlay.style.display = "flex";
    setTimeout(() => {
      modal.style.transform = "scale(1)";
      modal.style.opacity = "1";
    }, 50);
  };

  const getUsersRating = () => {
    const usersRef = ref(database, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data).map((item) => {
        if (item.rating === 0 || item.quantity === 0)
          return { averageRating: 0, ...item };
        const averageRating = Number((item.rating / item.quantity).toFixed(2));
        return { averageRating, ...item };
      });
      dataArray.sort((a, b) => b.averageRating - a.averageRating);
      setUsersRating(dataArray);
    });
  };

  useEffect(() => {
    getUsersRating();
    // eslint-disable-next-line
  }, []);
  return <>
  <Modal user={selectedUser} users={users} />
      
      <ul style={!usersRating.length ? styleForPreloader : {}} className="cooks_rating">
        {!usersRating.length ? (
          <span className="preloader"></span>
        ) : (
          usersRating.map((user, index) => 
          <CooksRatingItem 
          isCurrent={user.isCurrentCoock}
          key={user.userID} 
          openModal={openModal}
          index={index} {...user}/>)
        )}
      </ul>

    </>
}

export { CooksRating };
