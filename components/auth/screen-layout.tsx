import { View } from 'react-native';

export function ScreenLayout({ children }: React.PropsWithChildren) {
  return (
    <View>
      {children}
    </View>
  );
}
