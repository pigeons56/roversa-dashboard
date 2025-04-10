import { NextResponse } from "next/server";
import { getRoversas, addRoversa } from "../../../db/update";
import { cookies } from "next/headers";
import { getDisplayName } from "next/dist/shared/lib/utils";

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

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value;
  const currentClass = cookieStore.get("currentClass")?.value;
  const data = await request.json();

  const success = await addRoversa(
    data.displayName,
    data.roversaID,
    currentClass!,
    username!
  );

  if (success == 1) {
    return NextResponse.json({ error: "Added Roversa." }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Could not add Roversa." },
      { status: 401 }
    );
  }
}
