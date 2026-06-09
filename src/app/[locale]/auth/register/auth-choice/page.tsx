"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RoleType = "provider" | "task-giver" | "agent";

const roles: {
  id: RoleType;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconBg: string;
  bulletColor: string;
  features: string[];
  registerText: string;
  registerLink: string;
}[] = [
  {
    id: "provider",
    title: "সার্ভিস প্রোভাইডার হিসেবে",
    description: "কাজ করে আয় করুন এবং আপনার দক্ষতা কাজে লাগান",
    icon: Users,
    iconBg: "bg-gradient-accent",
    bulletColor: "bg-accent",
    features: [
      "নিজের কাছাকাছি কাজ খুঁজুন",
      "নিজেই আপনার রেট ঠিক করুন",
      "নিরাপদ পেমেন্ট সিস্টেম",
    ],
    registerText: "প্রোভাইডার হিসেবে রেজিস্টার করুন",
    registerLink: "/auth/register/general",
  },
  {
    id: "task-giver",
    title: "কাজ দাতা হিসেবে",
    description: "আপনার কাজ পোস্ট করুন এবং বিশ্বস্ত লোক নিয়োগ দিন",
    icon: MapPin,
    iconBg: "bg-gradient-primary",
    bulletColor: "bg-primary",
    features: [
      "যেকোনো কাজ পোস্ট করুন",
      "একাধিক প্রস্তাব থেকে বাছাই করুন",
      "ভেরিফায়েড ও রেটেড প্রোভাইডার",
    ],
    registerText: "কাজ দাতা হিসেবে রেজিস্টার করুন",
    registerLink: "/auth/register/consumer",
  },
];

const RoleSelectionCards = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5 flex items-center justify-center py-10 md:py-0">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          আপনি কোন ভূমিকায় যোগ দিতে চান?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <Card
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="cursor-pointer border-2 transition-all duration-300 hover:border-primary hover:shadow-glow group"
              >
                <CardContent className="p-8">
                  <div className="text-center flex flex-col justify-between h-96">
                    <div>
                      <div
                        className={`w-20 h-20 ${role.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary">
                        {role.title}
                      </h3>

                      <p className="text-muted-foreground mb-6">
                        {role.description}
                      </p>

                      <ul className="space-y-2 mb-6 text-left">
                        {role.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${role.bulletColor}`}
                            />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={role.registerLink}>
                      <Button className="w-full h-12">
                        {role.registerText}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCards;
