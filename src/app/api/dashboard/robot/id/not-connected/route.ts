import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getNotConnectedRobotIDs } from "@/app/db/robots";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const robotData = await getNotConnectedRobotIDs(username!);
  const json_str = JSON.stringify(robotData);

  return NextResponse.json({ robotIDs: json_str }, { status: 200 });
}
