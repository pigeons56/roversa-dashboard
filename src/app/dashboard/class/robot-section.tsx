// "use client";

// import pageStyles from "./page.module.css";
// import dashboardStyles from "@/app/dashboard/dashboard.module.css";
// import { useState, useEffect } from "react";
// import { useCookies } from "next-client-cookies";
// import Link from "next/link";
// import RobotPopup from "./robot-popup";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// export default function RobotSection() {
//   const cookies = useCookies();
//   const currentClass = cookies.get("currentClass");
//   const [data, setData] = useState<string[]>([]);
//   const [batteryData, setBatteryData] = useState<string[]>([]);
//   const [robotCardColor, setrobotCardColor] = useState<string[]>([]);
//   const [isLoading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const addRobot = searchParams.get("addRobot");
//   const router = useRouter();

//   function updateBatteryLevel() {
//     fetch("/api/dashboard/robots/battery", { method: "GET" }).then(() => {
//       const robotsJSON = JSON.parse(cookies.get("robots")!);
//       const batteryJSON = JSON.parse(cookies.get("battery")!);
//       const battery_arr: string[] = [];
//       const color_arr: string[] = [];

//       for (let i = 0; i < robotsJSON.length; i++) {
//         battery_arr.push("Data Not Found");
//         color_arr.push("gray");
//         for (let j = 0; j < batteryJSON.length; j++) {
//           if (batteryJSON[j].robotID == robotsJSON[i].robotID) {
//             // Set battery percent
//             const batteryDecimal =
//               (parseFloat(batteryJSON[j].battery) - 3.4) / 0.25;
//             let batteryPercent = batteryDecimal * 100;
//             if (batteryPercent > 100) batteryPercent = 100;
//             if (batteryPercent < 0) batteryPercent = 0;

//             // Set color according to battery
//             if (batteryPercent > 70) color_arr[i] = "green";
//             else if (batteryPercent > 40) color_arr[i] = "yellow";
//             else color_arr[i] = "red";

//             battery_arr[i] = batteryPercent.toFixed(0) + "%";
//             break;
//           }
//         }
//       }

//       setBatteryData(battery_arr);
//       setrobotCardColor(color_arr);
//     });
//   }

//   function updateRobots() {
//     fetch("/api/dashboard/robots", { method: "GET" }).then(() => {
//       const robotsJSON = JSON.parse(cookies.get("robots")!);
//       const arr: string[] = [];

//       for (let i = 0; i < robotsJSON.length; i++) {
//         arr.push(robotsJSON[i].displayName);
//       }

//       setData(arr);
//       setLoading(false);
//     });
//   }

//   function handleClick(d: string, i: number) {
//     const robotsJSON = JSON.parse(cookies.get("robots")!);
//     cookies.set("currentRobotID", robotsJSON[i].robotID);
//     cookies.set("currentRobot", d);
//     router.push("/dashboard/class/robot");
//   }

//   useEffect(() => {
//     updateRobots();
//     updateBatteryLevel();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading, currentClass]);

//   useEffect(() => {
//     setTimeout(() => {
//       updateBatteryLevel();
//     }, 5000);
//   });

//   useEffect(() => {
//     updateBatteryLevel();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isLoading]);

//   if (isLoading) {
//     return (
//       <div className={dashboardStyles.section}>
//         <div className={dashboardStyles.section_header}>Robots</div>
//         <h5>Loading...</h5>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className={dashboardStyles.section}>
//         <div className={dashboardStyles.section_header}>
//           Robots
//           <Link
//             href="?addRobot=true"
//             className={dashboardStyles.button_create}
//             scroll={false}
//           >
//             Connect Robot
//           </Link>
//         </div>
//         {addRobot && <RobotPopup setLoading={setLoading} />}
//         <h5>No Robots yet!</h5>
//       </div>
//     );
//   }

//   return (
//     <div className={dashboardStyles.section}>
//       <div className={dashboardStyles.section_header}>
//         Robots
//         <Link
//           href="?addRobot=true"
//           scroll={false}
//           className={dashboardStyles.button_create}
//         >
//           Connect Robot
//         </Link>
//       </div>
//       <div>
//         {addRobot && <RobotPopup setLoading={setLoading} />}
//         {data.map((d, i) => (
//           <span
//             key={i}
//             className={pageStyles.robot_card}
//             style={{ backgroundColor: `var(--${robotCardColor[i]})` }}
//           >
//             {d}
//             <div> Battery: {batteryData[i]} </div>
//             <button
//               onClick={() => handleClick(d, i)}
//               className={pageStyles.robot_card_button}
//             >
//               View Output Log
//             </button>
//             <button onClick={() => {}} className={pageStyles.robot_card_button}>
//               Mark as Done
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
