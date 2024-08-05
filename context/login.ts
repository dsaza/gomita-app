import { createContext } from "react";

export interface ILoginContext {
  phone: string;
  pin: string;
  otp: string;
  step: 'phone' | 'pin' | 'otp' | null;
  isLoading: boolean;
  updateFormItem: (key: 'phone' | 'pin' | 'otp', value: string) => void;
  updateStep: (step: 'phone' | 'pin' | 'otp' | null) => void;
  changeLoading: (value: boolean) => void;
}

export const LoginContext = createContext<ILoginContext | null>(null);