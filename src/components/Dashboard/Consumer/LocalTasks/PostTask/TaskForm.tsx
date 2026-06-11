"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetPostTaskCategoryQuery } from "@/redux/features/NonSkilledConsumer.feature";
import { useFindLocationQuery } from "@/redux/features/location.feature";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { CustomDateAndTimeSelector } from "@/components/Reusable/CustomDateAndTimeSelector";
import UrgencyLevel from "@/components/Reusable/UrgencyLevel";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { TUserLocation } from "@/interfaces/location";
import { MapPin, RefreshCw } from "lucide-react";
import GoogleMapModal from "@/components/Modal/GoogleMapModal";

interface Category {
  id: string;
  name: string;
}
interface TaskFormProps {
  isMobile: boolean;
  onClose: () => void;
}

export interface TaskData {
  task_title: string;
  description: string;
  category_id: string;
  budget: number;
  deadline: string;
  urgency_level: string;
  location_info: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  createdAt?: string;
  serviceData?: string;
}
export const TaskForm = ({ isMobile, onClose }: TaskFormProps) => {
  const router = useRouter();

  const { data: response, isLoading } = useGetPostTaskCategoryQuery(undefined);
  const categories = response?.data || [];

  const { data: locationData } = useFindLocationQuery(undefined);
  const locations = (locationData?.data as TUserLocation[]) || [];
  const defaultLocation = locations.find((l) => l.is_default === true);

  // Live Location state (GPS / map-picker based)
  const [liveLocationLabel, setLiveLocationLabel] = useState<string>("");
  const [liveCoords, setLiveCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskData>({ defaultValues: { category_id: "", task_title: "" } });
  const topRef = useRef<HTMLDivElement | null>(null);

  // Pre-populate location_info and Live Location from the header's active location on mount
  useEffect(() => {
    if (defaultLocation?.label) {
      setValue("location_info", defaultLocation.label);
      setLiveLocationLabel(defaultLocation.label);
      setLiveCoords({
        lat: defaultLocation.latitude,
        lng: defaultLocation.longitude,
      });
    }
  }, [defaultLocation?.label, defaultLocation?.latitude, defaultLocation?.longitude, setValue]);

  const options = categories.map((cat: Category) => {
    return { label: cat.name, value: cat.id };
  });

  const onSubmit = (payload: TaskData) => {
    payload.budget = Number(payload.budget);
    // Use live location coordinates for 1 km radius enforcement
    if (liveCoords) {
      payload.latitude = liveCoords.lat;
      payload.longitude = liveCoords.lng;
    } else if (defaultLocation) {
      payload.latitude = defaultLocation.latitude;
      payload.longitude = defaultLocation.longitude;
    }
    sessionStorage.setItem("pendingTaskData", JSON.stringify(payload));
    onClose();
    router.push("/dashboard/consumer/local-tasks/post-payment");
  };

  return (
    <Card
      className={isMobile ? "card-mobile border-0 shadow-card" : ""}
      ref={topRef}
    >
      <CardHeader className={isMobile ? "pb-4" : "pt-0"}>
        <CardTitle className={isMobile ? "text-lg" : ""}>
          আপনার কাজের বিবরণ দিন
        </CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "px-4" : ""}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CustomInput
            name="task_title"
            placeholder="যেমন: আমার বাসা পরিষ্কার করার জন্য একজন প্রয়োজন"
            register={register}
            type="text"
            error={errors.task_title!}
            label="কাজের শিরোনাম"
            required
            errorMessage={
              errors.task_title?.message || "অনুগ্রহ করে কাজের শিরোনাম লিখুন।"
            }
          />

          <CustomDropdown
            control={control}
            label="ক্যাটাগরি"
            name="category_id"
            options={isLoading ? [] : options || []}
            required
            placeholder="ক্যাটাগরি নির্বাচন করুন"
            error={errors.category_id}
            errorMessage={
              errors.category_id?.message ||
              "অনুগ্রহ করে একটি ক্যাটাগরি নির্বাচন করুন।"
            }
          />

          <CustomTextArea
            label="বিস্তারিত বিবরণ"
            required={true}
            name="description"
            placeholder="বিস্তারিত বিবরণ"
            register={register}
            error={errors.description}
            errorMessage={
              errors.description?.message ||
              "অনুগ্রহ করে বিস্তারিত বিবরণ লিখুন।"
            }
            row={3}
          />

          <CustomInput
            name="budget"
            placeholder="যেমন: ৳৫০০"
            register={register}
            type="text"
            error={errors.budget!}
            label="বাজেট"
            required
            errorMessage={errors.budget?.message || "অনুগ্রহ করে বাজেট লিখুন।"}
          />

          <CustomDateAndTimeSelector
            control={control}
            name="deadline"
            placeholder="তারিখ ও সময় নির্বাচন করুন"
            label="তারিখ ও সময়"
            rules={{ required: "দয়া করে একটি তারিখ এবং সময় নির্বাচন করুন" }}
            showTime
            required={true}
          />

          {/* Location — manual text entry for address details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                লোকেশন <span className="text-red-500">*</span>
              </span>
              {defaultLocation && (
                <button
                  type="button"
                  onClick={() => setValue("location_info", defaultLocation.label ?? "")}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                  title="হেডারের বর্তমান লোকেশন ব্যবহার করুন"
                >
                  <RefreshCw className="h-3 w-3" />
                  বর্তমান লোকেশন ব্যবহার করুন
                </button>
              )}
            </div>
            <CustomTextArea
              label=""
              name="location_info"
              placeholder="রোড, ফ্ল্যাট/বাড়ি নম্বর, ফ্লোর, এলাকা"
              register={register}
              error={errors.location_info}
              errorMessage="দয়া করে লোকেশনের বিস্তারিত লিখুন"
              required
              row={2}
            />
          </div>

          {/* Live Location — GPS coordinates used for 1 km radius matching */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">
              লাইভ লোকেশন{" "}
              <span className="text-red-500">*</span>
              <span className="text-xs font-normal text-muted-foreground ml-1">
                (নিকটবর্তী প্রোভাইডার খোঁজার জন্য)
              </span>
            </span>
            <div className="flex items-center gap-2 rounded-md border px-3 py-2.5 bg-muted/10">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="flex-1 text-sm text-muted-foreground truncate">
                {liveLocationLabel || "লোকেশন নির্বাচন করা হয়নি"}
              </span>
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="shrink-0 rounded p-1.5 hover:bg-muted text-primary border border-primary/30 hover:border-primary transition-colors"
                title="ম্যাপ থেকে লাইভ লোকেশন নির্বাচন করুন"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
            {!liveCoords && (
              <p className="text-xs text-amber-600">
                সঠিক প্রোভাইডার খুঁজতে লাইভ লোকেশন নির্বাচন করুন।
              </p>
            )}
          </div>

          <UrgencyLevel isMobile={isMobile} control={control} />

          <div className="space-y-4">
            <Button
              type="submit"
              className={`w-full ${isMobile ? "btn-mobile-primary" : ""}`}
              size="lg"
            >
              কাজ পোস্ট করুন
            </Button>
            <p className="text-center text-muted-foreground text-sm">
              পেমেন্ট নিশ্চিত হওয়ার পর আপনার কাজটি লাইভ হবে
            </p>
          </div>
        </form>
      </CardContent>

      {/* GoogleMapModal for Live Location selection */}
      {isMapOpen && (
        <GoogleMapModal
          isOpen={isMapOpen}
          isLoading={false}
          onClose={() => setIsMapOpen(false)}
          onConfirm={(address, position) => {
            const label = address.houseNo
              ? `${address.houseNo}, ${address.formattedAddress}`
              : address.formattedAddress;
            setLiveLocationLabel(label);
            setLiveCoords({ lat: position.lat, lng: position.lng });
            setIsMapOpen(false);
          }}
        />
      )}
    </Card>
  );
};
