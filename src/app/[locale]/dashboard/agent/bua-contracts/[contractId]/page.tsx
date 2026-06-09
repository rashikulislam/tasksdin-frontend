"use client";
import { useParams } from "next/navigation";
import BuaInfoCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractDetails/BuaInfoCard";
import ServiceSummaryCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractDetails/ServiceSummaryCard";
import PaymentHistoryCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractDetails/PaymentHistoryCard";
import AbsentAndReplacementCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractDetails/AbsentAndReplacementCard";
import ComplaintsCard from "@/components/Pages/YouthAmbassador/Dashboard/BuaContractDetails/ComplaintsCard";
import { useGetSingleHiredHomeMaidDetailsQuery } from "@/redux/features/home.maid.feature";
import { IMaidOrder } from "@/interfaces/maid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MapPin, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContractsSkeleton from "@/components/Skeletons/ContractsSkeleton";
import TaskFeedSkeleton from "@/components/Skeletons/TaskFeedSkeleton";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import { useState } from "react";
import CustomMonthPicker from "@/components/Reusable/CustomMonthPicker";

export default function ContractDetailsPage() {
  const { contractId } = useParams();
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [currentMonth, setMonth] = useState(defaultMonth);

  const IdMonthFormat = `${contractId}.${currentMonth}`;
  const { isError, isLoading, data } = useGetSingleHiredHomeMaidDetailsQuery(
    IdMonthFormat as string,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const contract = data?.data as IMaidOrder;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5">
        <TaskFeedSkeleton />
        <ContractsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ManageStatusState
        type="error"
        message="তথ্য লোড করতে সমস্যা হয়েছে"
        description="দুঃখিত! সার্ভারে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
      />
    );
  }

  if (!contract) {
    return (
      <ManageStatusState
        type="notFound"
        message="কোনো চুক্তি পাওয়া যায়নি"
        description="এখনো আপনার এরিয়ায় কোনো গৃহকর্মী নিয়োগ সম্পন্ন হয়নি। নতুন রিকুয়েস্ট আসলে এখানে দেখানো হবে।"
      />
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h2 className="text-xl font-bold">চুক্তি বিস্তারিত</h2>
        <p className="text-sm text-muted-foreground">চুক্তি #{contractId}</p>
      </div>
      <CustomMonthPicker locale="en" setMonth={setMonth} value={currentMonth} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                ইউজার তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={contract?.consumer?.profile_img as string}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {contract?.consumer?.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {contract?.consumer?.full_name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-4 h-4" />{" "}
                    {contract?.consumerPhoneNumber}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> ঠিকানা
                </p>
                <p className="text-sm">{contract?.address}</p>
              </div>

              {/* User Requirements */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> আবেদনের সময় চাহিদা
                </p>
              </div>
            </CardContent>
          </Card>
          <BuaInfoCard maid={contract?.maid} /> <PaymentHistoryCard />
          <ComplaintsCard complains={contract?.maidComplains} />
        </div>

        <div className="space-y-6">
          <ServiceSummaryCard contract={contract} />
          <PaymentHistoryCard />
          <AbsentAndReplacementCard
            orderId={contract?.id}
            maidAbsences={contract?.maidAbsences}
          />
        </div>
      </div>
    </div>
  );
}
