import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <Slot />;
}
