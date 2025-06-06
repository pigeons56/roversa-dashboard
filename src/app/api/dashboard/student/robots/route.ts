import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentRobots } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const studentID = parseInt(cookieStore.get("studentID")?.value!);
  const studentRobots = await getStudentRobots(studentID, username!);

  return NextResponse.json({ studentRobots: studentRobots }, { status: 200 });
}
