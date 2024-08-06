import { useState } from "react";
import { View } from "react-native";
import { useLoginContext } from "@/hooks/use-login-context";
import { useClientContext } from "@/hooks/use-client-context";
import { NumberKeyBoard } from "./number-keyboard";
import { OtpExpiration } from "./otp-expiration";

export function FormOtp () {
  const [error, setError] = useState<string | undefined>();
  const { preLoginData, otp, updateFormItem, changeLoading } = useLoginContext();
  const { callAPI } = useClientContext();

  const updateError = (message: string | undefined) => {
    setError(message);
  }

  const handleFinish = (value: string) => {
    setError(undefined);
    changeLoading(true);

    callAPI('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        id: preLoginData?.id,
        email: preLoginData?.email,
        otpCode: value,
      })
    })
      .then((result) => {
        if (result.isSuccess !== 200) {
          updateFormItem('otp', '');
          setError(result.data?.message ?? 'No se pudo iniciar sesión');
          return;
        }

        alert('Loggued in!');
      })
      .finally(() => {
        changeLoading(false);
      });
  }

  return (
    <View
      style={{
        width: '100%',
        gap: 32,
        flexGrow: 1,
        paddingTop: 40,
        alignItems: 'center',
      }}
    >
      <NumberKeyBoard
        label="Ingresa el código de verificación que llegó a tu correo."
        length={4}
        value={otp}
        error={error}
        onUpdate={(value) => {
          updateFormItem('otp', value);
          setError(undefined);
        }}
        onFinished={handleFinish}
      />
      <OtpExpiration
        updateError={updateError}
      />
    </View>
  )
}