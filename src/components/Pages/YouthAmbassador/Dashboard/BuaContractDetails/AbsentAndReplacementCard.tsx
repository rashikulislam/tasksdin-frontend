"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { History, UserX } from "lucide-react";

import MaidReplaceOrAbsenceModal from "../Modals/MaidReplaceOrAbsenceModal";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TMaidAbsence } from "@/interfaces/maid";
import moment from "moment";
import "moment/locale/bn";
import { calculateDaysBetween } from "@/utils/calculateDaysBetween";
import { getTotalAbsentDays } from "@/utils/totalAbsentDays";

export default function AbsentAndReplacementCard({
  orderId,
  maidAbsences,
}: {
  orderId: string;
  maidAbsences: TMaidAbsence[];
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const absence = maidAbsences?.filter((d) => d.assignId === null);
  const replace = maidAbsences?.filter((d) => d.assignId != null);
  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserX className="w-5 h-5" />
              অনুপস্থিতি রেকর্ড
            </span>
            <Button
              onClick={() => setOpenModal(true)}
              size="sm"
              variant="outline"
            >
              {/* <Bell className="w-4 h-4 mr-1" /> */}
              অনুপস্থিতি/প্রতিস্থাপন করুন
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!absence?.length ? (
            <p className="text-center text-muted-foreground py-4">
              কোনো অনুপস্থিতি নেই
            </p>
          ) : (
            <div>
              <h1 className="text-[16px] pb-5 lg:text-lg font-semibold text-red-600">
                টোটাল অনুপস্থিতি {getTotalAbsentDays(absence).bn} দিন
              </h1>

              <div className="space-y-4">
                {absence?.map((absent: TMaidAbsence, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 mb-4 bg-white shadow-sm rounded-lg border border-gray-200"
                  >
                    {/* Date & Days */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium break-words">
                          <span className="font-semibold">তারিখ:</span>{" "}
                          {moment(absent?.start_date).format("ll")}
                          {absent?.end_date
                            ? ` - ${moment(absent?.end_date).format("ll")}`
                            : ""}
                        </span>

                        <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                          মোট{" "}
                          <span className="font-semibold text-gray-800">
                            {
                              calculateDaysBetween(
                                absent?.start_date,
                                absent?.end_date,
                              ).bn
                            }
                          </span>{" "}
                          দিন
                        </span>
                      </div>

                      <Badge
                        variant="outline"
                        className="text-xs sm:text-sm border-gray-300 text-gray-700 px-3 py-1 rounded-full mt-2 sm:mt-0"
                      >
                        {absent?.reason || "কারণ উল্লেখ নেই"}
                      </Badge>
                    </div>

                    {absent?.text && (
                      <p className="mt-3 text-gray-700 text-sm break-words">
                        {absent.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div>
            {replace?.length ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-lg text-muted-foreground flex items-center gap-1">
                    <History className="w-5 h-5" />
                    প্রতিস্থাপনের ইতিহাস
                  </h5>
                  <h1 className="text-[16px] lg:text-lg font-semibold text-red-600">
                    টোটাল প্রতিস্থাপন {getTotalAbsentDays(replace).bn} দিন
                  </h1>
                </div>
                {replace?.map((replacement) => (
                  <div
                    key={replacement?.id}
                    className="p-4 mb-3 bg-blue-50 border border-blue-200 rounded-xl shadow-sm"
                  >
                    {/* Maid Info */}
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-semibold text-lg text-blue-900">
                          {replacement?.assignMaid?.name}
                        </p>
                        <p className="text-xs text-blue-700">
                          {replacement?.assignMaid?.phone_number}
                        </p>
                      </div>
                    </div>

                    {/* Date & Days */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium break-words">
                          <span className="font-semibold">তারিখ:</span>{" "}
                          {moment(replacement?.start_date).format("ll")}
                          {replacement?.end_date
                            ? ` - ${moment(replacement?.end_date).format("ll")}`
                            : ""}
                        </span>

                        <span className="text-sm text-gray-600 mt-1 sm:mt-0">
                          মোট{" "}
                          <span className="font-semibold text-gray-800">
                            {
                              calculateDaysBetween(
                                replacement?.start_date,
                                replacement?.end_date,
                              ).bn
                            }
                          </span>{" "}
                          দিন
                        </span>
                      </div>

                      {/* Reason Badge */}
                      <span className="mt-2 sm:mt-0 text-xs sm:text-sm border border-blue-300 text-blue-800 px-3 py-1 rounded-full bg-blue-100">
                        {replacement?.reason || "কারণ উল্লেখ নেই"}
                      </span>
                    </div>
                    {replacement?.text && (
                      <p className="mt-3 text-gray-700 text-sm break-words">
                        {replacement.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </CardContent>
      </Card>

      {openModal && (
        <MaidReplaceOrAbsenceModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          orderId={orderId}
        />
      )}

      {/* <Dialog open={showAbsentNotice} onOpenChange={setShowAbsentNotice}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="w-5 h-5" />
              অনুপস্থিতি নোটিফাই করুন
            </DialogTitle>
            <DialogDescription>
              বুয়া অনুপস্থিত থাকলে ইউজারকে জানান
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="অনুপস্থিতির কারণ ও বিস্তারিত লিখুন"
              value={noticeMessage}
              onChange={(e) => setNoticeMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAbsentNotice(false)}
            >
              বাতিল
            </Button>
            <Button onClick={handleSendAbsentNotice}>
              <Bell className="w-4 h-4 mr-2" />
              নোটিফাই করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Replace Bua Dialog */}
      {/* <Dialog open={showReplaceBua} onOpenChange={setShowReplaceBua}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              বুয়া প্রতিস্থাপন করুন
            </DialogTitle>
            <DialogDescription>
              অনুপস্থিত বুয়ার পরিবর্তে অন্য বুয়া অ্যাসাইন করুন
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={selectedReplacement}
              onValueChange={setSelectedReplacement}
            >
              <SelectTrigger>
                <SelectValue placeholder="প্রতিস্থাপন বুয়া নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {availableBuasForReplacement.map((bua) => (
                  <SelectItem key={bua.id} value={bua.id}>
                    {bua.name} - {bua.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplaceBua(false)}>
              বাতিল
            </Button>
            <Button onClick={handleReplaceBua}>
              <RefreshCw className="w-4 h-4 mr-2" />
              প্রতিস্থাপন করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
