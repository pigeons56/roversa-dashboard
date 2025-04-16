import styles from "./page.module.css";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StudentsPopup(props: any) {
  const router = useRouter();

  async function handleResponse(formInput: FormData) {
    const firstName = (
      formInput.get("firstName") as FormDataEntryValue
    ).toString();
    const lastName = (
      formInput.get("lastName") as FormDataEntryValue
    ).toString();
    const studentID = (
      formInput.get("studentID") as FormDataEntryValue
    ).toString();
    const response = await fetch("/api/dashboard/students/add", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, studentID }),
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
      <div>Add Student</div>
      <form action={handleResponse}>
        <div>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            maxLength={32}
            required
            autoComplete="off"
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            maxLength={32}
            required
            autoComplete="off"
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <input
            name="studentID"
            type="number"
            placeholder="Student ID"
            required
            autoComplete="off"
            className={styles.popup_input_box}
          ></input>
        </div>

        <div>
          <button type="submit" className={styles.popup_create_button}>
            Add
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
