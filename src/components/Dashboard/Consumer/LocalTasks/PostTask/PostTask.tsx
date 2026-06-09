"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { TaskForm } from "./TaskForm";
import { PaymentNotice } from "./PaymentNotice";

export const TaskPostForm = ({ onClose }: { onClose: () => void }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      {/* <PaymentNotice isMobile={isMobile} /> */}
      <TaskForm isMobile={isMobile} onClose={onClose} />
    </div>
  );
};
