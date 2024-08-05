import { useContext } from "react";
import { ClientContext } from "@/context/client";

export function useClientContext() {
  const clientContext = useContext(ClientContext);

  if (clientContext === null) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }

  return clientContext;
}