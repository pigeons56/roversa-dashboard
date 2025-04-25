import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentIDs } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const students = await getStudentIDs(username!);
  const json_str = JSON.stringify(students);

  return NextResponse.json({ students: json_str }, { status: 200 });
}
