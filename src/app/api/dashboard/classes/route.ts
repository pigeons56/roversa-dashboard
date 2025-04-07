import { NextResponse } from "next/server";
import { getClasses } from "../../../db/update";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const classes = await getClasses(username!);
  var json_str = JSON.stringify(classes);
  cookieStore.set("classes", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved classes." },
    { status: 200 }
  );
}
