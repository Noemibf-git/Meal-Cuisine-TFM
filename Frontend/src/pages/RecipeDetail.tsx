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
import styles from "./RecipeDetail.module.css";

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

  if (error) return <p className={styles.error}>{error}</p>;
  if (!recipe) return <p>Cargando…</p>;

  const canDelete =
    user !== null && (user.id === recipe.user_id || user.role === "admin");

  return (
    <article className={styles.article}>
      <p className={styles.back}>
        <Link to="/" className={styles.backLink}>
          ← Volver
        </Link>
      </p>
      <h1 className={styles.title}>{recipe.title}</h1>
      {recipe.imagen ? (
        <img className={styles.photo} src={recipe.imagen} alt={recipe.title} />
      ) : null}

      {recipe.description ? (
        <p className={styles.lead}>{recipe.description}</p>
      ) : null}

      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <>
          <h2 className={styles.heading}>Ingredientes</h2>
          <ul className={styles.list}>
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
          <h2 className={styles.heading}>Pasos</h2>
          <ol className={styles.list}>
            {recipe.steps.map((step) => (
              <li key={step.id}>{step.description}</li>
            ))}
          </ol>
        </>
      ) : null}

      <h2 className={styles.heading}>Comentarios</h2>
      {comments.length === 0 ? (
        <p className={styles.empty}>No hay comentarios todavía.</p>
      ) : (
        <ul className={styles.comments}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user?.username ?? "Usuario"}</strong>
              {": "}
              {comment.content}
              {user &&
              (user.id === comment.user_id || user.role === "admin") ? (
                <button
                  type="button"
                  className={styles.commentDelete}
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
        <form className={styles.form} onSubmit={handleCommentSubmit}>
          <label className={styles.label}>
            Tu comentario
            <textarea
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
              required
            />
          </label>
          {commentError ? <p>{commentError}</p> : null}
          <button className={styles.submit} type="submit">
            Publicar
          </button>
        </form>
      ) : (
        <p className={styles.loginHint}>
          Debes <Link to="/login">entrar</Link> para comentar.
        </p>
      )}

      {canDelete ? (
        <button type="button" onClick={handleDelete} className={styles.danger}>
          Borrar receta
        </button>
      ) : null}
    </article>
  );
}
