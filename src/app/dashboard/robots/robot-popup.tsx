import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RobotPopup(props: any) {
  const router = useRouter();
  const [data, setData] = useState<number[]>([]);

  async function handleResponse(formInput: FormData) {
    const robotID = (formInput.get("robotID") as FormDataEntryValue).toString();

    const response = await fetch("/api/dashboard/robot/id/all", {
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

  async function fetchNotConnectedRobotIDs() {
    const data = await fetch("/api/dashboard/robot/id/not-connected", {
      method: "GET",
    });
    const dataJSON = await data.json();
    const robotIDs = JSON.parse(dataJSON.robotIDs);
    const arr: number[] = [];

    for (let i = 0; i < robotIDs.length; i++) {
      arr.push(robotIDs[i].robotID);
    }

    setData(arr);
  }

  useEffect(() => {
    fetchNotConnectedRobotIDs();
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
          onClick={fetchNotConnectedRobotIDs}
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
