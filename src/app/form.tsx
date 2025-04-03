"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  async function handleResponse(formInput: FormData) {
    const username = (
      formInput.get("username") as FormDataEntryValue
    ).toString();
    const password = (
      formInput.get("password") as FormDataEntryValue
    ).toString();
    console.log(username, password);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("dashboard/welcome");
    } else {
      // Handle errors
      console.log(response.status);
    }
  }

  return (
    <form action={handleResponse}>
      <div className={styles.padding_bottom}>
        <input
          name="username"
          type="username"
          placeholder="Username"
          required
          className={styles.form_input_box}
        />
      </div>
      <div className={styles.padding_bottom}>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className={styles.form_input_box}
        />
      </div>
      <div>
        <button type="submit" className={styles.submit_button}>
          Sign in
        </button>
      </div>
    </form>
  );
}
