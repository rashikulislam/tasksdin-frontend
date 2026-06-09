"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { IHomeMaid, TAssignMaidModal } from "@/interfaces/maid";
import CustomModal from "@/components/Reusable/CustomModal";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import { useForm } from "react-hook-form";
import {
  useAssignHomeMaidMutation,
  useGetNonHireMaidApplicationQuery,
} from "@/redux/features/home.maid.feature";
import { calculateDistance } from "@/components/Dashboard/Common/utils/calculateDistance";
import { useAlert } from "@/components/Reusable/AlertModal";
type TMaidId = {
  maidId: string;
};

interface AssignBuaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: TAssignMaidModal | null;
  setSelectedRequest: Dispatch<SetStateAction<TAssignMaidModal | null>>;
}

export default function AssignBuaModal({
  open,
  onOpenChange,
  selectedRequest,
  setSelectedRequest,
}: AssignBuaModalProps) {
  const orderId = selectedRequest?.order_id as string;
  const { data, isLoading } = useGetNonHireMaidApplicationQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  const [mutateAsync, { isLoading: assignLoading }] =
    useAssignHomeMaidMutation();
  const { showAlert } = useAlert();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const sortedMaids = data?.data
    ?.map((maid: IHomeMaid) => {
      const distance = calculateDistance(
        {
          lat1: selectedRequest?.consumer_location?.latitude as number,
          lng1: selectedRequest?.consumer_location?.longitude as number,
        },
        { lat2: maid.lat, lng2: maid.lng },
      );

      return {
        ...maid,
        distance,
      };
    })
    .sort(
      (a: { distance: number }, b: { distance: number }) =>
        a.distance - b.distance,
    );

  const manageOptions = sortedMaids?.map((d: IHomeMaid) => {
    return {
      label: `${d?.name} - ${d?.distance?.toFixed(1)} কিমি`,
      value: d?.id,
    };
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TMaidId>();

  const maidId = watch("maidId");

  const findMaid: IHomeMaid = sortedMaids?.find(
    (d: IHomeMaid) => d.id === maidId,
  );

  // CLOSE MODAL
  const closeModal = () => {
    onOpenChange(false);
    setSelectedRequest(null);
    reset();
    setErrorMsg("");
  };

  // SUBMIT FORM
  const onSubmit = async (data: TMaidId) => {
    setErrorMsg("");
    const payload = {
      maidId: data?.maidId,
      orderId: selectedRequest?.order_id,
    };
    try {
      const result = await mutateAsync(payload).unwrap();
      console.log(reset);
      if (result?.success) {
        closeModal();
        showAlert({ title: result?.message, type: "success" });
      } else {
        showAlert({ title: result?.message, type: "error" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setErrorMsg(
        error?.data?.message ||
          "সার্ভারে ত্রুটি হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
      );
    }
  };

  return (
    <CustomModal isOpen={open} onClose={closeModal} title="বুয়া অ্যাসাইন করুন">
      {errorMsg && (
        <p className="text-center text-red-500 text-sm pb-1">{errorMsg}</p>
      )}
      <div className="p-3 space-y-4 text-sm">
        {/* Request Info */}
        <div className="bg-muted/40 rounded-xl p-4 space-y-2 ">
          <h4 className="font-semibold ">📄 রিকুয়েস্ট</h4>

          <div className="space-y-1 text-gray-600">
            <p>
              <span>নাম:</span>{" "}
              <span className="font-medium">{selectedRequest?.full_name}</span>
            </p>

            <p>
              <span>ফোন:</span>{" "}
              <span className="font-medium">
                {selectedRequest?.mobile_number}
              </span>
            </p>

            <p className="truncate">
              <span>লোকেশন:</span>{" "}
              <span className="font-medium">{selectedRequest?.address}</span>
            </p>
          </div>
        </div>

        {/* Selected Maid Compact Card */}
        {findMaid && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-gray-800 text-sm">
              🧕 {findMaid?.name}
            </p>

            <p className="text-xs text-gray-600 truncate">
              📍 {findMaid?.address_details}
            </p>

            <p className="text-xs font-medium text-green-700">
              দূরত্ব: {findMaid?.distance?.toFixed(1)} কিমি
            </p>
          </div>
        )}
        {/* Assign Section */}
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
          <CustomDropdown
            control={control}
            name="maidId"
            options={manageOptions || []}
            error={errors.maidId}
            errorMessage="বুয়া নির্বাচন করুন"
            label="গৃহকর্মী নির্বাচন"
            placeholder="বুয়া নির্বাচন করুন"
            required
            isLoading={isLoading}
          />

          <Button
            className="w-full h-9 rounded-lg text-sm"
            disabled={assignLoading}
          >
            অ্যাসাইন করুন
          </Button>
        </form>
      </div>
    </CustomModal>
  );
}
