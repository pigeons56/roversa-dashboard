import styles from "./page.module.css";
import Form from "./form";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Welcome to the Roversa Teacher Dashboard!</h1>
      <div className={styles.login_box}>
        <h2>Login</h2>
        <Form/>
      </div>
    </div>
  );
}
