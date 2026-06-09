"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  BuaHireRequest,
  mockRequests,
} from "@/components/Dashboard/Consumer/HomeMaid/Data/MockData";
import { StatusCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/MaidRequest/StatusCard";
import { ServiceDetailsCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/MaidRequest/ServiceDetailsCard";
import { ContactInfoCard } from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidDetailsPages/MaidRequest/ContactInfoCard";

export default function BuaHireRequestDetailsPage() {
  const [requests, setRequests] = useState<BuaHireRequest[]>(mockRequests);
  const { requestId } = useParams<{ requestId: string }>();
  const router = useRouter();

  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            আবেদন খুঁজে পাওয়া যায়নি
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            ফিরে যান
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background border-b top-0 z-50">
        <div className="flex items-center gap-3 p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">আবেদনের বিস্তারিত</h1>
        </div>
      </header>
      <div className={`space-y-6 mt-5`}>
        <StatusCard request={request} />
        <ServiceDetailsCard request={request} />
        <ContactInfoCard request={request} />
      </div>
    </div>
  );
}
