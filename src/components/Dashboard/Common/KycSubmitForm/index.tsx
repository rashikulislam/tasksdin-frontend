"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showToast } from "@/components/Reusable/CustomToast";
import { useSubmitKycMutation, useGetKycStatusQuery } from "@/redux/features/kyc.feature";
import { LiveSelfieCapture } from "./LiveSelfieCapture";

type DocType = "NID" | "PASSPORT";
type FileField = "nid_front" | "nid_back" | "passport_img" | "live_image";

interface KycSubmitFormProps {
  dashboardPath: string;
}

const FileUploadBox = ({
  label,
  field,
  preview,
  onChange,
  required,
}: {
  label: string;
  field: FileField;
  preview: string | null;
  onChange: (field: FileField) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-36 flex flex-col items-center justify-center overflow-hidden relative hover:border-blue-400 transition-colors"
      >
        {preview ? (
          <Image
            src={preview}
            alt={label}
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <UploadCloud className="h-8 w-8" />
            <span className="text-xs text-center px-2">Click to upload image</span>
          </div>
        )}
        {preview && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-medium">Change photo</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange(field)}
      />
    </div>
  );
};

const KycSubmitForm = ({ dashboardPath }: KycSubmitFormProps) => {
  const router = useRouter();
  const [submitKyc, { isLoading }] = useSubmitKycMutation();
  const { data: statusData } = useGetKycStatusQuery(undefined);

  const [docType, setDocType] = useState<DocType>("NID");
  const [nidNumber, setNidNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [files, setFiles] = useState<Partial<Record<FileField, File>>>({});
  const [previews, setPreviews] = useState<Partial<Record<FileField, string>>>({});

  const existingStatus = statusData?.data?.kyc?.status ?? null;
  const isApproved = statusData?.data?.is_kyc_verified ?? false;

  const handleFileChange = (field: FileField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [field]: file }));
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [field]: url }));
  };

  const handleLiveCapture = (file: File) => {
    setFiles((prev) => ({ ...prev, live_image: file }));
    setPreviews((prev) => ({ ...prev, live_image: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!files.live_image) {
      showToast({ type: "error", title: "Missing selfie", description: "A live selfie photo is required." });
      return;
    }
    if (docType === "NID") {
      if (!nidNumber.trim()) {
        showToast({ type: "error", title: "Missing NID number", description: "Please enter your NID number." });
        return;
      }
      if (!files.nid_front || !files.nid_back) {
        showToast({ type: "error", title: "Missing NID images", description: "Both front and back NID photos are required." });
        return;
      }
    } else {
      if (!passportNumber.trim()) {
        showToast({ type: "error", title: "Missing passport number", description: "Please enter your passport number." });
        return;
      }
      if (!files.passport_img) {
        showToast({ type: "error", title: "Missing passport image", description: "Please upload your passport photo." });
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("doc_type", docType);

      if (docType === "NID") {
        formData.append("nid_number", nidNumber.trim());
        formData.append("nid_front", files.nid_front!);
        formData.append("nid_back", files.nid_back!);
      } else {
        formData.append("passport_number", passportNumber.trim());
        formData.append("passport_img", files.passport_img!);
      }
      formData.append("live_image", files.live_image!);

      await submitKyc(formData).unwrap();
      showToast({
        type: "success",
        title: "KYC Submitted",
        description: "Our team will review your documents within 24–48 hours.",
      });
      router.push(dashboardPath);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showToast({
        type: "error",
        title: "Submission failed",
        description: err?.data?.message ?? "Please check your documents and try again.",
      });
    }
  };

  // Approved state
  if (isApproved) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-xl font-semibold">Identity Verified</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Your identity has been verified. You have full access to all platform features.
        </p>
        <Button variant="outline" onClick={() => router.push(dashboardPath)}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Pending state — no resubmission allowed
  if (existingStatus === "PENDING") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold">Under Review</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Your KYC documents have been submitted and are currently under review. We will notify you within 24–48 hours.
        </p>
        <Button variant="outline" onClick={() => router.push(dashboardPath)}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Identity Verification (KYC)</CardTitle>
        <CardDescription>
          {existingStatus === "REJECTED" || existingStatus === "HOLD"
            ? "Please resubmit your identity documents."
            : "Submit your identity documents to unlock all platform features."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Doc type selector */}
          <div className="flex flex-col gap-2">
            <Label>Document Type <span className="text-red-500">*</span></Label>
            <div className="flex gap-3">
              {(["NID", "PASSPORT"] as DocType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDocType(type)}
                  className={`flex-1 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors ${
                    docType === type
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400"
                  }`}
                >
                  {type === "NID" ? "National ID (NID)" : "Passport"}
                </button>
              ))}
            </div>
          </div>

          {/* NID fields */}
          {docType === "NID" && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="nid_number">
                  NID Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nid_number"
                  placeholder="Enter your 10 or 17 digit NID number"
                  value={nidNumber}
                  onChange={(e) => setNidNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FileUploadBox
                  label="NID Front"
                  field="nid_front"
                  preview={previews.nid_front ?? null}
                  onChange={handleFileChange}
                  required
                />
                <FileUploadBox
                  label="NID Back"
                  field="nid_back"
                  preview={previews.nid_back ?? null}
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}

          {/* Passport fields */}
          {docType === "PASSPORT" && (
            <>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="passport_number">
                  Passport Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passport_number"
                  placeholder="e.g. AB1234567"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                />
              </div>

              <FileUploadBox
                label="Passport Photo Page"
                field="passport_img"
                preview={previews.passport_img ?? null}
                onChange={handleFileChange}
                required
              />
            </>
          )}

          {/* Live selfie — always required, camera-only (no manual upload) */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Camera className="h-4 w-4" />
              Live Selfie Photo <span className="text-red-500">*</span>
            </Label>
            <p className="text-xs text-muted-foreground -mt-1">
              Your photo is captured live — smile or turn your head to trigger it.
            </p>
            <LiveSelfieCapture
              onCapture={handleLiveCapture}
              preview={previews.live_image ?? null}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading…
              </>
            ) : (
              "Submit KYC"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default KycSubmitForm;
