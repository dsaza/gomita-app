import { Pressable, Text, View } from "react-native";
import { NumberKeyBoard } from "./number-keyboard";
import { useLoginContext } from "@/hooks/use-login-context";
import { COLORS } from "@/constants/colors";

export function FormPin () {
  const { pin, updateFormItem, changeLoading, updateStep } = useLoginContext();

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
        onUpdate={(value) => {
          updateFormItem('pin', value);
        }}
        onFinished={(value) => {
          changeLoading(true);
          console.log('Sending pin...', value);
        }}
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