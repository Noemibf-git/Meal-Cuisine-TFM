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

  return (
    <>
      <div className={styles.layout}>
        <header className={styles.header}>
          <Link to="/" className={styles.brand}>
            <img
              className={styles.logo}
              src="/imagenes/logo.png"
              alt="Meal Cuisine"
              width={48}
              height={48}
            />
            Meal Cuisine
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.link}>
              Inicio
            </Link>
            {user ? (
              <>
                <span className={styles.userName}>Hola, {user.username}</span>
                <Link to="/recetas/nueva" className={styles.link}>
                  Nueva receta
                </Link>
                <Link to="/mis-recetas" className={styles.link}>
                  Mis recetas
                </Link>
                <button
                  type="button"
                  className={styles.logout}
                  onClick={() => logout()}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.link}>
                  Entrar
                </Link>
                <Link to="/register" className={styles.link}>
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
