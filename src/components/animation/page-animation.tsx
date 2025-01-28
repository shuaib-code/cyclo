import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageAnimationProps {
  children: ReactNode;
}

const PageAnimation = ({ children }: PageAnimationProps) => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }} // Start from right
      animate={{ x: 0, opacity: 1 }} // Move to center
      exit={{ x: "-100%", opacity: 0 }} // Exit to left
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageAnimation;
