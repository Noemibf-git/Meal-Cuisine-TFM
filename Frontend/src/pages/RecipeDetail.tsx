import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  getRecipe,
  deleteRecipe,
  getComments,
  createComment,
  deleteComment,
} from "../api/client";
import type { Recipe } from "../types/recipe";
import { useAuth } from "../context/AuthContext";
import type { Comment } from "../types/comment";

export default function RecipeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getRecipe(Number(id))
      .then(setRecipe)
      .catch(() => setError("No se ha podido cargar la receta"));
    getComments(Number(id))
      .then(setComments)
      .catch(() => setComments([]));
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    const ok = window.confirm("¿Seguro que quieres borrar esta receta?");
    if (!ok) return;
    try {
      await deleteRecipe(Number(id));
      navigate("/");
    } catch {
      setError("No se ha podido borrar la receta");
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || content.trim() === "") return;
    setCommentError(null);
    try {
      const created = await createComment(Number(id), content.trim());
      setComments([...comments, created]);
      setContent("");
    } catch {
      setCommentError("No se ha podido publicar el comentario");
    }
  }
  async function handleDeleteComment(commentId: number) {
    if (!id) return;
    const ok = window.confirm("¿Borrar este comentario?");
    if (!ok) return;
    try {
      await deleteComment(Number(id), commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch {
      setCommentError("No se ha podido borrar el comentario");
    }
  }

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Cargando…</p>;

  const canDelete =
    user !== null && (user.id === recipe.user_id || user.role === "admin");

  return (
    <article>
      <p>
        <Link to="/">← Volver</Link>
      </p>
      <h1>{recipe.title}</h1>
      {recipe.description ? <p>{recipe.description}</p> : null}

      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <>
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.pivot.quantity} {ingredient.pivot.unit ?? ""}{" "}
                {ingredient.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {recipe.steps && recipe.steps.length > 0 ? (
        <>
          <h2>Pasos</h2>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>{step.description}</li>
            ))}
          </ol>
        </>
      ) : null}

      <h2>Comentarios</h2>
      {comments.length === 0 ? (
        <p>No hay comentarios todavía.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user?.username ?? "Usuario"}</strong>
              {": "}
              {comment.content}
              {user &&
              (user.id === comment.user_id || user.role === "admin") ? (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Borrar
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleCommentSubmit}>
          <label>
            Tu comentario
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
              required
            />
          </label>
          {commentError ? <p>{commentError}</p> : null}
          <button type="submit">Publicar</button>
        </form>
      ) : (
        <p>
          Debes <Link to="/login">entrar</Link> para comentar.
        </p>
      )}

      {canDelete ? (
        <button type="button" onClick={handleDelete}>
          Borrar receta
        </button>
      ) : null}
    </article>
  );
}
