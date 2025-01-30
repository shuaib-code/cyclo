import placeholder from "@/assets/placeholder.svg";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.src = placeholder;
};

export default handleImageError;
