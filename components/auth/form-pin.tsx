import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { NumberKeyBoard } from "./number-keyboard";
import { useLoginContext } from "@/hooks/use-login-context";
import { COLORS } from "@/constants/colors";
import { useClientContext } from "@/hooks/use-client-context";
import { IPreLoginData } from "@/context/login";

export function FormPin () {
  const [error, setError] = useState<string | undefined>();
  const { phone, pin, updateFormItem, changeLoading, updateStep, updatePreLoginData } = useLoginContext();
  const { callAPI } = useClientContext();

  const handleFinish = (value: string) => {
    setError(undefined);
    changeLoading(true);

    callAPI('/user/pre-login', {
      method: 'POST',
      body: JSON.stringify({ phone, pin: value })
    })
      .then((result) => {
        if (result.isSuccess !== 200) {
          updateFormItem('pin', '');
          setError(result.data?.message ?? 'No se pudo iniciar sesión');
          return;
        }

        const preLoginData = result.data?.data as IPreLoginData;
        updatePreLoginData(preLoginData);
        updateStep('otp');
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
        label="Por favor ingresa tu PIN para continuar."
        length={4}
        value={pin}
        error={error}
        onUpdate={(value) => {
          updateFormItem('pin', value);
          setError(undefined);
        }}
        onFinished={handleFinish}
      />
      <Pressable
        style={{
          backgroundColor: COLORS.primary,
        }}
        onPress={() => {
          updateStep('phone');
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: COLORS.white,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}
        >
          Cambiar número de celular
        </Text>
      </Pressable>
    </View>
  )
}