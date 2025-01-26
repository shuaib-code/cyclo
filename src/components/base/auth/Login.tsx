import { Button } from "@/components/ui/button";
import {
  useCurrentToken,
  useCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Link, useNavigate } from "react-router";

import { logout } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import UserAvater from "../navbar/Avater";

export default function Login() {
  const token = useAppSelector(useCurrentToken);
  return !token ? (
    <div className="inline-flex items-center space-x-2">
      <Link to="/register">
        <Button variant="outline">Register</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  ) : (
    <Logout />
  );
}

export function Logout() {
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.info("You have successfully logged out!", { duration: 1000 });
    navigate("/login");
  };
  return (
    <div className="inline-flex items-center space-x-2">
      <Button onClick={handleLogout}>Logout</Button>
      <UserAvater userName={(user as ITokenData)?.name} />
    </div>
  );
}
