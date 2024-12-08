import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/auth";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const {pathname} = request.nextUrl

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    if(pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login"],
};
