import { NextResponse } from "next/server";
import { signup } from "../../../db/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  const success = await signup(username, password);
  if (success == 1) {
    cookieStore.set("username", username);
    return NextResponse.json({ error: "Signup successful." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "The username is already in use." },
      { status: 401 }
    );
  }
}
