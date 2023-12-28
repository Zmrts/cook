import { easeInOut, motion } from "framer-motion";
import { AuthContext } from "../hoc/AuthProvider";
import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { Context } from "..";
import { ref, update } from "firebase/database";

function SettingUsername() {
  const { auth, user, setAuthLoading } = useContext(AuthContext);
  const {database} = useContext(Context);
  const [userName, setUserName] = useState("");

  const isVaildUserName = (string) => {
    const isValid = string.length && string.length >= 3 && string.length <= 30 && /^[^\s.,:;!?\s]+(?:\s[^\s.,:;!?\s]+)*$/.test(string);
    return isValid;
  };
  const updateDataInDatabase = async (userID, newUserName) => {
      const userRef = ref(database, `users/${userID}`);
      const updates = {
        userName:newUserName,
      }
      try {
        await update(userRef, updates);
      } catch (err) {
        alert(err);
      }
  }
  const updateUserName = async () => {
    if (isVaildUserName(userName)) {
      try {
        setAuthLoading(true);
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
        await updateDataInDatabase(auth.currentUser.uid, userName);
        setUserName('');
      } catch (err) {
        alert(err);
      } finally {
        setAuthLoading(false);
      }
    } else {
      alert('Новое имя не прошло валидацию');
    }
  };

  const handleChange = (evt) => {
    setUserName(evt.target.value);
  };

  return (
    <motion.div
      className="setting settings_username"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
    >
      <p>Текущее имя: <span style={{fontWeight:'600'}}>{user.displayName}</span></p>
      <div style={{ display: "flex", gap: "0.5rem" }} className="setting_input">
        <span>Новое имя:</span>
        <input value={userName} onChange={handleChange} type="text" />
      </div>
      <button onClick={updateUserName} className="setting_button_save">Применить</button>
    </motion.div>
  );
}

export { SettingUsername };
