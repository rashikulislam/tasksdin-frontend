"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import {
  ArrowLeft,
  Banknote,
  Smartphone,
  CheckCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateLocalTaskMutation } from "@/redux/features/NonSkilledConsumer.feature";
import { showToast } from "@/components/Reusable/CustomToast";
import { useAlert } from "@/components/Reusable/AlertModal";
import { TaskData } from "./TaskForm";

type PaymentMethod = "cash" | "escrow";

export const PostTaskPaymentOptions = () => {
  const router = useRouter();

  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [createTask, { isLoading }] = useCreateLocalTaskMutation();
  const { showAlert } = useAlert();

  // Read pending task data written by TaskForm
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("pendingTaskData");
    if (!raw) {
      router.replace("/dashboard/consumer/local-tasks");
      return;
    }
    setTaskData(JSON.parse(raw) as TaskData);
  }, [router]);

  const handleConfirm = async () => {
    if (!selected || !taskData) return;

    if (selected === "escrow") {
      showToast({
        type: "info",
        title: "শীঘ্রই আসছে",
        description: "bKash / Nagad এস্ক্রো পেমেন্ট শীঘ্রই চালু হবে।",
      });
      return;
    }

    // Cash on Delivery — post the task now
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (createTask as any)(taskData).unwrap();
      if (result?.success) {
        sessionStorage.removeItem("pendingTaskData");
        showAlert({ title: result?.message, type: "success", description: "" });
        router.push("/dashboard/consumer/local-tasks/posted");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showToast({
        type: "error",
        title: "কাজ পোস্ট করতে ব্যর্থ",
        description: error?.data?.message ?? "আবার চেষ্টা করুন।",
      });
    }
  };

  // While sessionStorage is being read, render nothing
  if (!taskData) return null;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Back button */}
        <Button
          type="button"
          variant="ghost"
          className="mb-5 -ml-2"
          onClick={() => router.push("/dashboard/consumer/local-tasks")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>

        {/* Heading */}
        <h2 className="text-xl font-semibold">পেমেন্ট পদ্ধতি নির্বাচন করুন</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          কাজ পোস্ট করতে একটি পেমেন্ট পদ্ধতি বেছে নিন
        </p>

        {/* Task summary */}
        <Card className="mb-6 bg-muted/30 border-border">
          <CardContent className="p-4 space-y-1">
            <p className="text-sm font-semibold">{taskData.task_title}</p>
            <p className="text-sm text-muted-foreground">
              বাজেট: ৳{taskData.budget}
            </p>
          </CardContent>
        </Card>

        {/* Payment options */}
        <div className="space-y-3">
          {/* ── Cash on Delivery ── */}
          <button
            type="button"
            onClick={() => setSelected("cash")}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              selected === "cash"
                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                : "border-border hover:border-green-400 dark:hover:border-green-600"
            }`}
          >
            <div
              className={`p-3 rounded-full shrink-0 ${
                selected === "cash"
                  ? "bg-green-100 dark:bg-green-900/50"
                  : "bg-muted"
              }`}
            >
              <Banknote
                className={`h-6 w-6 ${
                  selected === "cash"
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">ক্যাশ অন ডেলিভারি</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                কাজ সম্পন্ন হওয়ার পর সরাসরি পেমেন্ট করুন
              </p>
            </div>
            {selected === "cash" && (
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            )}
          </button>

          {/* ── bKash / Nagad Escrow (coming soon) ── */}
          <button
            type="button"
            onClick={() => setSelected("escrow")}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              selected === "escrow"
                ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30"
                : "border-border hover:border-pink-400 dark:hover:border-pink-600"
            }`}
          >
            <div
              className={`p-3 rounded-full shrink-0 ${
                selected === "escrow"
                  ? "bg-pink-100 dark:bg-pink-900/50"
                  : "bg-muted"
              }`}
            >
              <Smartphone
                className={`h-6 w-6 ${
                  selected === "escrow"
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-muted-foreground"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground flex items-center gap-2 flex-wrap">
                bKash / Nagad
                <span className="inline-flex items-center gap-1 text-xs font-normal bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-2 py-0.5 rounded-full">
                  <Lock className="h-3 w-3" />
                  শীঘ্রই আসছে
                </span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                এস্ক্রো পেমেন্ট — কাজ সম্পন্ন না হওয়া পর্যন্ত টাকা নিরাপদ থাকবে
              </p>
            </div>
            {selected === "escrow" && (
              <CheckCircle className="h-5 w-5 text-pink-500 shrink-0" />
            )}
          </button>
        </div>

        {/* Confirm button */}
        <Button
          type="button"
          size="lg"
          className="w-full mt-6"
          disabled={!selected || isLoading}
          onClick={handleConfirm}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              পোস্ট করা হচ্ছে…
            </>
          ) : (
            "নিশ্চিত করুন ও কাজ পোস্ট করুন"
          )}
        </Button>
      </div>
    </div>
  );
};
