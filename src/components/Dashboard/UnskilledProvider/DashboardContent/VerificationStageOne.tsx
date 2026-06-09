"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { DocumentCaptureBox } from "@/components/Reusable/DocumentCaptureBox";
import { useVerificationInfoStore } from "@/zustand/slice";

interface VerificationStageOneProps {
  onBack: () => void;
  setVerificationStage: Dispatch<SetStateAction<number>>;
}

const VerificationStageOne = ({
  onBack,
  setVerificationStage,
}: VerificationStageOneProps) => {
  const { setData } = useVerificationInfoStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idType, setIdType] = useState<"nid" | "passport" | "">("");
  const [formData, setFormData] = useState({
    nid_image_number: "" as string,
    passport_number: "" as string,
    verified_by: "" as string,
    nid_image_front: null as File | null,
    nid_image_backend: null as File | null,
    passport_img: null as File | null,
    live_image: null as File | null,
  });

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nid_image_number: value }));
  };
  const handlePassportNumberChange = (value: string) => {
    setFormData((prev) => ({ ...prev, passport_number: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleReset = () => {
    setFormData({
      nid_image_number: "",
      passport_number: "",
      verified_by: "",
      nid_image_front: null as File | null,
      nid_image_backend: null as File | null,
      passport_img: null as File | null,
      live_image: null as File | null,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      formData.verified_by = idType;
      setData(formData);
      setVerificationStage(2);
      setIsLoading(false);
    }, 3000);
  };

  const disableButton =
    !formData.nid_image_backend ||
    !formData.nid_image_number ||
    !formData.nid_image_front;
  const disableButton2 = !formData.passport_img || !formData.passport_number;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
          </div>
          <CardTitle className="text-2xl font-bold">পরিচয় যাচাই</CardTitle>
          <CardDescription>
            আপনার জাতীয় পরিচয়পত্র বা পাসপোর্ট নির্বাচন করুন
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* ID Type Selection Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant={idType === "nid" ? "default" : "outline"}
                onClick={() => {
                  setIdType("nid");
                  handleReset();
                }}
                className="flex-1 h-20"
              >
                <div className="text-center">
                  <p className="font-semibold">NID</p>
                  <p className="text-xs opacity-80">জাতীয় পরিচয়পত্র</p>
                </div>
              </Button>
              <Button
                type="button"
                variant={idType === "passport" ? "default" : "outline"}
                onClick={() => {
                  setIdType("passport");
                  handleReset();
                }}
                className="flex-1 h-20"
              >
                <div className="text-center">
                  <p className="font-semibold">Passport</p>
                  <p className="text-xs opacity-80">পাসপোর্ট</p>
                </div>
              </Button>
            </div>

            {/* NID Upload Section */}
            {idType === "nid" && (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <div className="space-y-2">
                  <Label htmlFor="nid_image_number">NID নম্বর</Label>
                  <Input
                    id="nid_image_number"
                    value={formData.nid_image_number}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="আপনার জাতীয় পরিচয়পত্র নম্বর লিখুন"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <DocumentCaptureBox
                    label="NID সামনের অংশ"
                    file={formData.nid_image_front}
                    onFileChange={(file) =>
                      handleFileUpload("nid_image_front", file)
                    }
                  />
                  <DocumentCaptureBox
                    label="NID পিছনের অংশ"
                    file={formData.nid_image_backend}
                    onFileChange={(file) =>
                      handleFileUpload("nid_image_backend", file)
                    }
                  />
                </div>
              </div>
            )}

            {/* Passport Upload Section */}
            {idType === "passport" && (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <div className="space-y-2">
                  <Label htmlFor="passport_number">পাসপোর্ট নম্বর</Label>
                  <Input
                    id="passport_number"
                    value={formData.passport_number}
                    onChange={(e) => handlePassportNumberChange(e.target.value)}
                    placeholder="আপনার পাসপোর্ট নম্বর লিখুন"
                    required
                  />
                </div>

                <DocumentCaptureBox
                  label="পাসপোর্ট আপলোড করুন"
                  file={formData.nid_image_backend}
                  onFileChange={(file) =>
                    handleFileUpload("passport_img", file)
                  }
                />
              </div>
            )}

            {idType && (
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full disabled:bg-gray-600 disabled:cursor-default"
                disabled={isLoading || (disableButton && disableButton2)}
              >
                ভেরিফিকেশন জমা দিন
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationStageOne;
