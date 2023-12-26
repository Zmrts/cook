import { CooksRating } from "../Components/CooksRating";
import { Feed } from "../Components/Feed";
import { motion} from "framer-motion";
import { Modal } from "../Components/Modal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hoc/AuthProvider";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user && !user.emailVerified) {
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
  }, [])
  return (
    <>
    {showModal && <Modal 
    text='Вам необходимо подтвердить Ваш email адрес. Для подтверждения перейдите Настройки > Почта'
    handleClick={() => setShowModal(false)} />}
              <motion.div
              className="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 0.1] }}
            >
    
      <CooksRating />
      <Feed />
      </motion.div>
      </>
  );
}

export { HomePage };
