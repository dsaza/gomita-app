import { useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { getWelcomeMessage } from "@/lib/welcome";
import { useLoginContext } from "@/hooks/use-login-context";
import { useClientContext } from "@/hooks/use-client-context";

export function FormPhone() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { phone, updateFormItem, updateStep } = useLoginContext();
  const { callAPI } = useClientContext();

  const handleContinue = () => {
    if (phone.length !== 10) {
      setError('El número de celular debe tener 10 dígitos');
      return;
    }

    if (!phone.startsWith('30') && !phone.startsWith('31') && !phone.startsWith('32')) {
      setError('El número de celular es inválido');
      return;
    }

    Keyboard.dismiss();

    setIsLoading(true);
    setError(undefined);

    callAPI(`/user/validate-phone/${phone}`, { delay: 1000 })
      .then((result) => {
        if (result.isSuccess !== 200) {
          setError('Ocurrió un error al validar el número de celular');
          return;
        }

        updateStep('pin');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <View
      style={{
        width: '100%',
        gap: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: COLORS.white
        }}
      >
        Hola, {getWelcomeMessage()}! Por favor ingresa tu número de celular para continuar.
      </Text>
      <View>
        <View
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          <Text
            style={{
              position: 'absolute',
              top: 0,
              left: 16,
              zIndex: 1,
              color: COLORS.blackForeground,
              lineHeight: 52,
            }}
          >
            (+57)
          </Text>
          <TextInput
            placeholder='Digita tu número de celular'
            placeholderTextColor={COLORS.blackForeground}
            keyboardType='number-pad'
            maxLength={10}
            blurOnSubmit
            style={{
              width: '100%',
              paddingRight: 16,
              height: 52,
              paddingLeft: 56,
              backgroundColor: COLORS.white,
              borderRadius: 8,
              color: COLORS.black,
              fontSize: 16,
              borderWidth: 1,
              borderColor: error !== undefined ? COLORS.error : COLORS.white,
            }}
            value={phone}
            onChangeText={(text) => {
              updateFormItem('phone', text);
            }}
          />
        </View>
        {error !== undefined && (
          <Text
            style={{
              fontSize: 14,
              color: COLORS.error,
              marginTop: 8,
            }}
          >
            {error}
          </Text>
        )}
      </View>
      <Pressable
        disabled={isLoading}
        style={({ pressed }) => ({
          width: '100%',
          padding: 16,
          backgroundColor: pressed ? COLORS.secondaryForeground : COLORS.secondary,
          borderRadius: 8,
          alignItems: 'center',
        })}
        onPress={handleContinue}
      >
        <Text
          style={{
            fontSize: 14,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}
        >
          {isLoading ? 'Cargando...' : 'Continuar'}
        </Text>
      </Pressable>
    </View>
  )
}