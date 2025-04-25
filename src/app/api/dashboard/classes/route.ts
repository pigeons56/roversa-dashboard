import { NextResponse } from "next/server";
import { getClasses, addClass } from "../../../db/update";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const classes = await getClasses(username!);
  const json_str = JSON.stringify(classes);
  return NextResponse.json({ classes: json_str }, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const data = await request.json();
  const className = data.className;
  const success = await addClass(className, username!);

  if (success == 1) {
    return NextResponse.json({ error: "Class added." }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Class not added." }, { status: 400 });
  }
}
