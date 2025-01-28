import { Toaster } from "sonner";
import { ThemeProvider } from "./themeProvider";

export default function ProviderWarpper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {children}
      <Toaster richColors expand={false} position="top-right" />
    </ThemeProvider>
  );
}
