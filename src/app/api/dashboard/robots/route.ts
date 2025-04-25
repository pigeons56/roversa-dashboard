import { NextResponse } from "next/server";
import { getRobots, addRobot } from "../../../db/update";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const currentClass = cookieStore.get("currentClass")?.value;
  const robots = await getRobots(currentClass!, username!);
  const json_str = JSON.stringify(robots);
  cookieStore.set("robots", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved robots." },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const currentClass = cookieStore.get("currentClass")?.value;
  const data = await request.json();

  const success = await addRobot(
    data.displayName,
    data.robotID,
    currentClass!,
    username!
  );

  if (success == 1) {
    return NextResponse.json({ error: "Added Robot." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Could not add Robot." },
      { status: 401 }
    );
  }
}
