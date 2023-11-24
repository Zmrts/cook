import { useContext, useState } from "react";
import { Context } from "..";
import { increment, ref, update } from "firebase/database";

function Modal({ users, user }) {
  const [grade, setGrade] = useState("Не выбрана");

  const { database } = useContext(Context);

  const closeModal = (evt) => {
    evt.preventDefault();
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector(".modal");

    modal.style.transform = "scale(0)";
    modal.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
      setGrade("Не выбрана");
    }, 55);
  };
  const gradeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleGrade = (rating) => {
    setGrade(rating);
  };
  const putGrade = async (coocker, grade) => {
    if (grade === "Не выбрана" || coocker === "Не выбран") {
      alert("ОЦЕНКА ИЛИ ПОЛЬЗОВАТЕЛЬ НЕ ВЫБРАНЫ");
    } else {
      const userRef = ref(database, `users/${user}`);
      const updates = {
        rating: increment(grade),
        quantity: increment(1),
      };
      try {
        await update(userRef, updates);

        setTimeout(() => {
          closeModal();
        }, 10);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <a onClick={closeModal} href="" className="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0,0,256,256"
            width="24px"
            height="24px"
          >
            <g
              fill="red"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"

            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M4.99023,3.99023c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l6.29297,6.29297l-6.29297,6.29297c-0.26124,0.25082 -0.36647,0.62327 -0.27511,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27511l6.29297,-6.29297l6.29297,6.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-6.29297,-6.29297l6.29297,-6.29297c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-6.29297,6.29297l-6.29297,-6.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30273z"></path>
              </g>
            </g>
          </svg>
        </a>
        <h2 style={{ textAlign: "center" }}>Оценка для пользователя <br/> <span style={{borderBottom:'2px solid #ef00ff'}}>{user}</span></h2>
        <ul className="select_rating">
          {gradeArray.map((rating) => (
            <li
              onClick={() => handleGrade(rating)}
              key={rating}
              className={`grade ${grade === rating ? "active" : null}`}
            >
              {rating}
            </li>
          ))}
        </ul>
        <p>Оценка: {grade}</p>
        <button onClick={() => putGrade(user, grade)}>Отправить</button>
      </div>
    </div>
  );
}

export { Modal };
