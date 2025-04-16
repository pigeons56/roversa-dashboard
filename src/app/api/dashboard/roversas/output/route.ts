import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRoversaOutput } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const roversaName = cookieStore.get("currentRoversa")?.value;
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const roversas = JSON.parse(cookieStore.get("roversas")?.value!);
  let roversaID = 0;

  for (let i = 0; i < roversas.length; i++) {
    if (roversas[i].displayName == roversaName) {
      roversaID = roversas[i].roversaID;
    }
  }

  const roversaOutput = await getRoversaOutput(roversaID);
  const json_str = JSON.stringify(roversaOutput);
  cookieStore.set("roversaOutput", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved roversa output." },
    { status: 200 }
  );
}
