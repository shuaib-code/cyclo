export type TAuthState = {
  user: null | object;
  token: null | string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
};
export type TLogin = {
  email: string;
  password: string;
};

export interface ITokenData {
  id: string;
  role: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export const Role = {
  admin: "admin",
  customer: "customer",
} as const;

export type TRole = "admin" | "customer";
