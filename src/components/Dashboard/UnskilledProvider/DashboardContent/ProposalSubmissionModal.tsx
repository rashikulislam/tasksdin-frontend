"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ITask } from "@/interfaces/task";
import { useForm } from "react-hook-form";
import CustomInput2 from "@/components/Reusable/CustomInput2";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { useCreateProposalNonSkillMutation } from "@/redux/features/proposal.nonskill.features";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useEffect, useState } from "react";
import CustomModal from "@/components/Reusable/CustomModal";

type TProposal = {
  proposal_price: number;
  description: string;
  task_id: string;
};
interface ProposalSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}

const ProposalSubmissionModal = ({
  isOpen,
  onClose,
  task,
}: ProposalSubmissionModalProps) => {
  const [mutateAsync, { isLoading }] = useCreateProposalNonSkillMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TProposal>({
    defaultValues: {
      proposal_price: task?.budget,
    },
  });

  useEffect(() => {
    setValue("proposal_price", task?.budget);
  }, [setValue, task?.budget]);

  const { showAlert } = useAlert();
  const onbSubmit = async (data: TProposal) => {
    data.task_id = task.id;
    setErrorMessage("");
    try {
      const result = await mutateAsync(data).unwrap();
      handleClose();
      if (result?.success) {
        return showAlert({
          title: result?.message,
          type: "success",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error?.data?.message);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setErrorMessage("");
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="প্রস্তাব জমা দিন"
      width="lg"
    >
      <h1>কাজের বিস্তারিত দেখুন এবং আপনার প্রস্তাব জমা দিন</h1>
      {errorMessage && (
        <p className="text-red-500 font-medium mx-auto text-center">
          {errorMessage}
        </p>
      )}

      <div className="space-y-3 py-4">
        {/* Task Title (Read-only) */}
        <div>
          <Label className="text-base font-semibold">কাজের শিরোনাম</Label>
          <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-foreground">{task?.task_title}</p>
          </div>
        </div>

        {/* Task Description (Read-only) */}
        <div>
          <Label className="text-base font-semibold">কাজের বিবরণ</Label>
          <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border max-h-32 overflow-y-auto">
            <p className="text-foreground whitespace-pre-wrap">
              {task?.description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onbSubmit)} className="space-y-2">
          <CustomInput2
            type="text"
            name="proposal_price"
            placeholder="আপনার প্রস্তাবিত মূল্য"
            register={register}
            required
            error={errors.proposal_price!}
          />
          <CustomTextArea
            name="description"
            placeholder="এখানে আপনার প্রস্তাব লিখুন..."
            register={register}
            error={errors.description}
            errorMessage=""
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="reset"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              বাতিল করুন
            </Button>
            <Button
              disabled={isLoading}
              className="flex-1 disabled:bg-gray-800 disabled:cursor-default"
            >
              প্রস্তাব জমা দিন
            </Button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default ProposalSubmissionModal;
