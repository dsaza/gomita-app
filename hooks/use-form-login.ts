import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FormLoginHook {
  isLoadingData: boolean;
  phone: string;
  pin: string;
  otp: string;
  step: 'phone' | 'pin' | 'otp' | null;
  updateFormItem: (key: 'phone' | 'pin' | 'otp', value: string) => void;
  updateStep: (step: 'phone' | 'pin' | 'otp' | null) => void;
}

export function useFormLogin (): FormLoginHook {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'pin' | 'otp' | null>(null);

  const updateFormItem: FormLoginHook["updateFormItem"] = (key, value) => {
    key === 'phone' && setPhone(value);
    key === 'pin' && setPin(value);
    key === 'otp' && setOtp(value);
  }

  const updateStep: FormLoginHook["updateStep"] = (step) => {
    setStep(step);
  }
  
  useEffect(() => {
    AsyncStorage.getItem('phone')
      .then((value) => {
        if (value !== null) {
          setPhone(value);
        }
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);
  
  return {
    isLoadingData,
    phone,
    pin,
    otp,
    step,
    updateFormItem,
    updateStep,
  };
}