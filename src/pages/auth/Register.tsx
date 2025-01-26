import Logo from "@/components/base/navbar/Logo";
import { RegisterForm } from "@/components/form/register-form";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/src/assets/register.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.8] grayscale"
        />
      </div>
    </div>
  );
}
