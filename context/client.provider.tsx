import { useCallback } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import { ClientContext, IClientContext } from "./client";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function ClientProvider({ children }: React.PropsWithChildren) {
  const { authToken, logOut } = useAuthContext();
  const apiURL = API_URL ?? "";

  if (apiURL === "") {
    throw new Error("API_URL is not defined in .env");
  }

  const callAPI: IClientContext["callAPI"] = useCallback(async (endpoint, init) => {
    try {
      const url = new URL(endpoint, apiURL);

      if (init?.delay !== undefined) {
        await new Promise((resolve) => setTimeout(resolve, init.delay));
      }

      const response = await fetch(url.href, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: init?.withAuthorization === true && authToken !== undefined ? `Bearer ${authToken}` : "",
        },
      });

      if (response.status === 401) {
        await logOut();

        return {
          isSuccess: response.status,
        };
      }

      const data = await response.json();

      return {
        isSuccess: response.status,
        data,
      };
    } catch (error) {
      return {
        isSuccess: 500,
      };
    }
  }, []);

  return (
    <ClientContext.Provider
      value={{
        apiURL: API_URL ?? "",
        callAPI,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}