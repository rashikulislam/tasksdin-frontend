import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share2, Code } from "lucide-react";

export const HowItWorksTabs = () => {
  const [referralCode, setReferralCode] = useState("");

  return (
    <div className="mb-12">
      <h2 className="font-bold text-center mb-8 text-3xl">How It Works</h2>
      <Tabs defaultValue="link" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="link" className="gap-2">
            <Share2 className="h-4 w-4" />
            Referral Link
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2">
            <Code className="h-4 w-4" />
            Referral Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="link" className="mt-6">
          <Card>
            <CardContent className="p-6 grid md:grid-cols-3 gap-6 text-center">
              {[
                { title: "Get your link", desc: "Access your unique referral link from your dashboard." },
                { title: "Share everywhere", desc: "Share your link on social media or directly." },
                { title: "Earn commission", desc: "Earn commissions for every signup or task." },
              ].map((step, i) => (
                <div key={i}>
                  <div className="bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 w-12 h-12">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <Card>
            <CardContent className="p-6 max-w-md mx-auto space-y-4 text-center">
              <h3 className="font-semibold text-lg">Share Your Code</h3>
              <p className="text-muted-foreground mb-4">
                Share your referral code with friends to help them join easily.
              </p>

              <div className="flex gap-2">
                <Input
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="flex-1"
                />
                <Button>Verify</Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Code className="mx-auto mb-2 text-muted-foreground h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  Enter a valid referral code to connect your account.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};