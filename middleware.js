import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value; // get() have --> name, value
  
  if (!token)
    return NextResponse.json({ message: "Access denied. Please login first." }, { status: 401 });

  try {
    const decodedToken = jwt.decode(token);
    
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-uid", decodedToken.uid);
    requestHeaders.set("x-user-email", decodedToken.email);
    
    return NextResponse.next({
      request: { headers: requestHeaders },
    }); // allow request
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }

}

export const config = {
  matcher: ["/api/test/:path*"], // matches /api/test and any subroutes
};