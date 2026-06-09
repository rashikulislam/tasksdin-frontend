// components/common/StatusState.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Clock, XCircle, AlertCircle } from "lucide-react";
import { LucideIcon } from "lucide-react"; // for type

interface StatusStateProps {
  type?: "empty" | "error" | "notFound"; // type of state
  message?: string; // main message
  description?: string; // optional description
  icon?: LucideIcon; // optional custom icon
}

export function ManageStatusState({
  type = "empty",
  message,
  description,
  icon: Icon,
}: StatusStateProps) {
  // Default icons based on type
  let DefaultIcon: LucideIcon;
  if (Icon) DefaultIcon = Icon;
  else if (type === "empty") DefaultIcon = Clock;
  else if (type === "error") DefaultIcon = XCircle;
  else DefaultIcon = AlertCircle;

  // Set color based on type
  let iconColor = "";
  if (type === "empty")
    iconColor = "text-gray-400"; // muted gray
  else if (type === "error")
    iconColor = "text-red-500"; // error red
  else iconColor = "text-yellow-500"; // warning yellow for notFound

  const defaultMessage =
    message ||
    (type === "empty"
      ? "Nothing here yet"
      : type === "error"
        ? "Something went wrong"
        : "Not found");

  const defaultDescription =
    description ||
    (type === "empty"
      ? "There is no data to show at the moment."
      : type === "error"
        ? "Please try again later or refresh the page."
        : "The requested resource could not be found.");

  return (
    <Card className="text-center py-12 mt-16">
      <CardContent>
        <div className="space-y-2">
          <DefaultIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
          <p className="text-lg font-semibold">{defaultMessage}</p>
          <p className="text-muted-foreground">{defaultDescription}</p>
        </div>
        {type === "error" && (
          <button
            onClick={() => window.location.reload()}
            className="mt-3 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
          >
            আবার চেষ্টা করুন
          </button>
        )}
      </CardContent>
    </Card>
  );
}
