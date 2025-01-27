import { Particles } from "@/components/magicui/particles";
import { useTheme } from "@/provider/themeProvider";
import { useEffect, useState } from "react";

const Banner =
  "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?q=80&w=1909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function AuthBanner() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <div className="relative hidden bg-muted lg:block">
      <Particles
        className="absolute inset-0 z-10"
        size={1}
        quantity={100}
        ease={80}
        color={color}
        vx={1}
        vy={2}
        refresh
      />
      <img
        src={Banner}
        alt="Authentication Banner"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5] dark:brightness-[0.2] dark:grayscale"
      />
      <div className="absolute inset-0 flex items-center justify-center px-6 z-20">
        <div className="backdrop-blur-lg bg-white/10  rounded-2xl p-8 text-center shadow-lg max-w-md">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Welcome to{" "}
            <span className=" bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
              Cyclo !
            </span>
          </h1>
          <p className="mt-3 text-base text-white/70  drop-shadow-sm">
            Cyclo has completely transformed my cycling experience! From
            effortless browsing to seamless order management, everything feels
            smooth and intuitive.
          </p>
        </div>
      </div>
    </div>
  );
}
