import { NextResponse } from "next/server";
import { addRobotOutput } from "@/app/db/robots";

export async function POST(request: Request) {
  console.log("POST from esp32 received.");
  const data = await request.json();
  const robotID = parseInt(data.robotID, 16);
  const program = data.program;
  const button = data.button;
  const battery = parseFloat(data.battery);

  console.log("Sending request to Mariadb...");
  const success = await addRobotOutput(robotID, program, button, battery);

  if (success == 1) {
    console.log("Database successfully updated.");
    return NextResponse.json({ error: "Robot output added." }, { status: 200 });
  } else {
    console.log("Database update failed.");
    return NextResponse.json(
      { error: "Robot output not added." },
      { status: 400 }
    );
  }
}
