import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLoader } from "@/components/loader";
import { ILoginContext, LoginContext } from "./login";

export function LoginProvider ({ children }: React.PropsWithChildren) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'pin' | 'otp' | null>(null);

  const updateFormItem: ILoginContext["updateFormItem"] = (key, value) => {
    key === 'phone' && setPhone(value);
    key === 'pin' && setPin(value);
    key === 'otp' && setOtp(value);
  }

  const updateStep: ILoginContext["updateStep"] = (step) => {
    setStep(step);
  }

  useEffect(() => {
    AsyncStorage.getItem('phone')
      .then((value) => {
        if (value !== null) {
          setPhone(value);
          setStep('pin');
        } else {
          setStep('phone');
        }
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  return (
    <LoginContext.Provider
      value={{
        phone,
        pin,
        otp,
        step,
        updateFormItem,
        updateStep,
      }}
    >
      {!isLoadingData && children}
      {isLoadingData && <GlobalLoader />}
    </LoginContext.Provider>
  );
}