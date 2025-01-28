import { useTheme } from "@/provider/themeProvider";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CurtainRevealTopRight = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [theme]);

  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 100% 0%)" }}
      animate={{
        clipPath: animationKey
          ? "circle(100% at 100% 0%)"
          : "circle(0% at 100% 0%)",
      }}
      exit={{ clipPath: "circle(0% at 100% 0%)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default CurtainRevealTopRight;
