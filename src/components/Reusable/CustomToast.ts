import { toast } from "sonner";

type ToastType = "success" | "error";

interface IToastOptions {
  type: ToastType;
  title?: string;
  description?: string;
}

export const showToast = ({ type, title, description }: IToastOptions) => {
  const options = {
    description,
  };

  if (type === "success") {
    toast.success(title, options);
  } else if (type === "error") {
    toast.error(title, options);
  }
};
