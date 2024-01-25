import { easeInOut, motion } from "framer-motion"
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from "firebase/auth"
import { AuthContext } from "../hoc/AuthProvider"
import { useContext, useState } from "react"

function SettingPassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {auth, setAuthLoading} = useContext(AuthContext);

  const validatePassword = (currentPassword, newPassword) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()-_+=<>?]+$/;
    if (currentPassword === '' || newPassword ==='') throw new Error('Заполните все поля!');
    const isPasswordValid = passwordRegex.test(newPassword);
    if (newPassword.length < 8) throw new Error('Пароль должен состоять не менее чем из 8 символов!')
    if (!isPasswordValid) throw new Error('Пароль должен содержать в себе символы латиницы и как минимум 1 цифру!')
  }

  const handleCurrentPasswordChange = (evt) => {
    setCurrentPassword(evt.target.value);
  }

  const handleNewPasswordChange = (evt) => {
    setNewPassword(evt.target.value);
  }
  const changePassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);
    setAuthLoading(true);
    try {
      validatePassword(currentPassword, newPassword);
      await reauthenticateWithCredential(user, credentials);
      await updatePassword(user, newPassword);
      alert('Пароль успешно изменен');
      setCurrentPassword('');
      setNewPassword('');
    } catch(err) {
      console.log(err);
      alert(err);
    }
    finally {
      setAuthLoading(false);
    }
  }

    return (
        <motion.div
        className="setting settings_password"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        
        transition={{ duration: 0.3, ease: easeInOut}}
      >
        <h2>Пароль</h2>
        <div  className="setting_input">
        <span>Текущий пароль:</span> <input value={currentPassword} onChange={handleCurrentPasswordChange} type="text"/>
        </div>
        <div className="setting_input">
        <span>Новый пароль:</span> <input value={newPassword} onChange={handleNewPasswordChange} type="text"/>
        </div>
        <button onClick={() => changePassword(currentPassword, newPassword)} className="setting_button_save">Изменить</button>
    </motion.div>
    )
}

export {SettingPassword}