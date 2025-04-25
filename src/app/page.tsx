import pageStyles from "./page.module.css";
import LoginForm from "./login-form";

export default function Home() {
  return (
    <div className={pageStyles.page}>
      <h1>Welcome to the Roversa Teacher Dashboard</h1>
      <h3>Monitoring student progress on Roversa Robots made easy.</h3>
      <div className={pageStyles.login_box}>
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
