"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useCreateLocalTaskMutation,
  useGetPostTaskCategoryQuery,
} from "@/redux/features/NonSkilledConsumer.feature";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { CustomDateAndTimeSelector } from "@/components/Reusable/CustomDateAndTimeSelector";
import UrgencyLevel from "@/components/Reusable/UrgencyLevel";
import { useAlert } from "@/components/Reusable/AlertModal";
import { useEffect, useRef, useState } from "react";

interface Category {
  id: string;
  name: string;
}
interface TaskFormProps {
  isMobile: boolean;
  onClose: () => void;
}

export interface TaskData {
  task_title: string;
  description: string;
  category_id: string;
  budget: number;
  deadline: string;
  urgency_level: string;
  location_info: string;
  type?: string;
  createdAt?: string;
  serviceData?: string;
}
export const TaskForm = ({ isMobile, onClose }: TaskFormProps) => {
  const [createTask, { isLoading: createLoading }] =
    useCreateLocalTaskMutation();
  const { data: response, isLoading } = useGetPostTaskCategoryQuery(undefined);
  const categories = response?.data || [];
  const { showAlert } = useAlert();

  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({ defaultValues: { category_id: "", task_title: "" } });
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorMessage) {
      topRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [errorMessage]);

  const options = categories.map((cat: Category) => {
    return { label: cat.name, value: cat.id };
  });

  const onSubmit = async (payload: TaskData) => {
    setErrorMessage("");
    try {
      payload.budget = Number(payload.budget);
      const result = await createTask(payload).unwrap();

      if (result?.success) {
        onClose();
        return showAlert({
          title: result?.message,
          type: "success",
          description: "",
        });
      } else {
        setErrorMessage(result?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <Card
      className={isMobile ? "card-mobile border-0 shadow-card" : ""}
      ref={topRef}
    >
      <CardHeader className={isMobile ? "pb-4" : "pt-0"}>
        {errorMessage && (
          <CardTitle className="text-red-600 text-center">
            {errorMessage}
          </CardTitle>
        )}
        <CardTitle className={isMobile ? "text-lg" : ""}>
          আপনার কাজের বিবরণ দিন
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "px-4" : ""}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CustomInput
            name="task_title"
            placeholder="যেমন: আমার বাসা পরিষ্কার করার জন্য একজন প্রয়োজন"
            register={register}
            type="text"
            error={errors.task_title!}
            label="কাজের শিরোনাম"
            required
            errorMessage={
              errors.task_title?.message || "অনুগ্রহ করে কাজের শিরোনাম লিখুন।"
            }
          />

          <CustomDropdown
            control={control}
            label="ক্যাটাগরি"
            name="category_id"
            options={isLoading ? [] : options || []}
            required
            placeholder="ক্যাটাগরি নির্বাচন করুন"
            error={errors.category_id}
            errorMessage={
              errors.category_id?.message ||
              "অনুগ্রহ করে একটি ক্যাটাগরি নির্বাচন করুন।"
            }
          />

          <CustomTextArea
            label="বিস্তারিত বিবরণ"
            required={true}
            name="description"
            placeholder="বিস্তারিত বিবরণ"
            register={register}
            error={errors.description}
            errorMessage={
              errors.description?.message ||
              "অনুগ্রহ করে বিস্তারিত বিবরণ লিখুন।"
            }
            row={3}
          />

          <CustomInput
            name="budget"
            placeholder="যেমন: ৳৫০০"
            register={register}
            type="text"
            error={errors.budget!}
            label="বাজেট"
            required
            errorMessage={errors.budget?.message || "অনুগ্রহ করে বাজেট লিখুন।"}
          />

          <CustomDateAndTimeSelector
            control={control}
            name="deadline"
            placeholder="তারিখ ও সময় নির্বাচন করুন"
            label="তারিখ ও সময়"
            rules={{ required: "দয়া করে একটি তারিখ এবং সময় নির্বাচন করুন" }}
            showTime
            required={true}
          />

          <CustomTextArea
            label="লোকেশনের বিস্তারিত"
            name="location_info"
            placeholder="রোড, ফ্ল্যাট/বাড়ি নম্বর, ফ্লোর, এলাকা"
            register={register}
            error={errors.location_info}
            errorMessage="দয়া করে লোকেশনের বিস্তারিত লিখুন"
            required
            row={2}
          />

          <UrgencyLevel isMobile={isMobile} control={control} />

          <div className="space-y-4">
            <Button
              disabled={createLoading}
              type="submit"
              className={`w-full ${isMobile ? "btn-mobile-primary" : ""}`}
              size="lg"
            >
              কাজ পোস্ট করুন
            </Button>
            <p className="text-center text-muted-foreground text-sm">
              পেমেন্ট নিশ্চিত হওয়ার পর আপনার কাজটি লাইভ হবে
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
