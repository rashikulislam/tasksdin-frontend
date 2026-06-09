import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Gift } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      color: "text-primary",
      title: "Grow Your Network",
      desc: "Connect with other ambassadors and expand your reach.",
    },
    {
      icon: DollarSign,
      color: "text-accent",
      title: "Earn Passive Income",
      desc: "Keep earning from your referrals every month.",
    },
    {
      icon: Gift,
      color: "text-warning",
      title: "Exclusive Bonuses",
      desc: "Unlock exclusive rewards and recognition badges.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {benefits.map((item, i) => (
        <Card key={i} className="text-center p-6">
          <item.icon className={`mx-auto mb-4 h-12 w-12 ${item.color}`} />
          <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
          <p className="text-muted-foreground text-sm">{item.desc}</p>
        </Card>
      ))}
    </div>
  );
};