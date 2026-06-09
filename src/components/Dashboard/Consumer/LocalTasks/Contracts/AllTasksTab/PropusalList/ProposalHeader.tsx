// components/proposals/ProposalHeader.tsx
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProposalHeaderProps {
  count: number;
  onBack: () => void;
}

export function ProposalHeader({ count, onBack }: ProposalHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6 pt-5">
      {/* Back button */}
      {/* <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button> */}

      <div>
        <h2 className="text-xl lg:2xl text-gray-500 font-bold">প্রস্তাবসমূহ</h2>
        <p className="text-muted-foreground">{count} জন প্রদানকারী আগ্রহী</p>
      </div>
    </div>
  );
}
