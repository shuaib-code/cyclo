import { verifyToken } from "@/utils/varifyToken";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ITokenData, TAuthState } from "./types";

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      if (!verifyToken(token)) {
        return; // Don't set if expired
      }
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const useIsTokenExpired = (state: RootState): boolean => {
  const user = state.auth.user as ITokenData | null;
  if (!user || !user.exp) return true;
  return Date.now() / 1000 > user.exp; // Compare current time with expiry
};

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
