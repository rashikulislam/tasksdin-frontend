"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HouseDetailsHeaderProps {
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  houseTitle: string;
}

const HouseDetailsHeader = ({
  onBack,
  isFavorite,
  onToggleFavorite,
  houseTitle,
}: HouseDetailsHeaderProps) => {
  const handleShare = async () => {
    // Client-side safety check
    if (typeof window === "undefined") return;

    const shareData = {
      title: houseTitle,
      text: `এই প্রপার্টিটি দেখুন: ${houseTitle}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "লিংক কপি হয়েছে!",
          description: "প্রপার্টির লিংক ক্লিপবোর্ডে কপি হয়েছে।",
        });
      }
    } catch {
      toast({
        title: "শেয়ার করা যায়নি",
        description: "অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-mobile flex items-center justify-between py-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onToggleFavorite}>
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseDetailsHeader;
