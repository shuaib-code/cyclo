/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return null; // Token expired
    }
    return decoded;
  } catch (e) {
    return null; // Invalid token
  }
};
