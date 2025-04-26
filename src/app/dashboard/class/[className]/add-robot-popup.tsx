import dashboardStyles from "@/app/dashboard/dashboard.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddRobotPopup(props: any) {
  const router = useRouter();
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);

  async function handleResponse(formInput: FormData) {
    const displayName = (
      formInput.get("displayName") as FormDataEntryValue
    ).toString();
    const robotID = (formInput.get("robotID") as FormDataEntryValue).toString();

    const response = await fetch("/api/dashboard/robot/id/by-class", {
      method: "POST",
      body: JSON.stringify({ displayName, robotID }),
    });

    if (response.ok) {
      await props.addCard(parseInt(robotID), displayName);
      router.back();
    } else {
      // Handle errors
      console.log(response.status);
    }
  }

  async function fetchRobotIDsNotInClass() {
    const data = await fetch("/api/dashboard/robot/id/not-in-class", {
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
    if (isLoading) {
      fetchRobotIDsNotInClass().then(() => setLoading(false));
    }
  }, [isLoading]);

  if (isLoading) {
    return;
  }
  return (
    <div className={dashboardStyles.popup_box_lipurple}>
      <div>Add Robot</div>
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
        <span className={dashboardStyles.inline_text}>
          Don&#39;t see any RobotIDs?{" "}
        </span>
        <Link href="/dashboard/robots" className={dashboardStyles.inline_text}>
          Connect a robot first.
        </Link>
      </form>
    </div>
  );
}
