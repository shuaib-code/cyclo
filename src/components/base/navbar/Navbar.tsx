import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router";
import Login from "../auth/Login";
import { MenuIcon } from "./icon";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="hidden items-center gap-2 text-sm font-medium md:flex">
            <Login />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <NavLinks />
              </div>
              <Login />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLinks() {
  const location = useLocation();

  const links: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/login", label: "Login" },
  ];

  return (
    <>
      {links.map(({ to, label }, idx) => (
        <Link
          key={idx}
          to={to}
          className={` transition-all duration-300
            ${
              location.pathname === to
                ? "text-primary" // Active Link Style
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            }
          `}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
