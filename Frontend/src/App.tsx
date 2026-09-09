import { Routes, Route, Link } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Inicio</Link>
          {' | '}
          <Link to="/login">Entrar</Link>
          {' | '}
          <Link to="/register">Registro</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  )
}

export default App