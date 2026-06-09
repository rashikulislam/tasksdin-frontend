// components/task/TaskHeader.tsx
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TaskHeaderProps {
  onBack: () => void;
  isMobile: boolean;
}

export const TaskHeader = ({ onBack, isMobile }: TaskHeaderProps) => (
  <div className={`flex items-center mb-6 ${isMobile ? "mb-4" : ""}`}>
    {/* <Button variant="ghost" size="sm" onClick={onBack} className={`mr-4 ${isMobile ? 'touch-target' : ''}`}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button> */}
    <h1
      className={`font-bold ${isMobile ? "text-xl" : "text-2xl md:text-3xl"}`}
    >
      নতুন কাজ পোস্ট করুন
    </h1>
  </div>
);
