import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRobotClasses } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const robotID = parseInt(cookieStore.get("robotID")?.value!);
  const robotClasses = await getRobotClasses(robotID, username!);

  return NextResponse.json({ robotClasses: robotClasses }, { status: 200 });
}
