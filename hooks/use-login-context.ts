import { LoginContext } from "@/context/login";
import { useContext } from "react";

export function useLoginContext () {
  const loginContext = useContext(LoginContext);
  
  if (!loginContext) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return loginContext;
}