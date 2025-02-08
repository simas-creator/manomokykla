import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedPaths = ["/skydelis", "/prideti-mokykla", "/api/private"];

  const { pathname } = req.nextUrl;
  // If user is not authenticated and tries to access a protected route
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/prisijungti", req.url));
  }
  
  if(token && pathname === "/prisijungti") {
    return NextResponse.redirect(new URL("/skydelis", req.url));
  }
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers });
  
}
