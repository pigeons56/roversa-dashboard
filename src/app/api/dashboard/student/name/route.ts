import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentName } from "@/app/db/students";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get("username")?.value;
    const data = await request.json();
    const studentName = await getStudentName(data.studentID, username!);

    return NextResponse.json({ studentName: studentName }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Could not retrieve student's name." },
      { status: 401 }
    );
  }
}
