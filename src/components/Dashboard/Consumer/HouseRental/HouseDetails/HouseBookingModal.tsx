"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface HouseBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rent: number;
  bookingDate?: Date;
  onBookingDateChange: (date: Date | undefined) => void;
  bookingMessage: string;
  onBookingMessageChange: (message: string) => void;
  onSubmit: () => void;
}

const HouseBookingModal = ({
  open,
  onOpenChange,
  rent,
  bookingDate,
  onBookingDateChange,
  bookingMessage,
  onBookingMessageChange,
  onSubmit,
}: HouseBookingModalProps) => {
  const formatRent = (amount: number) =>
    new Intl.NumberFormat("en-BD").format(amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>বাসা বুক করুন</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Rent */}
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">মাসিক ভাড়া</p>
            <p className="text-xl font-bold text-primary">
              ৳{formatRent(rent)}
            </p>
          </div>

          {/* Booking Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              প্রবেশের তারিখ নির্বাচন করুন *
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !bookingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingDate
                    ? format(bookingDate, "PPP")
                    : "তারিখ নির্বাচন করুন"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={onBookingDateChange}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              বার্তা (ঐচ্ছিক)
            </label>
            <Textarea
              placeholder="মালিককে আপনার সম্পর্কে জানান..."
              value={bookingMessage}
              onChange={(e) => onBookingMessageChange(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={!bookingDate}
          >
            পেমেন্টে এগিয়ে যান
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            বুকিং নিশ্চিত করতে অগ্রিম পেমেন্ট প্রয়োজন
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HouseBookingModal;
