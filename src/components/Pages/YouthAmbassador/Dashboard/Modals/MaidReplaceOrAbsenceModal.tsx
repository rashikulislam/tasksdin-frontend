"use client";
import { useAlert } from "@/components/Reusable/AlertModal";
import { CustomDateAndTimeSelector } from "@/components/Reusable/CustomDateAndTimeSelector";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomModal from "@/components/Reusable/CustomModal";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IHomeMaid } from "@/interfaces/maid";
import {
  useCreateAbsenceMaidMutation,
  useGetNonHireMaidApplicationQuery,
} from "@/redux/features/home.maid.feature";
import { useState } from "react";
import { useForm } from "react-hook-form";
const absenceReasons = [
  { label: "অসুস্থতা", value: "অসুস্থতা" },
  { label: "পারিবারিক সমস্যা", value: "পারিবারিক সমস্যা" },
  { label: "ব্যক্তিগত কাজ", value: "ব্যক্তিগত কাজ" },
  { label: "জরুরি কাজ", value: "জরুরি কাজ" },
  { label: "গ্রামে যাওয়া", value: "গ্রামে যাওয়া" },
  { label: "দুর্ঘটনা", value: "দুর্ঘটনা" },
  { label: "শিশুর অসুস্থতা", value: "শিশুর অসুস্থতা" },
  { label: "ধর্মীয় অনুষ্ঠান", value: "ধর্মীয় অনুষ্ঠান" },
  { label: "সরকারি ছুটি", value: "সরকারি ছুটি" },
  { label: "অন্যান্য", value: "অন্যান্য" },
];

type TAbsenceModal = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

type TAbsenceForm = {
  start_date: string;
  end_date: string;
  assignId: string;
  orderId: string;
  reason: string;
  text: string;
};
const MaidReplaceOrAbsenceModal = ({
  isOpen,
  onClose,
  orderId,
}: TAbsenceModal) => {
  const { isLoading, data } = useGetNonHireMaidApplicationQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });
  const { showAlert } = useAlert();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [mutateAsync, { isLoading: createLoading }] =
    useCreateAbsenceMaidMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAbsenceForm>();

  const onSubmit = async (data: TAbsenceForm) => {
    data.orderId = orderId;
    setErrorMsg("");
    try {
      const result = await mutateAsync(data).unwrap();
      if (result?.success) {
        onClose();
        reset();
        showAlert({ title: result?.message, type: "success" });
        setErrorMsg("");
      } else {
        showAlert({ title: result?.message, type: "error" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error?.data?.message);
    }
  };

  const manageOptions = data?.data?.map((d: IHomeMaid) => {
    return {
      label: `${d?.name}`,
      value: d?.id,
    };
  });
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="অনুপস্থিতি/প্রতিস্থাপন করুন"
      width="lg"
    >
      {errorMsg && (
        <p className="text-sm text-center text-red-600 py-2">{errorMsg}</p>
      )}
      <form className="space-y-3 py-5" onSubmit={handleSubmit(onSubmit)}>
        <Label className="pb-1 lg:pb-0.5 flex items-center">
          অনুপস্থিতি/প্রতিস্থাপন তারিখ
          <span className="text-red-600">*</span>
        </Label>
        <div className="flex items-start gap-5">
          <CustomDateAndTimeSelector
            control={control}
            name="start_date"
            placeholder="শুরুর তারিখ"
            required
            showTime={false}
            rules={{ required: "শুরুর তারিখ নির্বাচন করুন" }}
          />
          <CustomDateAndTimeSelector
            control={control}
            name="end_date"
            placeholder="শেষ তারিখ"
            required
            showTime={false}
          />
        </div>
        <CustomDropdown
          control={control}
          name="assignId"
          options={manageOptions || []}
          isLoading={isLoading}
          label="নতুন প্রতিস্থাপন করুন"
          placeholder="নতুন প্রতিস্থাপন করুন"
        />
        <CustomDropdown
          control={control}
          name="reason"
          options={absenceReasons || []}
          label="অনুপস্থিতির কারণ"
          placeholder="অনুপস্থিতির কারণ"
          required
          error={errors.reason}
          errorMessage="অনুপস্থিতির কারণ লিখুন"
        />
        <CustomTextArea
          name="text"
          placeholder="বিস্তারিত লিখুন"
          register={register}
          label="বিস্তারিত লিখুন"
          maxWords={150}
          error={errors.text}
          errorMessage="বিস্তারিত লিখুন"
          required
        />
        <Button className="w-full" disabled={createLoading}>
          জমা দিন
        </Button>
      </form>
    </CustomModal>
  );
};

export default MaidReplaceOrAbsenceModal;
