import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRobotNameByID } from "@/app/db/update";

export async function GET() {
  const cookieStore = await cookies();
  // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
  const robotID = parseInt(cookieStore.get("robotID")?.value!);
  const className = cookieStore.get("currentClass")?.value;
  const username = cookieStore.get("username")?.value;
  const displayNameJSON = await getRobotNameByID(
    robotID,
    className!,
    username!
  );
  const displayName: number = displayNameJSON[0].displayName;
  return NextResponse.json({ robotName: displayName }, { status: 200 });
}
