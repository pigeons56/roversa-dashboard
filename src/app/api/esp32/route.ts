import { NextResponse } from "next/server";
import { addRoversaOutput } from "@/app/db/update";

export async function POST(request: Request) {
  console.log("POST from esp32 received.");
  const data = await request.json();
  const roversaID = parseInt(data.roversaID);
  const program = data.program;
  const battery = parseFloat(data.battery);

  console.log("Sending request to Mariadb...");
  const success = await addRoversaOutput(roversaID, program, battery);

  if (success == 1) {
    console.log("Database successfully updated.");
    return NextResponse.json(
      { error: "Roversa output added." },
      { status: 200 }
    );
  } else {
    console.log("Database update failed.");
    return NextResponse.json(
      { error: "Roversa output not added." },
      { status: 400 }
    );
  }
}
