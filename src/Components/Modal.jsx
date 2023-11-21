import { useContext, useState } from "react"
import { Context } from "..";
import { increment, ref,update } from "firebase/database";

function Modal({users}) {

    const [coocker, setCoocker] = useState('Не выбран');
    const [grade, setGrade] = useState('Не выбрана');

    const {database} = useContext(Context);

    const closeModal = () => {
        const overlay = document.querySelector('.overlay');
        const modal = document.querySelector('.modal');
        const selected = document.getElementById('selected');
        selected.selected = true;
        
        modal.style.transform = 'scale(0)';
        modal.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            setCoocker('Не выбран');
            setGrade('Не выбрана');
        }, 55);
     
       
    }
    const  handleChangeSelect = (evt) => {
        setCoocker(evt.target.value);

    }
    const gradeArray = [1,2,3,4,5,6,7,8,9,10];

    const handleGrade = (rating) => {
        setGrade(rating);
    }
    const putGrade = async (coocker, grade) => {

       if (grade === 'Не выбрана' || coocker === 'Не выбран') {
        alert('ОЦЕНКА ИЛИ ПОЛЬЗОВАТЕЛЬ НЕ ВЫБРАНЫ')
       } else {
        const userRef = ref(database, `users/${coocker}`);
        const updates = {
            rating: increment(grade)
        }
        try {
            await update(userRef, updates);
          
            setTimeout(() => {
                closeModal();
            }, 10);
        } catch(err) {
            console.log(err);
        }
       }
    } 

    return <div className="overlay">
        <div className="modal">
            <button onClick={closeModal} className="close">Закрыть</button>
            <div className="select">
                <span>Выбери повара:</span>
                <select onChange={handleChangeSelect} name="coocker" id="coocker">
                <option id="selected" value="" disabled selected hidden></option>
                    {!users.length ? null
                    : users.map((user) => <option value={user.userName}>{user.userName}</option>)}
                </select>
            </div>
            <h2 style={{textAlign:'center', marginBottom:'10px'}}>Оценка</h2>
            <ul className="select_rating">
                {gradeArray.map((rating) => <li onClick={() => handleGrade(rating)} key={rating} className={`grade ${grade === rating ? 'active' : null}`}>{rating}</li>)}
            </ul>
            <p>Выбранный повар: {coocker}</p>
            <p>Оценка: {grade}</p>
            <button  onClick={() => putGrade(coocker, grade )}>Сохранить</button>           
        </div>
    </div>
}

export {Modal}