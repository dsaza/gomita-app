import { useLoginContext } from "@/hooks/use-login-context";
import { FormPhone } from "./form-phone";
import { FormPin } from "./form-pin";

export function AuthForms () {
  const { step } = useLoginContext();

  if (step === 'phone') {
    return <FormPhone />;
  }

  if (step === 'pin') {
    return <FormPin />;
  }

  return null;
}