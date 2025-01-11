import { client } from "@/lib/lemonsqueeze";
import { db } from "./db";

export async function getUserSubscriptionPlan(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      subscriptionId: true,
      currentPeriodEnd: true,
      customerId: true,
      variantId: true,
    },
  });

  if (!user) throw new Error("User not found");
  if (!user?.subscriptionId) {
    return;
  }

  // Check if user is on a pro plan.
  const isPro =
    user.variantId &&
    user.currentPeriodEnd &&
    user.currentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const subscription = await client.retrieveSubscription({
    id: user?.subscriptionId as string,
  });

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;

  if (isPro && user.subscriptionId) {
    isCanceled = subscription.data.attributes.cancelled;
  }

  const d4VarientId =
    process.env.NEXT_PUBLIC_LS_4D_VARRIENT_ID;
  const d9VarientId = process.env.NEXT_PUBLIC_LS_9D_VARRIENT_ID;

  return {
    ...user,
    currentPeriodEnd: subscription.data.attributes.renews_at,
    isCanceled,
    isPro,
    plan: subscription.data.attributes.variant_name,
    status: subscription.data.attributes.status,
    updatePaymentMethodURL:
      subscription.data.attributes.urls.update_payment_method,
    name:
      subscription.data.attributes.variant_id === Number(d4VarientId)
        ? "Monthly"
        : subscription.data.attributes.variant_id === Number(d9VarientId)
        ? "Yearly"
        : "",
  };
}
