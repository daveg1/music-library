import { ReactNode, createContext, useContext, useState } from "react";
import { AuthToken } from "../models/auth.model";
import { getAuthToken } from "../utils/spotify_auth";

interface AuthState {
  token: AuthToken | null;
  signIn: () => void;
}

export const AuthContext = createContext<AuthState>(null!);

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [token, setToken] = useState<AuthToken | null>(null);

  const signIn = async () => {
    if (!token) {
      setToken(await getAuthToken());
    }
  };

  const value: AuthState = { token, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
