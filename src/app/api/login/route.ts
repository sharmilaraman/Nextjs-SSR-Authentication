import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
     const { phone,password,path,name } = await request.json();

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone,password,path,name }),
     }
  );

  const data = await apiRes.json();

  if (apiRes.ok && data.status) {
     // Set token from backend response (adjust as needed)
     const token = data.data.token || "some-token";
     const res = NextResponse.json({ success: true });
     res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 });
     res.cookies.set("name", name, { httpOnly: true, path: "/", maxAge: 60 * 60 });
     return res;
   } else {
     return NextResponse.json({ success: false, message: data.message || "Login failed" }, { status: 401 });
   }
}
