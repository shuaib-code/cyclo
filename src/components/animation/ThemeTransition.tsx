import { useTheme } from "@/provider/themeProvider";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeTransition = () => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 700); // Match animation duration
    return () => clearTimeout(timer);
  }, [theme]); // Trigger animation when theme changes

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ clipPath: "circle(0% at 100% 0%)" }} // Start from top-right
          animate={{ clipPath: "circle(150% at 100% 0%)" }} // Expand fully
          exit={{ clipPath: "circle(0% at 100% 0%)" }} // Reset back
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={clsx(
            "fixed inset-0 z-[9999] pointer-events-none", // Prevents interaction blocking
            theme === "light" ? "bg-white" : "bg-black"
          )}
        />
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
