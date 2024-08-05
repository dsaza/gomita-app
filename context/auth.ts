import { createContext } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
};

export const AuthContext = createContext<IAuthContext | null>(null);