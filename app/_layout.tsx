import { ScreenLayout } from '@/components/auth/screen-layout';
import { COLORS } from '@/constants/colors';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return (
      <ScreenLayout background='primary'>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      </ScreenLayout>
    );
  }

  return (
    <>
      <Slot />
    </>
  );
}
