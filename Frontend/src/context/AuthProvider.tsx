import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";
import { getMe, logout as logoutRequest } from "../api/client";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Al recargar la pagina, si hay token se pide GET /me para recuperar el usuario.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}