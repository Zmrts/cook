import { easeInOut, motion } from "framer-motion";
import { UserAvatar } from "./UserAvatar";
import { useState, useContext, useRef} from "react";
import { Context } from "..";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { AuthContext } from "../hoc/AuthProvider";
import { updateProfile } from "firebase/auth";
import { update, ref as dbRef } from "firebase/database";


function SettingAvatar() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { storage } = useContext(Context);
  const { auth, user, setAuthLoading } = useContext(AuthContext);
  const {database} = useContext(Context);
  const inputRef = useRef(null);

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    setSelectedImage(file);
  };
  const updateUserDataInDatabase = async (userID, photoURL) => {
    const userRef = dbRef(database, `users/${userID}`);
    const updates = {
      photoURL:photoURL,
    }
  await update(userRef, updates);
  };


  const handleUpload = async () => {
    const avatarsRef = storageRef(storage, "user_avatars");
    const userID = user.uid;
    const fileName = userID + "_avatar.jpg";
    const fileRef = storageRef(avatarsRef, fileName);
    // console.log('testRef.fullPath: ',fileRef.fullPath);
    // console.log('testRef.name: ',fileRef.name);
    // console.log('testRef.parent: ',fileRef.parent);
    try {
      setAuthLoading(true);
      await uploadBytes(fileRef, selectedImage);
      const downloadURL = await getDownloadURL(fileRef);
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await updateUserDataInDatabase(auth.currentUser.uid, downloadURL);

      alert("Изображение успешно загружено! АДРЕС Изображения", downloadURL);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {

      setSelectedImage(null);
      setAuthLoading(false);

    }
  };
  return (
    <motion.div
      className="setting settings_username"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
    >
      <div className="currentAvatar">
        <UserAvatar imageSRC={auth.currentUser.photoURL} />
        <p>Текущее фото профиля</p>
      </div>
      <input ref={inputRef} type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="setting_button_save">
        Загрузить
      </button>
    </motion.div>
  );
}

export { SettingAvatar };
