import { DeductCredits } from "@/action/credits";
import { verifyUserFromApi } from "@/server/user";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  params: { params: { id: string } }
) {
  const userid = params.params.id;
  const apiToken = request.headers.get("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header

  if (!apiToken) {
    return new NextResponse("API Token is necessary", { status: 403 });
  }

  const verifyApi = await verifyUserFromApi(apiToken);
  if (!verifyApi) return new NextResponse("Wrong API Key", { status: 401 });

  try {
    const result = await DeductCredits({ apiToken, userId: userid }); // Call the DeductCredits function

    if (result?.error) {
      return new NextResponse(JSON.stringify(result), { status: 200 });
    }

    return new NextResponse("Deducted Successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
