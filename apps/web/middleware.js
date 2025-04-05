import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // For a real application, you would check the session cookie here
  // Since we can't access Firebase Auth directly in middleware,
  // we would typically use a session cookie or JWT

  // For this example, we'll just redirect unauthenticated users to the login page
  // In a real app, you would verify the session/token here

  const authPaths = ["/login", "/signup", "/forgot-password"]
  const path = request.nextUrl.pathname

  // Check if the path is a protected route
  if (path.startsWith("/doctor") || path.startsWith("/patient")) {
    // In a real app, you would verify the session here
    // For now, we'll just let it pass through
    // If not authenticated, you would redirect to login
    // Example of how you would redirect if not authenticated:
    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/doctor/:path*", "/patient/:path*"],
}

