import { NextResponse } from "next/server";
import { login } from "../../../db/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const data = await request.json();
  const username = data.username;
  const password = data.password;
  const success = await login(username, password);
  if (success == 1) {
    cookieStore.set("username", username);
    return NextResponse.json({ error: "Login successful." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "The username or password is incorrect." },
      { status: 401 }
    );
  }
}
