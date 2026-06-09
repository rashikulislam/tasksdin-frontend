import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PostTaskButtonProps {
  onClick?: () => void;
}

export const PostTaskButton = ({ onClick }: PostTaskButtonProps) => {
  return (
    <Button
      variant="default"
      size="sm"
      onClick={onClick}
      className="bg-[#3c83f6] hover:bg-[#0062ff]"
    >
      <Plus className="w-4 h-4 mr-2" />
      Post Task
    </Button>
  );
};
