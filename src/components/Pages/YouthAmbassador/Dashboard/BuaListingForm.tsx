"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";
import CustomInput from "@/components/Reusable/CustomInput";
import CustomTextArea from "@/components/Reusable/CustomTextArea";
import { FileUpload } from "@/components/Reusable/FileUpload";
import CustomModal from "@/components/Reusable/CustomModal";
import GoogleMapPicker from "./GoogleMapPicker";
import { toast } from "sonner";
import { useCreateHomeMaidMutation } from "@/redux/features/agent.feature";
import { useAlert } from "@/components/Reusable/AlertModal";
import { CustomDropdown } from "@/components/Reusable/CustomDropdown";

type TBua = {
  name: string;
  phone_number: string;
  nid: string;
  skills: string[];
  description: string;
  lat: number;
  lng: number;
  address_details: string;
  salary_expectation: number;
  working_hours: string;
  work_time: string;
  gender: string;
};
type TLatLng = { lat: number; lng: number };
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const skillOptions = [
  "রান্না",
  "পরিষ্কার-পরিচ্ছন্নতা",
  "কাপড় ধোয়া",
  "শিশু যত্ন",
  "বয়স্ক সেবা",
];

export default function BuaListingForm({ onClose, isOpen }: Props) {
  const profileRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [nidFrontPhoto, setNidFrontPhoto] = useState<File | null>(null);
  const [nidBackPhoto, setNidBackPhoto] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [location, setLocation] = useState<TLatLng | null>(null);
  const [mutateAsync, { isLoading }] = useCreateHomeMaidMutation();
  const { showAlert } = useAlert();
  const topRef = useRef<HTMLDivElement | null>(null);

  // IF ERROR THEN SCROLL TOP
  useEffect(() => {
    if (errorMsg) {
      topRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [errorMsg]);

  // RENDER PROFILE IMAGE
  useEffect(() => {
    if (!profilePhoto) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(profilePhoto);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePhoto]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TBua>();

  const toggleSkill = (skill: string) => {
    setSkills((prev) => {
      const updated = prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill];
      setValue("skills", updated);
      return updated;
    });
  };

  const onSubmit = async (data: TBua) => {
    if (!profilePhoto) {
      toast.warning("Profile picture den");
      return;
    }
    if (!nidFrontPhoto || !nidBackPhoto) {
      toast.warning("NID এর দুই পাশের ছবি দিন");
      return;
    }
    data.lat = location?.lat as number;
    data.lng = location?.lng as number;
    data.salary_expectation = Number(data.salary_expectation);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("nid_front", nidFrontPhoto);
    formData.append("nid_back", nidBackPhoto);
    formData.append("profile_img", profilePhoto);
    setErrorMsg("");
    try {
      const result = await mutateAsync(formData).unwrap();

      if (result?.success) {
        onClose();
        showAlert({ title: result?.message, type: "success" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMsg(error?.data?.message || "Something went wrong server.");
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width="xl"
      title=" বুয়া তালিকাভুক্ত করুন"
    >
      <Card className="w-full" ref={topRef}>
        <CardContent className="p-3 space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <input
              ref={profileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProfilePhoto(file);
              }}
            />

            <div
              onClick={() => profileRef.current?.click()}
              className="w-32 h-32 relative rounded-full border-2 border-dashed
                         flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {preview ? (
                <>
                  <Image
                    src={preview}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Camera className="text-white" />
                  </div>
                </>
              ) : (
                <Upload />
              )}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {errorMsg && (
              <p className="text-center text-red-600 font-medium py-2">
                {errorMsg}
              </p>
            )}
            <CustomInput
              label="বুয়ার নাম"
              name="name"
              register={register}
              error={errors.name}
              placeholder="সম্পূর্ণ নাম লিখুন"
              required
              errorMessage="বুয়ার নাম অবশ্যই দিতে হবে"
            />

            <CustomDropdown
              control={control}
              label="লিঙ্গ"
              name="gender"
              options={[
                { label: "পুরুষ", value: "MALE" },
                { label: "নারী", value: "FEMALE" },
                { label: "অন্যান্য", value: "OTHER" },
              ]}
              error={errors.gender}
              errorMessage="লিঙ্গ নির্বাচন করুন"
              placeholder="লিঙ্গ নির্বাচন করুন"
            />

            <CustomInput
              label="ফোন নম্বর"
              name="phone_number"
              register={register}
              error={errors.phone_number}
              placeholder="01XXXXXXXXX"
              required
              errorMessage="ফোন নম্বর অবশ্যই দিতে হবে"
            />

            <CustomInput
              label="NID নম্বর"
              name="nid"
              register={register}
              error={errors.nid}
              placeholder="NID নম্বর লিখুন"
              required
              errorMessage="NID নম্বর অবশ্যই দিতে হবে"
            />

            <CustomInput
              label="কাজের সময় (ঘণ্টা)"
              name="work_time"
              type="number"
              register={register}
              error={errors.work_time}
              placeholder="যেমন: ২"
              required
              errorMessage="কাজের সময় (ঘণ্টা) অবশ্যই দিতে হবে"
            />

            <CustomInput
              label="কাজের সময়"
              name="working_hours"
              register={register}
              error={errors.working_hours}
              placeholder="যেমন: সকাল ৮টা - বিকাল ৫টা"
              required
              errorMessage="কাজের সময় অবশ্যই উল্লেখ করতে হবে"
            />

            <CustomInput
              label="বেতন প্রত্যাশা"
              name="salary_expectation"
              register={register}
              error={errors.salary_expectation}
              placeholder="যেমন: 5000"
              required
              errorMessage="বেতন প্রত্যাশা অবশ্যই দিতে হবে"
            />

            <div>
              <p className="text-sm font-medium mb-2">দক্ষতা</p>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    size="sm"
                    variant={skills.includes(skill) ? "default" : "outline"}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* NID Photos */}
            <div>
              <p className="text-sm font-medium mb-2">NID ছবি *</p>

              <div className="grid grid-cols-2 gap-4">
                <FileUpload
                  id="nid-front"
                  label="NID সামনের পাশ"
                  accept="image/*"
                  file={nidFrontPhoto}
                  onFileChange={(file) => {
                    setNidFrontPhoto(file);
                  }}
                />

                <FileUpload
                  id="nid-back"
                  label="NID পিছনের পাশ"
                  accept="image/*"
                  file={nidBackPhoto}
                  onFileChange={(file) => {
                    setNidBackPhoto(file);
                  }}
                />
              </div>
            </div>

            <CustomTextArea
              label="সংক্ষিপ্ত বিবরণ"
              name="description"
              register={register}
              error={errors.description}
              row={3}
              placeholder="বুয়া সম্পর্কে সংক্ষিপ্ত বিবরণ..."
              required
              errorMessage="সংক্ষিপ্ত বিবরণ অবশ্যই দিতে হবে"
            />

            <GoogleMapPicker setLocation={setLocation} />
            <CustomTextArea
              label="সম্পূর্ণ ঠিকানা"
              name="address_details"
              register={register}
              error={errors.address_details}
              row={2}
              required
              placeholder="বাসা, রোড, এলাকা"
              maxWords={50}
              errorMessage="ঠিকানা অবশ্যই দিতে হবে"
            />

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              তালিকাভুক্ত করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </CustomModal>
  );
}
