import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  // নিখুঁতভাবে চেক করা: রুটটি হুবহু এক হতে হবে অথবা সাব-পাথ (যেমন /courses/123) হতে হবে
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => {
      return nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`);
    }) || nextUrl.pathname === ROOT;

  // লগইন না থাকলে এবং পাবলিক রুট না হলে সরাসরি /login এ পাঠিয়ে দিবে
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next|favicon.ico|.*\\..*).*)",
    "/",
  ],
};
