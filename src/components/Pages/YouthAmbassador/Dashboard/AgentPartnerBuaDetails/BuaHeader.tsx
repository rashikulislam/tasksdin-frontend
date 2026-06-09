"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function BuaHeader() {
  const { buaId } = useParams();
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-xl font-bold">বুয়া বিস্তারিত</h2>
              <p className="text-sm text-muted-foreground">বুয়া #{buaId}</p>
            </div>
          </div>
  );
}
