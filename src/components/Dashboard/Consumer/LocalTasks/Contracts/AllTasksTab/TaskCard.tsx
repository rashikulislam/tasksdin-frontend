"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  FileText,
  MoreVertical,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import EditTaskModal from "./EditTaskModal";
import { INonSkilledTask } from "./UserAllTasksTab";
import moment from "moment";

interface TaskCardProps {
  task: INonSkilledTask;
}

const TaskStatus = {
  PENDING: "PENDING",
  ON_GOING: "ON_GOING",
  COMPLETE: "COMPLETE",
  DENY: "DENY",
};

export function TaskCard({ task }: TaskCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  moment.locale("bn"); // Bangla locale

  const getStatusBadge = (status: string) => {
    switch (status) {
      case TaskStatus.PENDING:
        return (
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/30"
          >
            Pending
          </Badge>
        );
      case TaskStatus.ON_GOING:
        return (
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30"
          >
            চলমান
          </Badge>
        );
      case TaskStatus.COMPLETE:
        return (
          <Badge
            variant="outline"
            className="bg-muted/10 text-muted-foreground border-muted/30"
          >
            সম্পন্ন
          </Badge>
        );
      case TaskStatus.DENY:
        return (
          <Badge
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/30"
          >
            বাতিল
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            অজানা
          </Badge>
        );
    }
  };

  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex  justify-between">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <CardTitle className="text-lg">{task?.task_title}</CardTitle>
                  {getStatusBadge(task?.status)}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      টাস্ক সম্পাদনা
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteDialogOpen(true)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      টাস্ক মুছে ফেলুন
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground">
                {task?.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">মূল্য</p>
                <p className="text-lg font-bold text-primary">
                  ৳{task?.budget}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">প্রস্তাবনা</p>
                <p className="text-sm font-bold text-accent">
                  {task?._count?.proposals}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  পোস্ট করা হয়েছে
                </p>
                <p className="text-sm font-medium">
                  {moment(task.created_at).format("ll, A h:mm")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">সময় শেষ হবে</p>
                <p className="text-sm font-medium">
                  {moment(task.deadline).format("ll, A h:mm")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">সার্ভিসের ধরণ </p>
                <p className="text-sm font-medium">{task?.category?.name}</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full disabled:bg-gray-700 disabled:text-white"
            variant={task?._count?.proposals > 0 ? "default" : "outline"}
            disabled={!task?._count?.proposals}
          >
            <Link
              href={`/dashboard/consumer/local-tasks/contracts/proposals/${task?.id}`}
              className="flex items-center w-full justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              {task?._count?.proposals > 0
                ? `${task?._count?.proposals} প্রস্তাবনা দেখুন`
                : "কোন প্রস্তাবনা নেই"}
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>টাস্ক মুছে ফেলুন</AlertDialogTitle>
            <AlertDialogDescription>
              আপনি কি নিশ্চিত যে এই টাস্কটি মুছে ফেলতে চান? এই কাজটি
              পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
