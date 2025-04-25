// import dashboardStyles from "@/app/dashboard/dashboard.module.css";
// import { useRouter } from "next/navigation";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function StudentsPopup(props: any) {
//   const router = useRouter();

//   async function handleResponse(formInput: FormData) {
//     const firstName = (
//       formInput.get("firstName") as FormDataEntryValue
//     ).toString();
//     const lastName = (
//       formInput.get("lastName") as FormDataEntryValue
//     ).toString();
//     const studentID = (
//       formInput.get("studentID") as FormDataEntryValue
//     ).toString();
//     const response = await fetch("/api/dashboard/student/data", {
//       method: "POST",
//       body: JSON.stringify({ firstName, lastName, studentID }),
//     });
//     if (response.ok) {
//       props.addStudentToTable({
//         ID: parseInt(studentID),
//         firstName: firstName,
//         lastName: lastName,
//       });
//       router.back();
//     } else {
//       // Handle errors
//       console.log(response.status);
//     }
//   }

//   return (
//     <div className={dashboardStyles.popup_box_white}>
//       <div>Add Student</div>
//       <form action={handleResponse}>
//         <div>
//           <input
//             name="firstName"
//             type="text"
//             placeholder="First Name"
//             maxLength={32}
//             required
//             autoComplete="off"
//             className={dashboardStyles.popup_input}
//           ></input>
//         </div>
//         <div>
//           <input
//             name="lastName"
//             type="text"
//             placeholder="Last Name"
//             maxLength={32}
//             required
//             autoComplete="off"
//             className={dashboardStyles.popup_input}
//           ></input>
//         </div>
//         <div>
//           <input
//             name="studentID"
//             type="number"
//             placeholder="Student ID"
//             required
//             autoComplete="off"
//             className={dashboardStyles.popup_input}
//           ></input>
//         </div>

//         <div>
//           <button type="submit" className={dashboardStyles.popup_button_green}>
//             Add
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               router.push(window.location.pathname, { scroll: false });
//             }}
//             className={dashboardStyles.popup_button_red}
//           >
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
