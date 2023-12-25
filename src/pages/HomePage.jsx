import { useLocation } from "react-router-dom";
import { CooksRating } from "../Components/CooksRating";
import { Feed } from "../Components/Feed";
import { motion, AnimatePresence } from "framer-motion";

function HomePage() {
  const { pathname } = useLocation();
  return (
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
    
  );
}

export { HomePage };
