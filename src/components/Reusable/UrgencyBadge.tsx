export type UrgencyType = "low" | "medium" | "high";

interface UrgencyInfo {
  label: string;
  color: string;
}

export function getUrgencyLabel(urgency?: string) {
  switch (urgency?.toLowerCase()) {
    case "low":
      return {
        label: "নিম্ন - ১ সপ্তাহের মধ্যে",
        color: "bg-green-500",
      };
    case "medium":
      return {
        label: "মধ্য - ৩ দিনের মধ্যে",
        color: "bg-pink-500",
      };
    case "high":
      return {
        label: "উচ্চ - ২৪ ঘন্টার মধ্যে",
        color: "bg-red-500",
      };
    default:
      break;
  }
}

interface UrgencyBadgeProps {
  level?: string; // low, medium, high
}

export const UrgencyBadge = ({ level }: UrgencyBadgeProps) => {
  if (!level) return null;

  const { label, color } = getUrgencyLabel(level) as UrgencyInfo;

  return (
    <div
      className={`text-white w-max px-2 py-0.5 rounded-full text- shadow-sm text-xs ${color}`}
    >
      {label}
    </div>
  );
};
