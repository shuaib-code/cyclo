import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { ThemeProvider } from "./themeProvider";

export default function ProviderWarpper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {children}
        <Toaster richColors expand={false} position="top-right" />
      </ThemeProvider>
    </AnimatePresence>
  );
}
