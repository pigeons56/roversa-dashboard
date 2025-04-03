import styles from "../../page.module.css";
import SignupForm from "./signup-form";

export default function Signup() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>Get started today!</div>
      <div className={styles.login_box}>
        <h2>Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
}
