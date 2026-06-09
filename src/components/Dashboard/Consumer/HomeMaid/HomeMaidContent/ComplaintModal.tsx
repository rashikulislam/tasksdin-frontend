"use client";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/Reusable/CustomModal";
import { useForm } from "react-hook-form";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { useComplainAboutMaidMutation } from "@/redux/features/home.maid.feature";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  requestId: string | null;
}

type TForm = {
  description: string;
  orderId: string;
};

export default function ComplaintModal({ open, onClose, requestId }: Props) {
  const [mutateAsync, { isLoading }] = useComplainAboutMaidMutation();
  const { showAlert } = useAlert();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>();
  const onSubmit = async (data: TForm) => {
    data.orderId = requestId as string;
    setErrorMsg("");
    try {
      const result = await mutateAsync(data).unwrap();
      if (result?.success) {
        handleClose();
        return showAlert({ title: result?.message, type: "success" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      width="lg"
      title=" বুয়ার বিরুদ্ধে অভিযোগ"
    >
      <div className="pb-5 px-2">
        <p className=" text-gray-600 pb-3">
          অ্যাসাইন করা বুয়ার বিরুদ্ধে আপনার অভিযোগ জানান
        </p>
        {errorMsg && (
          <p className="text-center text-sm text-red-600 py-3">{errorMsg}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTextArea
            placeholder="আপনার অভিযোগের বিবরণ লিখুন..."
            name="description"
            register={register}
            error={errors.description}
            errorMessage="আপনার অভিযোগের বিবরণ লিখুন"
            required
            maxWords={200}
          />

          <div className="pt-5 w-full flex items-center gap-3">
            <Button
              type="button"
              className="flex-1"
              variant="outline"
              onClick={handleClose}
            >
              বাতিল
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="flex-1"
              variant="destructive"
            >
              অভিযোগ জমা দিন
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
}
