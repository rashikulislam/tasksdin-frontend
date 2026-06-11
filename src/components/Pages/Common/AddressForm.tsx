"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { showToast } from "@/components/Reusable/CustomToast";
import { useSaveAddressMutation } from "@/redux/features/auth.features";
import { addressSchemaEn } from "@/validations";
import { TSetPage } from "@/interfaces";
import { z } from "zod";

type AddressFormData = z.infer<typeof addressSchemaEn>;

interface AddressFormProps extends TSetPage {
  dashboardPath: string;
}

const AddressForm = ({ pages, steps, dashboardPath }: AddressFormProps) => {
  const [saveAddress, { isLoading }] = useSaveAddressMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchemaEn),
    defaultValues: { address: "", referral_code: "" },
  });

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    try {
      const result = await saveAddress({
        address: data.address,
        referral_code: data.referral_code?.trim() ? data.referral_code.trim() : undefined,
      }).unwrap();
      if (result?.success) {
        showToast({
          type: "success",
          title: "Setup complete!",
          description: "Your profile has been saved. Welcome to Tasks Din.",
        });
        router.push(dashboardPath);
      } else {
        showToast({ type: "error", description: result?.message });
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showToast({
        type: "error",
        description: err?.data?.message ?? "Failed to save your profile. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col py-5 min-h-screen">
      <div className="container mx-auto">
        <Card className="w-full max-w-md mx-auto rounded-2xl border-2 border-gray-300 dark:border-gray-800 dark:bg-black shadow-2xl bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Step {pages}/{steps}
              </span>
            </div>

            <CardTitle className="text-[24px] font-bold text-center flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 text-center">
              Enter your address so we can connect you with nearby services.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="referral_code">Referral Code (optional)</Label>
                <Input
                  id="referral_code"
                  placeholder="Enter referral code if you have one"
                  {...register("referral_code")}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddressForm;
