import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RobotPopup(props: any) {
  const cookies = useCookies();
  const router = useRouter();
  const [data, setData] = useState<string[]>([]);

  async function handleResponse(formInput: FormData) {
    const displayName = (
      formInput.get("displayName") as FormDataEntryValue
    ).toString();
    const robotID = (formInput.get("robotID") as FormDataEntryValue).toString();

    const response = await fetch("/api/dashboard/robots", {
      method: "POST",
      body: JSON.stringify({ displayName, robotID }),
    });

    if (response.ok) {
      props.setLoading(true);
      router.back();
    } else {
      // Handle errors
      console.log(response.status);
    }
  }

  function getUnassignedRobotList() {
    fetch("/api/esp32", { method: "GET" }).then(() => {
      const unassignedRobotsJSON = JSON.parse(cookies.get("unassignedRobots")!);
      const arr: string[] = [];

      for (let i = 0; i < unassignedRobotsJSON.length; i++) {
        arr.push(unassignedRobotsJSON[i].robotID);
      }

      setData(arr);
    });
  }

  useEffect(() => {
    getUnassignedRobotList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={dashboardStyles.popup_box_lipurple}>
      <div>Connect Robot</div>
      <form action={handleResponse}>
        <div>
          <input
            name="displayName"
            type="text"
            placeholder="Display Name"
            maxLength={16}
            required
            autoComplete="off"
            className={dashboardStyles.popup_input}
          ></input>
        </div>
        <div>
          <select
            name="robotID"
            required
            defaultValue=""
            className={dashboardStyles.popup_input}
          >
            <option value="" disabled hidden>
              RobotID
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
          onClick={getUnassignedRobotList}
          className={dashboardStyles.popup_button_purple}
        >
          Refresh
        </button>
        <div>
          <button type="submit" className={dashboardStyles.popup_button_green}>
            Add
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
