// components/contract/ContractHeader.tsx
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContractHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border p-4 flex items-center gap-3">
      {/* <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft className="h-5 w-5" />
      </Button> */}
      <h1 className="text-xl font-bold">Contract Details</h1>
    </div>
  );
}
