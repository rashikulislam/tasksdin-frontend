// components/service-details/TaskCreationForm.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Category } from "@/interfaces/task";
import { useForm } from "react-hook-form";
import {
  useCreateLocalTaskMutation,
  useGetPostTaskCategoryQuery,
} from "@/redux/features/NonSkilledConsumer.feature";
import { useAlert } from "@/components/Reusable/AlertModal";
import CustomInput from "@/components/Reusable/CustomInput";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { CustomDateAndTimeSelector } from "@/components/Reusable/CustomDateAndTimeSelector";
import UrgencyLevel from "@/components/Reusable/UrgencyLevel";
import { useIsMobile } from "@/hooks/use-mobile";

type TaskCreationFormProps = {
  categoryId: string;
  onPostTask: () => void;
};

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
// const urgencyLevels = [
//   {
//     value: "low",
//     label: "Low - Within a week",
//     color: "bg-green-100 text-green-700",
//   },
//   {
//     value: "medium",
//     label: "Medium - Within 3 days",
//     color: "bg-yellow-100 text-yellow-700",
//   },
//   {
//     value: "high",
//     label: "High - Within 24 hours",
//     color: "bg-red-100 text-red-700",
//   },
// ];

export default function TaskFromCategoryService({
  categoryId,
}: TaskCreationFormProps) {
  const [createTask, { isLoading: createLoading }] =
    useCreateLocalTaskMutation();
  const { data: response, isLoading } = useGetPostTaskCategoryQuery(undefined);
  const categories = response?.data || [];
  const { showAlert } = useAlert();
  const isMobile = useIsMobile();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskData>({
    defaultValues: { category_id: categoryId, task_title: "" },
  });

  const topRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (errorMessage) {
      topRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [errorMessage]);

  const options = categories
    ?.filter((f: Category) => f.id === categoryId)
    .map((cat: Category) => {
      return { label: cat.name, value: cat.id };
    });

  const onSubmit = async (payload: TaskData) => {
    setErrorMessage("");
    try {
      payload.budget = Number(payload.budget);
      const result = await createTask(payload).unwrap();

      if (result?.success) {
        reset();
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
      console.log(error);
      setErrorMessage(error?.data?.message);
    }
  };

  return (
    <Card className="border-0 shadow sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl">আপনার কাজ পোস্ট করুন</CardTitle>
        <p className="text-sm md:text-[16px] text-muted-foreground">
          কাজ পোস্ট করতে প্রয়োজনীয় তথ্য পূরণ করুন
        </p>
      </CardHeader>

      <CardContent ref={topRef}>
        {errorMessage && (
          <p className="text-sm text-red-500 text-center pb-3">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <CustomInput
            name="task_title"
            placeholder="যেমন: বাসা পরিষ্কার করার জন্য একজন প্রয়োজন"
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
            options={options || []}
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
            {/* <p className="text-center text-muted-foreground text-sm">
              পেমেন্ট নিশ্চিত হওয়ার পর আপনার কাজটি লাইভ হবে
            </p> */}
          </div>
        </form>

        {/* <div className="bg-secondary/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">মূল্য সীমা</h4>
          <div className="text-2xl font-bold text-primary">
            ৳{serviceData.avg_min_price_range} -{" "}
            {serviceData.avg_max_price_range}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            চূড়ান্ত মূল্য প্রোভাইডার দ্বারা নিশ্চিত করা হবে
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          কাজ পোস্ট করার পর আপনি পেমেন্ট পেজে চলে যাবেন
        </p> */}
      </CardContent>
    </Card>
  );
}
