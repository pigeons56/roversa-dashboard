import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentRoversas } from "@/app/db/students";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    const data = await request.json();
    const studentRoversas = await getStudentRoversas(data.studentID, username!);

    return NextResponse.json(
      { studentRoversas: studentRoversas },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve student's roversas." },
      { status: 401 }
    );
  }
}
