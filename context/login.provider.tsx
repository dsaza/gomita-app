import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLoader } from "@/components/loader";
import { COLORS } from "@/constants/colors";
import { ILoginContext, IPreLoginData, LoginContext } from "./login";

export function LoginProvider ({ children }: React.PropsWithChildren) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [preLoginData, setPreLoginData] = useState<IPreLoginData | null>(null);
  const [step, setStep] = useState<'phone' | 'pin' | 'otp' | null>(null);

  const updateFormItem: ILoginContext["updateFormItem"] = (key, value) => {
    key === 'phone' && setPhone(value ?? '');
    key === 'pin' && setPin(value ?? '');
    key === 'otp' && setOtp(value ?? '');
  }

  const updateStep: ILoginContext["updateStep"] = (step) => {
    setStep(step);
  }

  const changeLoading: ILoginContext["changeLoading"] = (value) => {
    setIsLoading(value);
  }

  const updatePreLoginData: ILoginContext["updatePreLoginData"] = (data) => {
    setPreLoginData(data);
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
        preLoginData,
        updateFormItem,
        updateStep,
        changeLoading,
        updatePreLoginData,
      }}
    >
      {children}
      {isLoadingData || isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: COLORS.primary,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10
          }}
        >
          <GlobalLoader />
        </View>
      )}
    </LoginContext.Provider>
  );
}