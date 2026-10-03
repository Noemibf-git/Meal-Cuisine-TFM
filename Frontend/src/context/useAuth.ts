import { createContext, useContext } from "react";
import type { User } from "../types/User";

export type AuthContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return value;
}