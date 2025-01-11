import { verifyUserFromApi } from "@/server/user";
import { NextRequest, NextResponse } from "next/server";

// Add this header configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400", // 24 hours cache
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  const apiToken = request.headers.get("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header

  if (!apiToken) {
    return new NextResponse("API Token is necessary", { status: 403 });
  }

  try {
    const user = await verifyUserFromApi(apiToken); // Await the async function

    if (!user) {
      return new NextResponse("Invalid API Token", { status: 401 }); // Return 401 if user is not found
    }

    return NextResponse.json(user, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, headers: corsHeaders }
    );
  }
}
