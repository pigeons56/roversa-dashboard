import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentData } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const studentData = await getStudentData(username!);
  const json_str = JSON.stringify(studentData);

  return NextResponse.json({ studentData: json_str }, { status: 200 });
}
