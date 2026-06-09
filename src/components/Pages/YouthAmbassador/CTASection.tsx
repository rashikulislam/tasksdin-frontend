import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <Card className="bg-gradient-primary text-white text-center p-8">
      <h2 className="font-bold mb-4 text-3xl">Ready to Start?</h2>
      <p className="opacity-90 mb-6 text-lg">
        Join thousands of ambassadors earning with Tasks Din.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
        <Button variant="secondary" size="lg" className="flex-1 h-14 text-base font-semibold">
          <Zap className="h-5 w-5 mr-2" />
          Start Now
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};