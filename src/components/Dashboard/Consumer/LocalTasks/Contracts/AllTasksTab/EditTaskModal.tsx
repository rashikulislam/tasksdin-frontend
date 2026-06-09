"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AllTaskTab } from "@/interfaces";

export interface Task {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: AllTaskTab | null;
  onSave: (task: AllTaskTab) => void;
}

const categories = [
  "Home Services",
  "Logistics",
  "Maintenance",
  "Cleaning",
  "Delivery",
  "Repair",
  "Other",
];

export default function EditTaskModal({
  open,
  onOpenChange,
  task,
  onSave,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<AllTaskTab>({
    id: "",
    title: "",
    description: "",
    price: "",
    category: "",
    timePosted: "",
    proposalsCount: 0,
    status: "open",
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>টাস্ক এডিট করুন</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">টাস্কের শিরোনাম</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="টাস্কের শিরোনাম লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">বিবরণ</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="টাস্কের বিস্তারিত বিবরণ লিখুন"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">মূল্য (৳)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="মূল্য"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">ক্যাটাগরি</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              বাতিল
            </Button>
            <Button type="submit">সেভ করুন</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
