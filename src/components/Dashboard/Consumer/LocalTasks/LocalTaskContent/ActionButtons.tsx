// components/local-tasks/ActionButtons.tsx
"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Phone, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  isMobile: boolean;
  router: ReturnType<typeof useRouter>;
}

const ActionButtons = ({ isMobile, router }: ActionButtonsProps) => {
  return (
    <div
      className={`flex gap-3 justify-center ${
        isMobile ? "flex-col max-w-xs mx-auto" : "flex-row max-w-md mx-auto"
      }`}
    >
      <Button size="lg" className="h-10 lg:h-12">
        <MapPin className="w-5 h-5 mr-2" />
        সেবা প্রদানকারী খুঁজুন
      </Button>

      <Button variant="outline" size="lg" className="h-10 lg:h-12">
        <Phone className="w-5 h-5 mr-2" />
        জরুরি সহায়তা
      </Button>

      {/* <Button
        variant="outline"
        size="lg"
        className="h-10 lg:h-12"
        onClick={() => router.push("/freelancer")}
      >
        <Users className="w-5 h-5 mr-2" />
        ফ্রিল্যান্সার নিয়োগ করুন
      </Button> */}
    </div>
  );
};

export default ActionButtons;
