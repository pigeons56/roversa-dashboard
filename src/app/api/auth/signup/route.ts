import { NextResponse } from "next/server";
import { signup } from "../../../db/auth";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("WE ARE IN");
  const username = data.username;
  const password = data.password;
  console.log(username, password);
  const success = await signup(username, password);
  console.log(success);
  if (success == 1) {
    return NextResponse.json({ error: "Signup successful." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "The username is already in use." },
      { status: 401 }
    );
  }
}
