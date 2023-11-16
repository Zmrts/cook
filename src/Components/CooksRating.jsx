import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ref, onValue} from "firebase/database";

function CooksRating() {


  const [usersRating, setUsersRating] = useState([]);
  const [bestCoocker, setBestCooker] = useState({});
  const {database} = useContext(Context);


 

  const getUsers = () => {
    const usersRef = ref(database,'users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data).sort((a,b) => 
      b.rating - a.rating);
      setBestCooker(dataArray[0]);
      const otherCookers = dataArray.filter((item, index) => index !== 0);
      setUsersRating(otherCookers);
    })
  }

  useEffect(() => {
   getUsers();
   // eslint-disable-next-line 
  }, [])
  return (
    <div className="cooks_rating">
      <div className="best-cook">
        <div className="best-cook_avatar"></div>
        <h3 className="best-cook_name">{bestCoocker.userName}</h3>
        <p className="best-cook_rating">РЕЙТИНГ: <span style={{fontWeight:'900'}}>{bestCoocker.rating}</span></p>
      </div>
      <ul className="cooks">
        {!usersRating.length 
        ? (<p>Загрузка...</p>) 
        : usersRating.map(user => 
         ( <li className="cooks-item">
          <div className="cooks-item_avatar"></div>
          <h3 className="cooks-item_name">{user.userName}</h3>
          <p className="cooks-item_rating"> РЕЙТИНГ: {user.rating}</p>
        </li>)
      )}
        
       
      </ul>
          
    </div>
  );
}

export {CooksRating}