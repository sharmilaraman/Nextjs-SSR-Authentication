import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    "https://api2-tejasvita-elearning.underdev.in/api/dashboard/admin-dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}