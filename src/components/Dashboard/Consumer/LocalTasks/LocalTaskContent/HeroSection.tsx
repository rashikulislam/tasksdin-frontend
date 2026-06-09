// components/local-tasks/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import QuickStats from "./QuickStats";
import ActionButtons from "./ActionButtons";

const HeroSection = ({ openPostTask }: { openPostTask: () => void }) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <section
      className={`${
        isMobile ? "py-6" : "py-12"
      } bg-gradient-to-br from-background via-secondary/10 to-primary/5 rounded-2xl`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${
              isMobile ? "text-2xl" : "text-3xl md:text-4xl"
            }`}
          >
            লোকাল টাস্ক সার্ভিস
          </h1>

          <p
            className={`text-muted-foreground mb-6 max-w-2xl mx-auto ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            আপনার দৈনন্দিন কাজের জন্য বিশ্বস্ত সেবাদাতা খুঁজুন অথবা নিজের
            প্রয়োজন অনুযায়ী নতুন কাজ পোস্ট করুন
          </p>

          {/* Post Task Button */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className={isMobile ? "h-10 text-base" : ""}
                onClick={() => openPostTask()}
              >
                <Plus className="w-5 h-5 mr-2" />
                টাস্ক পোস্ট করুন
              </Button>
            </div>

            <p
              className={`text-muted-foreground mt-2 ${
                isMobile ? "text-sm" : ""
              }`}
            >
              পোস্টিং ফি: ৳৫০০ (লাইভ করার আগে পরিশোধ করতে হবে)
            </p>
          </div>

          <QuickStats />
          <ActionButtons isMobile={isMobile} router={router} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
