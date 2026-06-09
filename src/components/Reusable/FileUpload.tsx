"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  id: string;
  label: string;
  file: File | null;
  accept?: string;
  onFileChange: (file: File | null) => void;
  width?: number; // optional width for Image preview
  height?: number; // optional height for Image preview
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  file,
  accept = "image/*",
  onFileChange,
  height = 200,
}) => {
  const [preview, setPreview] = useState<string>("");

  // Generate preview URL when file changes
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(selectedFile);
  };

  const handleRemove = () => onFileChange(null);

  return (
    <div
      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 relative w-full max-w-md mx-auto hover:border-primary/50 transition-colors flex flex-col items-center justify-center"
      style={{ height }}
    >
      {/* Image Preview */}
      {preview ? (
        <div className="relative w-full h-full rounded overflow-hidden mb-3">
          <Image
            src={preview}
            alt="Uploaded Preview"
            fill
            className="object-cover"
            unoptimized
          />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mb-3">
          <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">{label}</p>
        </div>
      )}

      {/* File Input with camera capture */}
      <input
        type="file"
        accept={accept}
        id={id}
        className="hidden"
        onChange={handleChange}
        capture="environment"
      />

      {/* Upload / Change Button INSIDE the box */}
      <Label htmlFor={id} className="cursor-pointer block text-center w-full">
        <Button variant="outline" size="sm" type="button" asChild>
          <span>{preview ? "রি আপলোড করুন" : "আপলোড করুন"}</span>
        </Button>
      </Label>
    </div>
  );
};
