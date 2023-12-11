import { CooksRating } from "../Components/CooksRating";
import { Feed } from "../Components/Feed";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <>
        <CooksRating />
        <Feed />
    </>
  );
}

export { HomePage };
