import { useEffect, useState } from "react";
import { GlobalLoader } from "@/components/loader";
import { AuthContext } from "./auth";
import { ScreenLayout } from "@/components/auth/screen-layout";

export function AuthProvider ({ children }: React.PropsWithChildren) {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoadingData(false);
  }, [])
  
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {!isLoadingData && children}
      {isLoadingData && (
        <ScreenLayout background="primary">
          <GlobalLoader />
        </ScreenLayout>
      )}
    </AuthContext.Provider>
  );
}