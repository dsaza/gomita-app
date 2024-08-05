import { View } from "react-native";
import { NumberKeyBoard } from "./number-keyboard";
import { useLoginContext } from "@/hooks/use-login-context";

export function FormPin () {
  const { pin, updateFormItem, changeLoading } = useLoginContext();

  return (
    <View
      style={{
        width: '100%',
        gap: 20,
        flexGrow: 1,
        paddingTop: 40,
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
    </View>
  )
}