import DiditKycVerification from "@/components/Dashboard/Common/DiditKycVerification";
import KycSubmitForm from "@/components/Dashboard/Common/KycSubmitForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, FileText } from "lucide-react";

const AgentKycPage = () => {
  return (
    <div className="py-6 max-w-2xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Identity Verification (KYC)</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Verify your identity to unlock all platform features. Choose your preferred method below.
        </p>
      </div>

      <Tabs defaultValue="didit">
        <TabsList className="w-full">
          <TabsTrigger value="didit" className="flex-1 gap-1.5">
            <Zap className="h-4 w-4" />
            Automated (Recommended)
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex-1 gap-1.5">
            <FileText className="h-4 w-4" />
            Manual Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="didit" className="mt-4">
          <DiditKycVerification dashboardPath="/dashboard/agent" />
        </TabsContent>

        <TabsContent value="manual" className="mt-4">
          <KycSubmitForm dashboardPath="/dashboard/agent" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentKycPage;
