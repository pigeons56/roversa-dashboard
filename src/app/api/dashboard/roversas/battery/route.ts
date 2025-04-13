import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBattery } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  const currentClass = cookieStore.get("currentClass")?.value;
  const battery = await getBattery(currentClass!);
  const json_str = JSON.stringify(battery);
  cookieStore.set("battery", json_str);
  console.log("GOT BATTERY");
  return NextResponse.json(
    { error: "Successfully retrieved battery info." },
    { status: 200 }
  );
}
