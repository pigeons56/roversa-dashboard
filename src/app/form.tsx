"use client"

import { login } from "./db/login";
import styles from "./page.module.css";

export default function Form() {
    async function handleResponse(response: FormData) {
    
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
            <button type="submit" className={styles.button_purple}>
              Sign in
            </button>
            </div>
        </form>
    );
}
