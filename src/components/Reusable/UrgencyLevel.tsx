import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, Control } from "react-hook-form";

const urgencyOptions = [
  { value: "low", label: "কম জরুরি" },
  { value: "medium", label: "মাঝারি জরুরি" },
  { value: "high", label: "খুব জরুরি" },
];

type Props = {
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export default function UrgencyLevel({ isMobile, control }: Props) {
  return (
    <div className="space-y-3">
      <Label
        className={`flex items-center gap-1 ${
          isMobile ? "text-base font-semibold" : "text-sm font-medium"
        }`}
      >
        জরুরিতার মাত্রা
      </Label>

      <Controller
        name="urgency_level"
        control={control}
        render={({ field }) => (
          <div
            className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}
          >
            {urgencyOptions.map((item) => (
              <Button
                key={item.value}
                type="button"
                variant={field.value === item.value ? "destructive" : "outline"}
                onClick={() => field.onChange(item.value)}
                className="h-10 lg:12 rounded-lg"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
