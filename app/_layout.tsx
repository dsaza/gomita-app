import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { ScreenLayout } from '@/components/auth/screen-layout';
import { GlobalLoader } from '@/components/loader';
import { AuthProvider } from '@/context/auth.provider';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return (
      <ScreenLayout background='primary'>
        <GlobalLoader />
      </ScreenLayout>
    );
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
