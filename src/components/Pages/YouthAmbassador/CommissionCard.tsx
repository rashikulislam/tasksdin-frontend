import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target } from "lucide-react";

interface CommissionCardProps {
  type: "user" | "provider";
}

export const CommissionCard = ({ type }: CommissionCardProps) => {
  const isUser = type === "user";

  return (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardHeader className="text-center">
        <div
          className={`mx-auto rounded-full flex items-center justify-center mb-4 w-16 h-16 ${
            isUser ? "bg-gradient-primary" : "bg-gradient-accent"
          }`}
        >
          {isUser ? (
            <Users className="text-white h-8 w-8" />
          ) : (
            <Target className="text-white h-8 w-8" />
          )}
        </div>
        <CardTitle className="text-2xl">
          Refer {isUser ? "Users" : "Providers"}
        </CardTitle>
        <Badge
          variant="secondary"
          className={isUser ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}
        >
          {isUser ? "2%" : "5%"} Commission
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center">
          {isUser
            ? "Earn a 2% lifetime commission from every user you refer when they complete tasks successfully."
            : "Refer service providers and earn 5% commission for every completed service they deliver."}
        </p>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          {isUser ? (
            <>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Lifetime commission</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Earn for every successful task</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Automatic payouts</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Earn from every completed service</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>High commission rate</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Instant notifications</span>
              </div>
            </>
          )}
        </div>

        <div
          className={`${
            isUser ? "bg-gradient-primary/5 border-primary/20" : "bg-gradient-accent/5 border-accent/20"
          } border rounded-lg p-4`}
        >
          <div className="text-center">
            <div className={`font-bold text-2xl ${isUser ? "text-primary" : "text-accent"}`}>
              ৳{isUser ? "500" : "1,250"}
            </div>
            <div className="text-muted-foreground text-sm">Example earning</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};