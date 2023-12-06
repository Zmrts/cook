import {useEffect, useRef, useState, useContext} from "react";
import {increment, ref, update, push, child } from "firebase/database";
import { Context } from "..";

const RatingForm = (props) => {
  const { userName, isShowForm, setIsShowForm, gradeFormRef} = props;
  const {database} = useContext(Context);
  const [grade, setGrade] = useState("Не выбрана");

  const hideGradeForm = () => {
    gradeFormRef.current.style.top = '-100%';
    setTimeout(() => {
      setIsShowForm(false);
    }, 320);
  }

  const sendNote = async (toUser, grade) => {
    if (toUser && grade) {
        const newPostKey = push(child(ref(database), 'posts')).key;
        const postData = {
            toUser: toUser,
            message:`${toUser} получил(а) оценку ${grade}`,
            fullDateTime: new Date().toISOString(),
            type:'note'
        }

        const updates = {};
        updates['/posts/' + newPostKey] = postData;
        await update(ref(database), updates);
        
    } else {
        console.error('Ошибка при отправке сообщения');
    }
}

  const putGrade = async (coocker, grade) => {
    if (grade === "Не выбрана" || coocker === "Не выбран") {
      alert("Ошибка! Оценка или пользователь определены.");
    } else {
      const userRef = ref(database, `users/${coocker}`);
      const updates = {
        rating: increment(grade),
        quantity: increment(1),
      };
      try {
        await update(userRef, updates);
        await sendNote(coocker, grade);

        setTimeout(() => {
          hideGradeForm();
        }, 10);
      } catch (err) {
        alert('Есть ошибка! Смотри консоль!')
        console.log(err);
      }
    }
  };

  const gradeOnclick = (grade) => {
    setGrade(grade);
  };

 
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const gradeForm = gradeFormRef.current;
    if (isShowForm) {
      setTimeout(() => {
        gradeForm.style.top = '0';
      }, 10);
    } 
  }, [isShowForm])

  return (
    <div ref={gradeFormRef} className="gradeForm">
      <button className="close"></button>
      <h3 style={{ textAlign: "center" }}>Выбери оценку</h3>
      <ul className="grades">
        {grades.map((gradeItem) => (
          <li style={grade === gradeItem ? {backgroundColor:'#3cb954'} : {}} key={gradeItem} onClick={() => gradeOnclick(gradeItem)}>
            {gradeItem}
          </li>
        ))}
      </ul>
      <p>Пользователь: {userName}</p>
      <p>Оценка: {grade} </p>
      <button  onClick={() => putGrade(userName, grade)} className="grade_btn">Сохранить</button>
    </div>
  );
};




function CooksRatingItem(props) {
  const { userName, averageRating, quantity, index, isCurrent } =
    props;
  const [isShowForm, setIsShowForm] = useState(false);
  const gradeFormRef = useRef(null);

  return (
    <li   
      className={`cooks-item ${index === 0 ? "best" : ""}`}
    >
      {isCurrent && <div className="cooks-item_isCurrentCoock"></div>}
      <div className="cooks-item_avatar"></div>
      <h3 className="cooks-item_name">{userName}</h3>
      <div className="cooks-item_rating">
        <div>
          <p>
            {" "}
            РЕЙТИНГ: <span style={{ fontWeight: "700" }}>{averageRating}</span>
          </p>
          <p>
            Количество: <span>{quantity}</span>
          </p>
        </div>

        <a onClick={(evt) => {evt.preventDefault(); setIsShowForm(true)}} href="#">
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
      {isShowForm && <RatingForm 
      gradeFormRef={gradeFormRef} 
      setIsShowForm={setIsShowForm}
      isShowForm={isShowForm} 
      userName={userName} />}
    </li>
  );
}

export { CooksRatingItem };
