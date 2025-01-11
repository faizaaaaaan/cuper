import { axios } from "@/lib/axios";
import { db } from "@/server/db";
import { getUserSubscriptionPlan } from "@/server/sub";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        subscriptionId: true,
        variantId: true,
        currentPeriodEnd: true,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (!user.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    const subscriptionPlan = await getUserSubscriptionPlan(user.email);
    if (!subscriptionPlan || !subscriptionPlan.isPro)
      return NextResponse.json(
        { message: "You are not subscribed" },
        { status: 402 }
      );

    await axios.patch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${user.subscriptionId}`,
      {
        data: {
          type: "subscriptions",
          id: user.subscriptionId,
          attributes: {
            cancelled: false,
          },
        },
      },
      {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    return NextResponse.json({
      message: `Your subscription has been resumed.`,
    });
  } catch (err) {
    console.log({ err });
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
