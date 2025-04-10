import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function RoversaPopup(props: any) {
  const cookies = useCookies();
  const router = useRouter();
  const [data, setData] = useState<string[]>([]);

  async function handleResponse(formInput: FormData) {
    const displayName = (
      formInput.get("displayName") as FormDataEntryValue
    ).toString();
    const roversaID = (
      formInput.get("roversaID") as FormDataEntryValue
    ).toString();

    const response = await fetch("/api/dashboard/roversas", {
      method: "POST",
      body: JSON.stringify({ displayName, roversaID }),
    });

    if (response.ok) {
      props.setLoading(true);
      router.back();
    } else {
      // Handle errors
      console.log(response.status);
    }
  }

  function getUnassignedRoversaList() {
    fetch("../../api/esp32", { method: "GET" }).then(() => {
      const unassignedRoversasJSON = JSON.parse(
        cookies.get("unassignedRoversas")!
      );
      const arr: string[] = [];

      for (let i = 0; i < unassignedRoversasJSON.length; i++) {
        arr.push(unassignedRoversasJSON[i].roversaID);
      }

      setData(arr);
    });
  }

  useEffect(() => {
    getUnassignedRoversaList();
  }, []);

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
            autoComplete="off"
            className={styles.popup_input_box}
          ></input>
        </div>
        <div>
          <select
            name="roversaID"
            required
            defaultValue=""
            className={styles.popup_input_box}
          >
            <option value="" disabled hidden>
              RoversaID
            </option>
            {data.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={getUnassignedRoversaList}
          className={styles.popup_refresh_button}
        >
          Refresh
        </button>
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
