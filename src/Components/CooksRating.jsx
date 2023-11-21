import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ref, onValue} from "firebase/database";

function CooksRating() {


  const [usersRating, setUsersRating] = useState([]);
  const [bestCoocker, setBestCooker] = useState({});
  const {database} = useContext(Context);




  const getUsersRating = () => {
    const usersRef = ref(database,'users/');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data).map((item) => {
        if (item.rating === 0 || item.quantity === 0) return {averageRating:0, ...item}
        const averageRating = Number((item.rating / item.quantity).toFixed(2));
        return {averageRating, ...item}
      })
      dataArray.sort((a,b) => b.averageRating - a.averageRating);
      console.log(dataArray);
      setBestCooker(dataArray[0]);
      setUsersRating(dataArray.slice(1));
      

    })
  }

  useEffect(() => {
   getUsersRating();
   // eslint-disable-next-line 
  }, [])
  return (
    <div className="cooks_rating">
      <div className="best-cook">
        <div className="best-cook_avatar"></div>
        <h3 className="best-cook_name">{bestCoocker.userName}</h3>
        <p className="best-cook_rating">РЕЙТИНГ: <span style={{fontWeight:'900'}}>{bestCoocker.averageRating}</span></p>
      </div>
      <ul className="cooks">
        {!usersRating.length 
        ? (<p>Загрузка...</p>) 
        : usersRating.map(user => 
         ( <li className="cooks-item">
          <div className="cooks-item_avatar"></div>
          <h3 className="cooks-item_name">{user.userName}</h3>
          <p className="cooks-item_rating"> РЕЙТИНГ: {user.averageRating}</p>
        </li>)
      )}
        
       
      </ul>
          
    </div>
  );
}

export {CooksRating}