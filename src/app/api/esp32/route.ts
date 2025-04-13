import { NextResponse } from "next/server";
import { addRoversaOutput, getUnassignedRoversaIDs } from "@/app/db/update";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const currentClass = cookieStore.get("currentClass")?.value;
  const unassignedRoversas = await getUnassignedRoversaIDs(
    username!,
    currentClass!
  );
  const json_str = JSON.stringify(unassignedRoversas);
  cookieStore.set("unassignedRoversas", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved Roversa IDs unassigned to this class." },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  console.log("POST from esp32 received.");
  const data = await request.json();
  const roversaID = parseInt(data.roversaID, 16);
  const program = data.program;
  const button = data.button;
  const battery = parseFloat(data.battery);

  console.log("Sending request to Mariadb...");
  const success = await addRoversaOutput(roversaID, program, button, battery);

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
