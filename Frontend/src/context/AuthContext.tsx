import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/User'
import { getMe, logout as logoutRequest } from '../api/client'

type AuthContextValue = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
  }, [])

  async function logout() {
    await logoutRequest()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return value
}