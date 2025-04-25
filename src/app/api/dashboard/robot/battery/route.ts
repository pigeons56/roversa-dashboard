import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBattery } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const robotID = parseInt(cookieStore.get("robotID")?.value!);
  const batteryJSON = await getBattery(robotID);
  const battery: number = batteryJSON[0].battery;
  const batteryDecimal = (battery - 3.4) / 0.25;
  let batteryPercent = batteryDecimal * 100;
  if (batteryPercent > 100) batteryPercent = 100;
  if (batteryPercent < 0) batteryPercent = 0;
  console.log(batteryPercent);
  return NextResponse.json(
    { battery: batteryPercent.toString() },
    { status: 200 }
  );
}
