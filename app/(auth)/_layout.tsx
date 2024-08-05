import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function AppLayout () {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Redirect href='/' />
  }

  return <Stack />
}