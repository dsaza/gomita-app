import { Pressable, Text } from 'react-native';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function Index () {
  const { logOut } = useAuthContext();

  return <Pressable onPress={logOut}>
    <Text>Log out</Text>
  </Pressable>
}