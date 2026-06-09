"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CustomModal from "./CustomModal";
import { useGiveRatingMutation } from "@/redux/features/rating.freature";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

interface ReviewFormProps {
  providerId: string;
  onClose: () => void;
  isOpen: boolean;
}

const ReviewForm = ({ providerId, onClose, isOpen }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const isMobile = useIsMobile();
  const [mutateAsync, { isLoading }] = useGiveRatingMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    const data = {
      providerId: providerId,
      rate: rating,
      description: comment,
    };
    try {
      const result = await mutateAsync(data).unwrap();
      onClose();
      setRating(0);
      setComment("");
      if (result.success) {
        toast.success(result?.message, { duration: 2000 });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.success, { duration: 2000 });
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="রিভিউ দিন" width="md">
      <form onSubmit={handleSubmit} className="space-y-6 py-5 px-3">
        {/* স্টার রেটিং */}
        <div className="space-y-2">
          <label className="text-sm font-medium">রেটিং *</label>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-colors"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-center text-sm text-muted-foreground">
              {rating === 1 && "খুব খারাপ"}
              {rating === 2 && "মোটামুটি"}
              {rating === 3 && "ভালো"}
              {rating === 4 && "খুব ভালো"}
              {rating === 5 && "চমৎকার"}
            </p>
          )}
        </div>

        {/* মন্তব্য */}
        <div className="space-y-2">
          <label className="text-sm font-medium">মন্তব্য (ঐচ্ছিক)</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="আপনার অভিজ্ঞতা অন্যদের সাথে শেয়ার করুন..."
            rows={4}
            className="resize-none"
          />
        </div>

        {/* অ্যাকশন বাটন */}
        <div className={`flex gap-3 ${isMobile ? "flex-col" : ""}`}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className={`${isMobile ? "order-2" : ""}`}
          >
            বাতিল
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            className={`${isMobile ? "order-1" : ""}`}
          >
            <Send className="w-4 h-4 mr-2" />
            রিভিউ জমা দিন
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default ReviewForm;
