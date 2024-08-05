import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLoader } from "@/components/loader";
import { ScreenLayout } from "@/components/auth/screen-layout";
import { AuthContext, IAuthContext } from "./auth";

export function AuthProvider ({ children }: React.PropsWithChildren) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string>();

  const logIn: IAuthContext["logIn"] = async (token) => {
    await AsyncStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setAuthToken(token);
  }

  const logOut: IAuthContext["logOut"] = async () => {
    await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setAuthToken(undefined);
  }

  useEffect(() => {
    setIsLoadingData(false);
  }, [])
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        logIn,
        logOut,
      }}
    >
      {!isLoadingData && children}
      {isLoadingData && (
        <ScreenLayout background="primary">
          <GlobalLoader />
        </ScreenLayout>
      )}
    </AuthContext.Provider>
  );
}