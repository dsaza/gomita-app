import { Image, Text, View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { ScreenLayout } from '@/components/auth/screen-layout';
import { COLORS } from '@/constants/colors';
import { useKeyboard } from '@/hooks/use-keyboard';
import { FormPhone } from '@/components/auth/form-phone';
import { useFormLogin } from '@/hooks/use-form-login';

export default function SignIn () {
  const keyboard = useKeyboard();
  const { step, phone, isLoadingData, updateFormItem, updateStep } = useFormLogin();

  return (
    <ScreenLayout background='primary'>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {!isLoadingData && (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 24
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              source={require('@/assets/images/login.png')}
              style={{
                width: keyboard.isOpen ? 160 : 220,
                height: keyboard.isOpen ? 160 : 220,
                marginTop: 20,
                objectFit: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: keyboard.isOpen ? 12 : 14,
                color: COLORS.white,
                marginTop: 8,
                letterSpacing: 20,
                opacity: 0.3,
                textTransform: 'uppercase'
              }}
            >
              Gomita
            </Text>
          </View>
          <FormPhone
            phone={phone}
            updateFormItem={updateFormItem}
          />
        </View>
      )}
      {isLoadingData && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      )}
    </ScreenLayout>
  )
}
