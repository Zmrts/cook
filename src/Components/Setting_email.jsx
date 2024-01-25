import { Context } from "..";
import { AuthContext } from "../hoc/AuthProvider";
import { useContext, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { sendEmailVerification, updateEmail} from "firebase/auth";
import { ref, update } from "firebase/database";
import { Modal } from "./Modal";
function SettingEmail() {


  const {database} = useContext(Context);
  const { auth, user, setAuthLoading } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const emailIsVerified = user.emailVerified;


  const emailIsVerify = {
    status:'Подтверждён',
    styles: {
      color:'var(--settingsListHover)',
    }
  }
  const emailIsNotVerifiy = {
    status:'Не подтверждён',
    styles: {
      color:'orange',
    }
  }
  const confirmButtonStyles = {
    fontSize:'13px',
    textDecoration: 'underline',
    cursor:'pointer',
  }
  const confirmEmail = async () => {
    try {
      setAuthLoading(true);
      await sendEmailVerification(auth.currentUser);
      setAuthLoading(false);
      setShowModal(true);
    } catch(err) {
      alert(err);
      setAuthLoading(false);
    }
  }
  const checkValidEmail = (newEmail) => {
    const isValidEmail = newEmail.length && /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(newEmail);
    return isValidEmail;
  }

  const updateEmailInDatabase = async (userID, newEmail) => {
    const userRef = ref(database, `users/${userID}`);
    const updates = {
      email: newEmail,
    }
    try {
      await update(userRef, updates);
    } catch(err) {
      alert(err);
    }
  }

  const changeEmail = async (newEmail) => {
    if (checkValidEmail(newEmail)) {
      try {
        setAuthLoading(true);
       await updateEmail(auth.currentUser, newEmail);
       await updateEmailInDatabase(user.uid, newEmail);

      } catch(err) {
        alert(err);
      } finally {
        setNewEmail('');
        setAuthLoading(false);
      }
    } else {
      alert('Еmail не прошел валидацию')
    }
    
  }

  const handleChange = (evt) => {
    setNewEmail(evt.target.value);
  }

    return (
      <>
      {showModal && <Modal text={'На Ваш почтовый ящик было отправлено письмо для подтверждения адреса email. Проверьте почту.'} handleClick={() => setShowModal(false)} /> }
      
        <motion.div
        className="setting settings_Email"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        
        transition={{ duration: 0.3, ease: easeInOut}}
      >
        <h2>Email</h2>
        <p>Текущий Email: <span style={{fontWeight:'600'}}>{user.email}</span></p>
        <p >Статус: {emailIsVerified 
        ? <span style={emailIsVerify.styles}>{emailIsVerify.status}</span>
        : <><span style={emailIsNotVerifiy.styles}>{emailIsNotVerifiy.status}</span> <span onClick={confirmEmail} style={confirmButtonStyles}>Подтвердить</span></>}</p>
      <div style={{ display: "flex", gap: "0.5rem" }} className="setting_input">
        <span>Новый Email:</span>
        <input value={newEmail} onChange={handleChange}  type="text" />
      </div>
      <button onClick={() => changeEmail(newEmail)}  className="setting_button_save">Применить</button>
      
    </motion.div>
    </>
    )
}

export {SettingEmail}
