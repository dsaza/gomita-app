import { ActivityIndicator, View } from "react-native";
import { COLORS } from "@/constants/colors";

interface GlobalLoaderProps {
  fill?: "white" | "primary"
}

export function GlobalLoader ({ fill = 'white' }: GlobalLoaderProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color={fill === "white" ? COLORS.white : COLORS.primary} />
    </View>
  )
}