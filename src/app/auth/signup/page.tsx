import styles from "../../page.module.css";
import SignupForm from "./signup-form";

export default function Signup() {
  return (
    <div className={styles.page}>
      <h1>Get started today</h1>
      <h3>Get the most out of using Roversa Robots in your classroom.</h3>
      <div className={styles.login_box}>
        <h2>Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
}
