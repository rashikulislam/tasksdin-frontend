"use client";
import { TaskPostForm } from "./PostTask";
import CustomModal from "@/components/Reusable/CustomModal";

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostTaskModal({ isOpen, onClose }: PostTaskModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="নতুন কাজ পোস্ট করুন"
      width="xl"
    >
      <TaskPostForm onClose={onClose} />
    </CustomModal>
  );
}
