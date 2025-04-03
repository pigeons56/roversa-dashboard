import { NextResponse } from "next/server";
import { login } from "../../../db/login";

export async function POST(request: Request) {
  try {
    request.json().then((data) => {
      console.log("WE ARE IN");
      const username = data.username;
      const password = data.password;

      console.log(username, password);
      //login(username, password);
    });
    return NextResponse.json({ error: "Login successful." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 }
    );
  }
}
