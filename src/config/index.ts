interface Config {
  apiUrl: string;
  CLOUDINARY_UPLOAD_PRESET: string;
  CLOUDINARY_URL: string;
  SP_KEY: string;
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL,
  CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL: import.meta.env.VITE_CLOUDINARY_URL,
  SP_KEY: import.meta.env.VITE_SP,
};

export default config;
