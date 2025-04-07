import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ClassPopup() {
  const router = useRouter();
  async function handleResponse(formInput: FormData) {
    router.back;
  }
  return (
    <div className={styles.popup_box}>
      <div>Create New Class</div>
      <form action={handleResponse}>
        <div>
          <input
            name="Class Name"
            type="className"
            placeholder=""
            required
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <button type="submit" className={styles.popup_create_button}>
            Create
          </button>
          <button
            type="button"
            onClick={router.back}
            className={styles.popup_close_button}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
