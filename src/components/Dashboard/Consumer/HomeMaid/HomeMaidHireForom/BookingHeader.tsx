"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingHeader() {
  const router = useRouter();

  return (
    <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/bua-hire")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-lg">বুয়া হায়ার ফর্ম</h1>
      </div>
    </div>
  );
}
