import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBatteryByID } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const robotID = parseInt(cookieStore.get("robotID")?.value!);
  const batteryJSON = await getBatteryByID(robotID);
  const battery: number = batteryJSON[0].battery;
  return NextResponse.json({ battery: battery }, { status: 200 });
}
