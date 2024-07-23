import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Text>
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
}
