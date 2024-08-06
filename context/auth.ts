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
  value: string;
  refresh: string;
  account?: string;
}

export interface IAuthData {
  user: IUser;
  token: IToken;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  authToken: IToken | null;
  user: IUser | null;
  logIn: (user: IUser, token: IToken) => Promise<void>;
  logOut: () => Promise<void>;
};

export const AuthContext = createContext<IAuthContext | null>(null);