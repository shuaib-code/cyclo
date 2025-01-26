import Icon from "@/assets/crank1.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"} className="flex justify-center items-center gap-0">
      <img
        src={Icon}
        alt="Cycling Logo"
        className="h-10 w-10 rounded-lg rotate-180"
      />

      <span className="font-bold pb-1 text-2xl bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
        Cyclo
      </span>
    </Link>
  );
};

export default Logo;
