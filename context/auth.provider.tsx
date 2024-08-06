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

  const logIn: IAuthContext["logIn"] = async ({ user, token, phone }) => {
    const prevAuthData = await AsyncStorage.getItem("auth");
    let newToken: IToken = {}
    
    if (prevAuthData !== null) {
      const { token: tokenData } = JSON.parse(prevAuthData) as IAuthData;

      if (typeof tokenData?.account === "string") newToken = { account: tokenData.account, ...token };
      else newToken = token;
    } else {
      newToken = token;
    }
    
    const authData: IAuthData = { user, token: newToken };

    await Promise.all([
      AsyncStorage.setItem("auth", JSON.stringify(authData)),
      AsyncStorage.setItem("phone", phone),
    ]);

    setUser(user);
    setAuthToken(newToken);
    setIsAuthenticated(true);
  }

  const logOut: IAuthContext["logOut"] = async () => {
    const newToken: IToken = { account: authToken?.account };
    const authData: IAuthData = { user: null, token: newToken };
    await AsyncStorage.setItem("auth", JSON.stringify(authData));
    
    setIsAuthenticated(false);
    setAuthToken(newToken);
    setUser(null);
  }

  useEffect(() => {
    AsyncStorage.getItem("auth")
      .then((authData) => {
        if (authData !== null) {
          const { user, token } = JSON.parse(authData) as IAuthData;
          
          if (user === null) {
            setIsAuthenticated(false);
            setAuthToken(token);
            setUser(null);
          } else {
            setUser(user);
            setAuthToken(token);
            setIsAuthenticated(true);
          }
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