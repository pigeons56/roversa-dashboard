import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRobotIDs, addRobotID } from "@/app/db/robots";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const robotData = await getRobotIDs(username!);
  const json_str = JSON.stringify(robotData);

  return NextResponse.json({ robotIDs: json_str }, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const data = await request.json();
  const success = await addRobotID(data.robotID, username!);

  if (success == 1) {
    return NextResponse.json({ error: "Added Robot." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Could not add Robot." },
      { status: 401 }
    );
  }
}
