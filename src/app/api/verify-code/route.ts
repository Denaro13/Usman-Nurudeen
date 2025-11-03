import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();
  if (code === process.env.ADMIN_ACCESS_CODE) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("portfolio_admin_access", "true", {
      httpOnly: true,
      maxAge: 3600,
    });
    return res;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
