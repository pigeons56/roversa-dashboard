import styles from "./page.module.css";
import LoginForm from "./login-form";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        Welcome to the Roversa Teacher Dashboard!
      </div>
      <div className={styles.login_box}>
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
