import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLoader } from "@/components/loader";
import { ILoginContext, LoginContext } from "./login";

export function LoginProvider ({ children }: React.PropsWithChildren) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const changeLoading: ILoginContext["changeLoading"] = (value) => {
    setIsLoading(value);
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
        isLoading,
        phone,
        pin,
        otp,
        step,
        updateFormItem,
        updateStep,
        changeLoading,
      }}
    >
      {!isLoadingData && !isLoading && children}
      {isLoadingData || isLoading && <GlobalLoader />}
    </LoginContext.Provider>
  );
}