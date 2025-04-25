import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRobotOutput } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const robotID = parseInt(cookieStore.get("currentRobotID")?.value!);
  const robotOutput = await getRobotOutput(robotID);
  const json_str = JSON.stringify(robotOutput);
  cookieStore.set("robotOutput", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved robot output." },
    { status: 200 }
  );
}
