import { Button } from "@/components/ui/button";
import { Star, Users, Share2 } from "lucide-react";

interface HeroSectionProps {
  isMobile: boolean;
}

export const HeroSection = ({ isMobile }: HeroSectionProps) => {
  return (
    <div className={`text-center mb-12 ${isMobile ? "mb-8" : ""}`}>
      <div
        className={`inline-flex items-center gap-2 bg-gradient-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 ${
          isMobile ? "mb-4" : ""
        }`}
      >
        <Star className="h-4 w-4 text-primary" />
        <span className="font-medium text-primary text-sm">Limited Time Offer</span>
      </div>

      <h1
        className={`font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 ${
          isMobile ? "text-3xl" : "text-4xl md:text-6xl"
        }`}
      >
        Youth Ambassador Program
      </h1>
      <p
        className={`text-muted-foreground mb-8 ${
          isMobile ? "text-base" : "text-xl max-w-3xl mx-auto"
        }`}
      >
        Join our Youth Ambassador Program to earn rewards, grow your network, and empower your
        community through referrals.
      </p>

      <div className={`gap-4 justify-center ${isMobile ? "flex flex-col" : "flex flex-col sm:flex-row"}`}>
        <Button
          size="lg"
          className={`bg-gradient-primary text-white shadow-glow ${isMobile ? "h-14 text-base font-semibold" : ""}`}
        >
          <Users className="h-5 w-5 mr-2" />
          Join the Program
        </Button>
        <Button variant="outline" size="lg" className={isMobile ? "h-14 text-base font-semibold" : ""}>
          <Share2 className="h-5 w-5 mr-2" />
          Learn More
        </Button>
      </div>
    </div>
  );
};