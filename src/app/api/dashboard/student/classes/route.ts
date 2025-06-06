import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentClasses } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const studentID = parseInt(cookieStore.get("studentID")?.value!);
  const studentClasses = await getStudentClasses(studentID, username!);

  return NextResponse.json({ studentClasses: studentClasses }, { status: 200 });
}
