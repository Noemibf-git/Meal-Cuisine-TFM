import { useState } from "react";
import { Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import { useAuth } from "./context/AuthContext";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import styles from "./App.module.css";

function App() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }
  return (
    <>
      <div className={styles.layout}>
        <header className={styles.header}>
          <Link to="/" className={styles.brand} onClick={closeMenu}>
            <img
              className={styles.logo}
              src="/imagenes/logo.png"
              alt="Meal Cuisine"
              width={48}
              height={48}
            />
            Meal Cuisine
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? "Cerrar" : "Menú"}
          </button>
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              ×
            </button>
            <Link to="/" className={styles.link} onClick={closeMenu}>
              Inicio
            </Link>
            {user ? (
              <>
                <span className={styles.userName}>Hola, {user.username}</span>
                <Link
                  to="/recetas/nueva"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Nueva receta
                </Link>
                <Link
                  to="/mis-recetas"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Mis recetas
                </Link>
                <button
                  type="button"
                  className={styles.logout}
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link} onClick={closeMenu}>
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className={styles.link}
                  onClick={closeMenu}
                >
                  Registro
                </Link>
              </>
            )}
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recetas/:id" element={<RecipeDetail />} />
            <Route path="/recetas/nueva" element={<CreateRecipe />} />
            <Route path="/recetas/:id" element={<RecipeDetail />} />
            <Route path="/mis-recetas" element={<MyRecipes />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <ul className={styles.footerNav}>
            <li>
              <Link to="/" className={styles.link}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/mis-recetas" className={styles.link}>
                Recetas
              </Link>
            </li>
          </ul>
          <p className={styles.copy}>
            © 2026 Meal Cuisine. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
