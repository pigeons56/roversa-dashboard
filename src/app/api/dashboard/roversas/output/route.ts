import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRoversaOutput } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const roversaID = parseInt(cookieStore.get("currentRoversaID")?.value!);
  const roversaOutput = await getRoversaOutput(roversaID);
  const json_str = JSON.stringify(roversaOutput);
  cookieStore.set("roversaOutput", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved roversa output." },
    { status: 200 }
  );
}
