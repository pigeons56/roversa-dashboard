import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getStudents,
  getStudentClasses,
  getStudentRoversas,
} from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const students = await getStudents(username!);
  const json_str = JSON.stringify(students);
  cookieStore.set("students", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved students." },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    const data = await request.json();

    const studentClasses = await getStudentClasses(data.studentID, username!);
    const studentRoversas = await getStudentRoversas(data.studentID, username!);

    cookieStore.set("studentClasses", studentClasses);
    cookieStore.set("studentRoversas", studentRoversas);

    return NextResponse.json(
      { error: "Student classes & roversas retrieved." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve student's classes & roversas." },
      { status: 401 }
    );
  }
}
