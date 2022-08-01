import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <span className={styles.loadingSpan}>
        <div className={styles.loading}></div>
        <h1>Carregando...</h1>
    </span>
  )
}
export default Loading