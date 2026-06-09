"use client";

import { useState } from "react";
import LocalTasksContent from "@/components/Dashboard/Consumer/LocalTasks/LocalTaskContent/LocalTasksContent";
import PostTaskModal from "@/components/Dashboard/Consumer/LocalTasks/PostTask/PostTaskModal";
export default function LocalTasksClient() {
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);

  const openPostTask = () => setIsPostTaskOpen(true);
  const closePostTask = () => setIsPostTaskOpen(false);

  return (
    <div>
      <LocalTasksContent openPostTask={openPostTask} />
      <PostTaskModal isOpen={isPostTaskOpen} onClose={closePostTask} />
    </div>
  );
}
