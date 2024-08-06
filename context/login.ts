import { createContext } from "react";

export interface IPreLoginData {
  id: string;
  email: string;
  otpExpiration: number;
}

export interface ILoginContext {
  phone: string;
  pin: string;
  otp: string;
  step: 'phone' | 'pin' | 'otp' | null;
  isLoading: boolean;
  preLoginData: IPreLoginData | null;
  updateFormItem: (key: 'phone' | 'pin' | 'otp', value: string | null) => void;
  updateStep: (step: 'phone' | 'pin' | 'otp' | null) => void;
  changeLoading: (value: boolean) => void;
  updatePreLoginData: (data: IPreLoginData | null) => void;
}

export const LoginContext = createContext<ILoginContext | null>(null);