import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { ScreenLayout } from '@/components/auth/screen-layout';

export default function SignIn () {
  return (
    <ScreenLayout>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <Text>Sign In</Text>
      </View>
    </ScreenLayout>
  )
}
