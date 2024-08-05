import { useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { getWelcomeMessage } from "@/lib/welcome";
import { useLoginContext } from "@/hooks/use-login-context";

export function FormPhone() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { phone, updateFormItem, updateStep } = useLoginContext();

  const handleContinue = () => {
    const formPhone = phone.trim();

    if (formPhone.length !== 10) {
      setError('El número de celular debe tener 10 dígitos');
      return;
    }

    if (!formPhone.startsWith('30') && !formPhone.startsWith('31') && !formPhone.startsWith('32')) {
      setError('El número de celular es inválido');
      return;
    }

    setError(undefined);
    updateStep('pin');
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
            onChangeText={(text) => {
              updateFormItem('phone', text);

              if (text.length === 10) {
                Keyboard.dismiss();
              }
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
          Continuar
        </Text>
      </Pressable>
    </View>
  )
}