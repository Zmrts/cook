import { easeInOut, motion } from "framer-motion";
import { UserAvatar } from "./UserAvatar";
import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "..";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { AuthContext } from "../hoc/AuthProvider";
import { updateProfile } from "firebase/auth";
import { update, ref as dbRef } from "firebase/database";

function SettingAvatar() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputKey, setInputKey] = useState(1);
  const { storage } = useContext(Context);
  const { auth, user, setAuthLoading } = useContext(AuthContext);
  const { database } = useContext(Context);

  const inputRef = useRef(null);
  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    setSelectedImage(file);
  };
  const validateImage = (imageFile) => {
     const type = imageFile.type === 'image/png' || imageFile.type === 'image/jpeg';
     const size = imageFile.size <= 3 * 1024 * 1024;
     return type && size; 

  }

  const updateUserDataInDatabase = async (userID, photoURL) => {
    const userRef = dbRef(database, `users/${userID}`);
    const updates = {
      photoURL: photoURL,
    };
    await update(userRef, updates);
  };

  const clearSelectedImage = (evt) => {
    evt.preventDefault();
    setSelectedImage(null);
    setInputKey(prevKey => prevKey + 1);
  };

  const handleUpload = async () => {
    if (selectedImage === null || !validateImage(selectedImage)) {
      return alert('Изображение должно иметь формат JPG или PNG, и размер изображение не должен превышать 3 MB!');
    }
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
      style={{ alignItems: "center" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: easeInOut }}
    >
      <h2>Фото профиля</h2>
      <div className="currentAvatar">
        <UserAvatar imageSRC={auth.currentUser.photoURL} />
        <p>Текущее фото профиля</p>
      </div>
      <div className="upload-file_wrapper">
        <input
          key={inputKey}
          id="upload-file_input"
          accept=".jpg, .jpeg, .png"
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        <label
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          htmlFor="upload-file_input"
        >
          <span className="setting_button_save">Прикрепить фото</span>
          <div
            style={{ display: "flex", gap: "5px", position: "relative" }}
            className="selected_image"
          >
            <span style={{ fontSize: "14px" }}>
              {selectedImage ? selectedImage.name : "Фото не выбрано"}
            </span>
            {selectedImage && (
              <button
              onClick={clearSelectedImage}
                style={{
                  background: "none",
                  display: "flex",
                  position: "absolute",
                  right: "-20px",
                  bottom: "-2px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0,0,256,256"
                  width="18px"
                  height="18px"
                >
                  <g
                    fill="#ff8100"
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
              </button>
            )}
          </div>
        </label>
      </div>

      {selectedImage && (
        <button
          style={{ backgroundColor: "#3fe964" }}
          onClick={handleUpload}
          className="setting_button_save"
        >
          Сохранить
        </button>
      )}
    </motion.div>
  );
}

export { SettingAvatar };
