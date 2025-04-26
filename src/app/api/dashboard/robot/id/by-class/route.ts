import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRobotIDsByClass } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const className = cookieStore.get("currentClass")?.value;
  const robotData = await getRobotIDsByClass(className!, username!);
  const json_str = JSON.stringify(robotData);

  return NextResponse.json({ robotIDs: json_str }, { status: 200 });
}
