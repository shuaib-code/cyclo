interface Config {
  apiUrl: string;
  CLOUDINARY_UPLOAD_PRESET: string;
  CLOUDINARY_URL: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL: import.meta.env.VITE_CLOUDINARY_URL,
};

export default config;
