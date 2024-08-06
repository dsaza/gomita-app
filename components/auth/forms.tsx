import { useLoginContext } from "@/hooks/use-login-context";
import { FormPhone } from "./form-phone";
import { FormPin } from "./form-pin";
import { FormOtp } from "./form-otp";

export function AuthForms () {
  const { step } = useLoginContext();

  if (step === 'phone') {
    return <FormPhone />;
  }

  if (step === 'pin') {
    return <FormPin />;
  }

  if (step === 'otp') {
    return <FormOtp />;
  }

  return null;
}