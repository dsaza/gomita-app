import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/stores/use-auth-store';

export default function AppLayout () {
  const { isAuthenticated } = useAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
  }))

  if (!isAuthenticated) {
    return <Redirect href='/sign-in' />
  }

  return <Stack />
}