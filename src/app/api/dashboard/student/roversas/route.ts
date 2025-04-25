import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentRoversas } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const studentID = parseInt(cookieStore.get("studentID")?.value!);
  const studentRoversas = await getStudentRoversas(studentID, username!);

  return NextResponse.json(
    { studentRoversas: studentRoversas },
    { status: 200 }
  );
}
