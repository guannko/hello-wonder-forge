import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, Check } from "lucide-react";
import { format } from "date-fns";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["5 analyses per month", "Basic AI visibility report", "Email support"],
  },
  {
    name: "Pro",
    price: "$49",
    features: [
      "50 analyses per month",
      "Advanced AI visibility report",
      "Competitor tracking",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited analyses",
      "Custom AI visibility reports",
      "Dedicated account manager",
      "24/7 support",
      "API access",
      "Custom integrations",
    ],
  },
];

export default function Billing() {
  const { user } = useAuth();

  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Plan
              <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                {subscription.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-semibold text-lg capitalize">{subscription.plan}</p>
                <p className="text-sm text-muted-foreground">
                  {subscription.next_billing_date
                    ? `Next billing: ${format(new Date(subscription.next_billing_date), "PPP")}`
                    : "No upcoming billing"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={subscription?.plan === plan.name.toLowerCase() ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">{plan.price}</div>
                {plan.price !== "Custom" && <p className="text-sm text-muted-foreground">per month</p>}
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={subscription?.plan === plan.name.toLowerCase() ? "outline" : "default"}
                  disabled={subscription?.plan === plan.name.toLowerCase()}
                >
                  {subscription?.plan === plan.name.toLowerCase()
                    ? "Current Plan"
                    : plan.name === "Enterprise"
                    ? "Contact Sales"
                    : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
