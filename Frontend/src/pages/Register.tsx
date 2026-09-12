import { useState } from 'react'
import { useNavigate } from 'react-router'
import { register } from '../api/client'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await register(username, email, password, passwordConfirmation)
      navigate('/login')
    } catch {
      setError('No se ha podido crear la cuenta. Revisa los datos.')
    }
  }

  return (
    <section>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        <label>
          Repite la contraseña
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
            minLength={8}
          />
        </label>
        {error ? <p>{error}</p> : null}
        <button type="submit">Crear cuenta</button>
      </form>
    </section>
  )
}