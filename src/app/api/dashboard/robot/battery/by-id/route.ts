import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBatteryByID } from "@/app/db/robots";

export async function GET() {
  const cookieStore = await cookies();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const robotID = parseInt(cookieStore.get("robotID")?.value!);
  const batteryJSON = await getBatteryByID(robotID);
  const battery: number = batteryJSON[0].battery;
  return NextResponse.json({ battery: battery }, { status: 200 });
}
