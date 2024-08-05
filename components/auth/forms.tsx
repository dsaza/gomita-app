import { useLoginContext } from "@/hooks/use-login-context";
import { FormPhone } from "./form-phone";

export function AuthForms () {
  const { step } = useLoginContext();

  if (step === 'phone') {
    return <FormPhone />;
  }

  return null;
}