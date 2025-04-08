import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function ClassPopup(props: any) {
  const router = useRouter();
  async function handleResponse(formInput: FormData) {
    const className = (
      formInput.get("className") as FormDataEntryValue
    ).toString();

    const response = await fetch("/api/dashboard/classes", {
      method: "POST",
      body: JSON.stringify({ className }),
    });

    if (response.ok) {
      props.setLoading(true);
      router.back();
    } else {
      // Handle errors
      console.log(response.status);
    }
  }
  return (
    <div className={styles.popup_box}>
      <div>Create New Class</div>
      <form action={handleResponse}>
        <div>
          <input
            name="className"
            type="text"
            placeholder=""
            maxLength={16}
            required
            autoComplete="off"
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <button type="submit" className={styles.popup_create_button}>
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              router.push(window.location.pathname, { scroll: false });
            }}
            className={styles.popup_close_button}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
