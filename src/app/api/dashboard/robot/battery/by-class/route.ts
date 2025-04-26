import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBatteryByClass } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const className = cookieStore.get("currentClass")?.value;
  const batteryJSON = await getBatteryByClass(className!);
  return NextResponse.json({ battery: batteryJSON }, { status: 200 });
}
