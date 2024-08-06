import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { COLORS } from "@/constants/colors";
import { useLoginContext } from "@/hooks/use-login-context";
import { useClientContext } from "@/hooks/use-client-context";
import { IPreLoginData } from "@/context/login";

const getDiffTime = (expiration: number | null | undefined) => {
  if (expiration === null || expiration === undefined) return 0;

  const now = new Date();
  const diff = new Date(expiration)

  return diff.getTime() - now.getTime();
}

const printDiffTime = (diff: number) => {
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

interface OtpExpirationProps {
  updateError?: (message: string | undefined) => void;
}

export function OtpExpiration({ updateError }: OtpExpirationProps) {
  const { phone, pin, preLoginData, changeLoading, updatePreLoginData } = useLoginContext();
  const { callAPI } = useClientContext();
  const [expirationTime, setExpirationTime] = useState(getDiffTime(preLoginData?.otpExpiration));

  const handleSendCode = () => {
    updateError?.(undefined);
    changeLoading(true);

    callAPI('/user/pre-login', {
      method: 'POST',
      body: JSON.stringify({ phone, pin })
    })
      .then((result) => {
        if (result.isSuccess !== 200) {
          updateError?.(result.data?.message ?? 'No se pudo enviar el código');
          return;
        }

        const preLoginData = result.data?.data as IPreLoginData;
        updatePreLoginData(preLoginData);
      })
      .finally(() => {
        changeLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setExpirationTime(getDiffTime(preLoginData?.otpExpiration));
    }, 1000);

    return () => clearInterval(interval);
  }, [preLoginData])

  if (preLoginData?.otpExpiration === undefined) {
    return (
      <Text
        style={{
          fontSize: 14,
          color: COLORS.white,
          textAlign: 'center',
        }}
      >
        -
      </Text>
    );
  }

  if (expirationTime > 0) {
    return (
      <Text
        style={{
          fontSize: 14,
          color: COLORS.white,
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}
      >
        El código vence en {printDiffTime(expirationTime)}
      </Text>
    );
  }

  return (
    <Pressable
      style={{
        backgroundColor: COLORS.primary,
      }}
      onPress={handleSendCode}
    >
      <Text
        style={{
          fontSize: 14,
          color: COLORS.white,
          textAlign: 'center',
          textDecorationLine: 'underline',
        }}
      >
        Volver a enviar el código
      </Text>
    </Pressable>
  )
}