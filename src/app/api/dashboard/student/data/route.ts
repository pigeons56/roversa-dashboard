import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStudentData, addStudentData } from "@/app/db/students";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const studentData = await getStudentData(username!);
  const json_str = JSON.stringify(studentData);

  return NextResponse.json({ studentData: json_str }, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const data = await request.json();

  const success = await addStudentData(
    data.firstName,
    data.lastName,
    data.studentID,
    username!
  );

  if (success == 1) {
    return NextResponse.json({ error: "Added Student." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Could not add Student." },
      { status: 401 }
    );
  }
}
