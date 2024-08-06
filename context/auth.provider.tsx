import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalLoader } from "@/components/loader";
import { ScreenLayout } from "@/components/auth/screen-layout";
import { AuthContext, IAuthContext, IAuthData, IToken, IUser } from "./auth";

export function AuthProvider ({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<IToken | null>(null);

  const logIn: IAuthContext["logIn"] = async (user, token) => {
    const authData: IAuthData = { user, token };
    await AsyncStorage.setItem("auth", JSON.stringify(authData));

    setUser(user);
    setAuthToken(token);
    setIsAuthenticated(true);
  }

  const logOut: IAuthContext["logOut"] = async () => {
    await AsyncStorage.removeItem("auth");

    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
  }

  useEffect(() => {
    AsyncStorage.getItem("auth")
      .then((authData) => {
        if (authData) {
          const { user, token } = JSON.parse(authData) as IAuthData;
          setUser(user);
          setAuthToken(token);
          setIsAuthenticated(true);
        }
      })
      .finally(() => setIsLoadingData(false));
  }, [])
  
  return (
    <AuthContext.Provider
      value={{
        user,
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