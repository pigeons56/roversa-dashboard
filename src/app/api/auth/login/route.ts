import { NextResponse } from "next/server";
import { login } from "../../../db/login";
import { error } from "console";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("WE ARE IN");
  const username = data.username;
  const password = data.password;
  console.log(username, password);
  const success = await login(username, password);
  console.log(success);
  if (success == 1) {
    return NextResponse.json({ error: "Login successful." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "The username or password is incorrect." },
      { status: 401 }
    );
  }
}
