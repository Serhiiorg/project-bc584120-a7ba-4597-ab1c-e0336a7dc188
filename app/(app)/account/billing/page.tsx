import { ManageUserSubscriptionButton } from "./ManageSubscription";
import { storeSubscriptionPlans } from "@/config/subscriptions";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Billing() {
  await checkAuth();
  const { session } = await getUserAuth();
  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!session) return redirect("/");

  return (
    <div className="min-h-[calc(100vh-57px)] ">
      <Link href="/account">
        <button className="px-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible outline-none focus-visible hover:underline underline-offset-2 mb-2">
          Back
        </button>
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Billing</h1>
      <div className="p-6 mb-2 rounded-lg border bg-white shadow-sm ">
        <h3 className="uppercase text-xs font-bold text-neutral-500">
          Subscription Details
        </h3>
        <p className="text-lg font-semibold leading-none my-2">
          {subscriptionPlan.name}
        </p>
        <p className="text-sm text-neutral-500">
          {!subscriptionPlan.isSubscribed
            ? "You are not subscribed to any plan."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? subscriptionPlan.stripeCurrentPeriodEnd.toLocaleDateString()
            : null}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {storeSubscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg border bg-white text-neutral-900 shadow-sm  ${
              plan.name === subscriptionPlan.name
                ? "border-neutral-900"
                : "border-neutral-300"
            }`}
          >
            {plan.name === subscriptionPlan.name ? (
              <div className="w-full relative">
                <div className="text-center px-3 py-1 bg-neutral-900 text-neutral-100 text-xs  w-fit rounded-l-lg rounded-t-none absolute right-0 font-semibold">
                  Current Plan
                </div>
              </div>
            ) : null}
            <div id="header" className="mt-2 flex flex-col space-y-1.5 p-6 ">
              <div className="text-2xl font-semibold leading-none tracking-tight">
                {plan.name}
              </div>
              <div id="description" className="text-sm text-neutral-500">
                {plan.description}
              </div>
            </div>
            <div id="card-content" className="p-6 pt-0">
              <div className="mt-2 mb-8">
                <h3 className="font-bold">
                  <span className="text-3xl">${plan.price / 100}</span> / month
                </h3>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={`feature_${i + 1}`} className="flex gap-x-2 text-sm">
                    <CheckCircle2Icon className="text-green-400 h-5 w-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              id="card-footer"
              className="flex items-end justify-center p-6 pt-0 "
            >
              {session?.user.email ? (
                <ManageUserSubscriptionButton
                  userId={session.user.id}
                  email={session.user.email || ""}
                  stripePriceId={plan.stripePriceId}
                  stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                  isSubscribed={!!subscriptionPlan.isSubscribed}
                  isCurrentPlan={subscriptionPlan?.name === plan.name}
                />
              ) : (
                <div>
                  <Link href="/account">
                    <button className="text-center w-full hover:bg-neutral-100 px-3.5 py-2.5 font-medium text-sm rounded-md">
                      Add Email to Subscribe
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
