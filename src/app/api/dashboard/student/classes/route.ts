import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentClasses } from "@/app/db/students";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    const data = await request.json();
    const studentClasses = await getStudentClasses(data.studentID, username!);

    return NextResponse.json(
      { studentClasses: studentClasses },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve student's classes." },
      { status: 401 }
    );
  }
}
