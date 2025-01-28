import React from "react";

type LoaderTextProps = {
  text: string;
  isLoading: boolean;
  size?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const LoaderText: React.FC<LoaderTextProps> = ({ text, isLoading }) => {
  const Text = text || "Loading";
  return (
    <div className="w-full flex items-center justify-center gap-2">
      {isLoading && <Loader />}
      {isLoading ? `${Text}...` : Text}
    </div>
  );
};

export default LoaderText;

function Loader() {
  return (
    <div
      role="status"
      className="border-gray-300 w-5 h-5 animate-spin rounded-full border-[3px] border-t-primary-foreground"
    ></div>
  );
}
