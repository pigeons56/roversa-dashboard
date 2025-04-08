import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function RoversaPopup(props: any) {
  const router = useRouter();
  async function handleResponse(formInput: FormData) {
    // TODO
  }
  return (
    <div className={styles.popup_box}>
      <div>Add Roversa</div>
      <form action={handleResponse}>
        <div>
          <input
            name="displayName"
            type="text"
            placeholder="Display Name"
            maxLength={16}
            required
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <select name="className" required className={styles.popup_input_box}>
            <option value="" disabled selected>
              RoversaID
            </option>
            <option value="temp">temp</option>
          </select>
        </div>
        <div>
          <button type="submit" className={styles.popup_create_button}>
            Add
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
