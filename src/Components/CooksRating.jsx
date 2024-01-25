import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ref, onValue,} from "firebase/database";
import { CooksRatingItem } from "./CooksRatingItem";


function CooksRating(props) {
  const [usersRating, setUsersRating] = useState([]);
  const { database} = useContext(Context);

  const styleForPreloader = {
    justifyContent:'center',
    alignItems: 'center',
  }

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
      
      <ul style={!usersRating.length ? styleForPreloader : {}} className="cooks_rating">
        {!usersRating.length ? (
          <span className="preloader"></span>
        ) : (
          usersRating.map((user, index) => 
          <CooksRatingItem 
          isCurrent={user.isCurrentCoock}
          key={user.userID} 
          index={index} {...user}/>)
        )}
      </ul>

    </>
}

export { CooksRating };
