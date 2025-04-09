import { NextResponse } from "next/server";
import { addRoversaOutput } from "@/app/db/update";

export async function POST(request: Request) {
  const data = await request.json();
  const roversaID = parseInt(data.roversaID);
  const program = data.program;
  const battery = parseFloat(data.battery);

  const success = await addRoversaOutput(roversaID, program, battery);

  if (success == 1) {
    return NextResponse.json(
      { error: "Roversa output added." },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Roversa output not added." },
      { status: 400 }
    );
  }
}
