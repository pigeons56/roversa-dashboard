import { NextResponse } from "next/server";
import { getRoversas } from "../../../db/update";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const roversas = await getRoversas(username!);
  var json_str = JSON.stringify(roversas);
  cookieStore.set("roversas", json_str);
  return NextResponse.json(
    { error: "Successfully retrieved roversas." },
    { status: 200 }
  );
}
