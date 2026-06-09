"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAgentHomeMaidQuery } from "@/redux/features/agent.feature";
import { IHomeMaid } from "@/interfaces/maid";
import Image from "next/image";
import { ManageStatusState } from "@/components/Reusable/ManageStatusState";
import HomeMaidSkeleton from "@/components/Skeletons/HomeMaidSkeleton";
import Link from "next/link";

interface BuaListingTabProps {
  setShowBuaListingForm: (show: boolean) => void;
}

export default function BuaListingTab({
  setShowBuaListingForm,
}: BuaListingTabProps) {
  const { data, isLoading, isError } = useGetAgentHomeMaidQuery(undefined);

  const homeMaids = (data?.data as IHomeMaid[]) || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">বুয়া তালিকা</h2>
          <p className="text-muted-foreground">আপনার তালিকাভুক্ত বুয়া</p>
        </div>

        <Button onClick={() => setShowBuaListingForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন বুয়া যোগ করুন
        </Button>
      </div>

      <div className="pt-5">
        {isLoading ? (
          <HomeMaidSkeleton />
        ) : isError ? (
          <ManageStatusState
            description="কিছু ভুল হয়েছে, দয়া করে আবার চেষ্টা করুন।"
            message="সমস্যা ঘটেছে"
            type="error"
          />
        ) : !homeMaids?.length ? (
          <ManageStatusState
            description="কোনো হোম মেইড পাওয়া যায়নি।"
            message="ডেটা নেই"
            type="notFound"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeMaids?.map((bua: IHomeMaid) => (
              <div
                key={bua.id}
                className="bg-white rounded-xl  overflow-hidden shadow border border-gray-200 transition-shadow duration-300 flex flex-col justify-between pb-4"
              >
                <div>
                  <div className="w-full h-56 relative">
                    <Image
                      src={bua.profile_img}
                      alt={bua.name}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={bua.profile_img}
                    />
                  </div>

                  <div className="px-2 pt-2">
                    <h2 className="text-xl flex items-center justify-between font-semibold text-gray-800">
                      <span> {bua.name}</span>
                      <span className="text-sm  text-gray-500">
                        {bua?.gender === "FEMALE" ? "মহিলা" : "পুরুষ"}
                      </span>
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      ফোন:{" "}
                      <span className="font-medium">{bua.phone_number}</span>
                    </p>

                    <div className="mt-1 ">
                      <p className="text-sm text-gray-600 font-medium">
                        দক্ষতা:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {bua.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      কাজের সময়:{" "}
                      <span className="font-medium">{bua.working_hours}</span>
                    </p>

                    <p className="text-sm text-gray-600">
                      মোট ঘন্টা:{" "}
                      <span className="font-medium">{bua.work_time} ঘণ্টা</span>
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      বেতন প্রত্যাশা:{" "}
                      <span className="font-medium">
                        {bua.salary_expectation} টাকা
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {bua.address_details}
                    </p>
                  </div>
                </div>
                <div className="px-4">
                  <Link href={`/dashboard/agent/bua-list/${bua.id}`}>
                    <button className="mt-3 w-full bg-[#3C83F6] text-white py-2 rounded-lg hover:bg-[#3a7eeb] transition-colors">
                      বিস্তারিত দেখুন
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
