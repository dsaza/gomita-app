import { createContext } from "react";

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  nickname: string;
  birthdate: number;
  phone: string;
  email: string;
  avatar: string | null;
}

export interface IToken {
  value?: string;
  refresh?: string;
  account?: string;
}

export interface IAuthData {
  user: IUser | null;
  token: IToken;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  authToken: IToken | null;
  user: IUser | null;
  logIn: (options: { user: IUser, token: IToken, phone: string }) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<IAuthContext | null>(null);