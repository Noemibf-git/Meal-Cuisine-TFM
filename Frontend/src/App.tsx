import { Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import { useAuth } from "./context/AuthContext";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <header>
        <nav>
          <Link to="/">Inicio</Link>
          {" | "}
          {user ? (
            <>
              <span>Hola, {user.username}</span>
              {" | "}
              <Link to="/recetas/nueva">Nueva receta</Link>
              {" | "}
              <Link to="/mis-recetas">Mis recetas</Link>
              {" | "}
              <button type="button" onClick={() => logout()}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              {" | "}
              <Link to="/register">Registro</Link>
            </>
          )}
        </nav>
      </header>
      <main>
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
    </>
  );
}

export default App;
