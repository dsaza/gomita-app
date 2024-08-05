import { createContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  authToken?: string;
  logIn: (token: string) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<IAuthContext | null>(null);