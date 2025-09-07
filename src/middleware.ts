import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseUrl } from "./networking/baseUrl";
//import { token } from "./utils/token";
import type { UserType } from "./types/UserType";
import type { BusinessProfileResponse } from "./types/ViewBusinessProfileResult";

const base_server_url = process.env.NEXT_PUBLIC_BASE_URL || baseUrl;

async function validateUser(token: string): Promise<UserType | null> {
  try {
    const response = await fetch(`${base_server_url}/auth/view-user`, {
      method: "GET",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("User validation failed", result);
      return null; // Return null instead of error result
    }

    console.log("User validation successful");
    return result;
  } catch (error) {
    console.log("User validation error:", error);
    return null;
  }
}

async function validateBusiness(
  token: string
): Promise<BusinessProfileResponse | null> {
  try {
    const response = await fetch(`${base_server_url}/business/view-profile`, {
      method: "GET",
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Business validation failed", result);
      return null; // Return null instead of error result
    }

    console.log("Business validation successful");
    return result;
  } catch (error) {
    console.log("Business validation error:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/sign-in" ||
    path === "/chat" ||
    path.includes("/_next") ||
    path.includes("/api/");

  // Check if user is authenticated by looking for the auth token in cookies
  const token = request.cookies.get("authToken")?.value || "";

  // If the user is not authenticated and trying to access a protected route, redirect to sign-in
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If the user is authenticated and trying to access login page, redirect to homepage
  if (token && path === "/sign-in") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Special handling for protected routes that require user validation
  if (path === "/" || path.startsWith("/business")) {
    if (!token) {
      console.log("No token found, redirecting to sign-in");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Validate the user first
    const userValidation = await validateUser(token);
    if (!userValidation?.email) {
      console.log("User validation failed, redirecting to sign-in");
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("authToken");
      return response;
    }

    // For business routes, validate business profile
    if (path.startsWith("/business")) {
      const businessValidation = await validateBusiness(token);

      if (
        !businessValidation?.business?.name ||
        !businessValidation?.business?.description
      ) {
        console.log("Business profile incomplete, redirecting to setup");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Business validation passed, allow access to business routes
      console.log("Business validation successful, allowing access");
      return NextResponse.next();
    }

    // For homepage, check if business profile is complete
    if (path === "/") {
      const businessValidation = await validateBusiness(token);

      // If business profile is complete, redirect to business dashboard
      if (
        businessValidation?.business?.name &&
        businessValidation?.business?.description
      ) {
        console.log(
          "Business profile complete, redirecting to business dashboard"
        );
        return NextResponse.redirect(new URL("/business", request.url));
      }

      // Business profile incomplete, allow access to homepage for setup
      console.log(
        "Business profile incomplete, allowing homepage access for setup"
      );
      return NextResponse.next();
    }

    // User validation passed for other protected routes
    console.log("User validation successful, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
