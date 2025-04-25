import pageStyles from "./page.module.css";
import dashboardStyles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className={dashboardStyles.popup_box}>
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
            className={dashboardStyles.popup_input}
          ></input>
        </div>
        <div>
          <button type="submit" className={dashboardStyles.popup_button_green}>
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              router.push(window.location.pathname, { scroll: false });
            }}
            className={dashboardStyles.popup_button_red}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
