import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.wrap} role="status">
      <div className={styles.spinner} />
      <span className={styles.srOnly}>Cargando</span>
    </div>
  );
}