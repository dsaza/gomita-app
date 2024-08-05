import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '@/hooks/use-keyboard';
import { COLORS } from '@/constants/colors';

interface ScreenLayoutProps {
  children: React.ReactNode;
  background?: 'white' | 'primary';
}

export function ScreenLayout({ children, background = 'white' }: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboard();
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background === 'white' ? COLORS.white : COLORS.primary,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: insets.top,
        paddingBottom: keyboard.isOpen ? keyboard.metrics?.height : insets.bottom
      }}
    >
      <StatusBar style={background === 'white' ? 'dark' : 'light'} />
      {children}
    </View>
  );
}
