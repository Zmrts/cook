import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ref, onValue } from "firebase/database";
import { Modal } from "./GradeForm";


function CooksRating(props) {
  const {users} = props;
  const [usersRating, setUsersRating] = useState([]);
  const [bestCoocker, setBestCooker] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const { database } = useContext(Context);
  
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
      setBestCooker(dataArray[0]);
      setUsersRating(dataArray.slice(1));
    });
  };

  useEffect(() => {
    getUsersRating();
    // eslint-disable-next-line
  }, []);
  return <>
  <Modal user={selectedUser} users={users} />
    <div className="cooks_rating">
      <div className="best-cook">
        <div className="best-cook_avatar"></div>
        <h3 className="best-cook_name">{bestCoocker.userName}</h3>
        <div className="best-cook_rating">
          <p>РЕЙТИНГ: <span style={{ fontWeight: "900" }}>{bestCoocker.averageRating}</span></p>
          
          <a onClick={openModal(bestCoocker.userName)} href="#">
            <svg
              fill="#1e8c08"
              height="27px"
              width="27px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="-48.69 -48.69 584.31 584.31"
              xmlSpace="preserve"
              stroke="#1e8c08"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="34.08481999999999"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4 c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7 c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9 c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7 v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9 c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24 c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9 h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z" />{" "}
                </g>{" "}
              </g>
            </svg>
          </a>
        </div>
      </div>
      <ul className="cooks">
        {!usersRating.length ? (
          <p>Загрузка...</p>
        ) : (
          usersRating.map((user) => (
            <li key={user.userID} className="cooks-item">
              <div className="cooks-item_avatar"></div>
              <h3 className="cooks-item_name">{user.userName}</h3>
              <div className="cooks-item_rating">
                <p>
                  {" "}
                  РЕЙТИНГ:{" "}
                  <span style={{ fontWeight: "700" }}>
                    {user.averageRating}
                  </span>
                </p>
                <a onClick={openModal(user.userName)}  href="#">
                  <svg
                    fill="#1e8c08"
                    height="27px"
                    width="27px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="-48.69 -48.69 584.31 584.31"
                    xmlSpace="preserve"
                    stroke="#1e8c08"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="34.08481999999999"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4 c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7 c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9 c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7 v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9 c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24 c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9 h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z" />{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </a>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    </>
}

export { CooksRating };
