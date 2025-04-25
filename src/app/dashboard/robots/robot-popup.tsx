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
    const robotID = (formInput.get("robotID") as FormDataEntryValue).toString();

    const response = await fetch("/api/dashboard/robot/id", {
      method: "POST",
      body: JSON.stringify({ robotID }),
    });

    if (response.ok) {
      props.addRobotToTable(robotID);
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
    <div className={dashboardStyles.popup_box_white}>
      <div>Connect Robot</div>
      <form action={handleResponse}>
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
            Connect
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
