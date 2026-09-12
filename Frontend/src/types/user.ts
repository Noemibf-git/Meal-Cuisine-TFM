export type User = {
  id: number
  username: string
  email: string
  role: string
}
export type AuthResponse = {
  token: string
  user: User
}
