"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Camera, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DocumentCaptureBoxProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const DocumentCaptureBox: React.FC<DocumentCaptureBoxProps> = ({
  label,
  file,
  onFileChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // =========================
  // Capture ONLY frame area
  // =========================
  const capturePhoto = () => {
    if (!webcamRef.current || !frameRef.current) return;

    const video = webcamRef.current.video as HTMLVideoElement;
    const frame = frameRef.current;

    if (!video.videoWidth || !video.videoHeight) return;

    const videoRect = video.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();

    const scaleX = video.videoWidth / videoRect.width;
    const scaleY = video.videoHeight / videoRect.height;

    const sx = (frameRect.left - videoRect.left) * scaleX;
    const sy = (frameRect.top - videoRect.top) * scaleY;
    const sWidth = frameRect.width * scaleX;
    const sHeight = frameRect.height * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = sWidth;
    canvas.height = sHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], "document.jpg", {
          type: "image/jpeg",
        });

        onFileChange(file);
        setPreview(URL.createObjectURL(blob));
        setModalOpen(false);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <>
      {/* ================= Preview Box ================= */}
      <div>
        <div>
          <div
            onClick={() => setModalOpen(true)}
            className="relative w-full max-w-[360px] mx-auto aspect-[1.6/1]
                   border-2 border-dashed border-muted-foreground/30
                   rounded-lg flex items-center justify-center
                   cursor-pointer hover:border-primary/60
                   overflow-hidden"
          >
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Document"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </>
            ) : (
              <div className="text-center">
                <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            )}
          </div>
        </div>
        {preview && (
          <div className="flex justify-center gap-3 pt-2">
            {/* Re-capture */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-700 transition"
              title="Re-capture"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            {/* Remove */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreview("");
              }}
              className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-red-500 transition"
              title="Remove"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* ================= Camera Modal ================= */}
      {modalOpen && (
        <div
          style={{ marginTop: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
        >
          <div className="bg-white w-[90vw] max-w-md h-[100vh] overflow-hidden flex flex-col">
            {/* Camera + Frame */}
            <div className="relative flex-1 overflow-hidden">
              <Webcam
                ref={webcamRef}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Frame */}
              <div
                ref={frameRef}
                className="absolute top-1/2 left-1/2
                           -translate-x-1/2 -translate-y-1/2
                           w-[400px] h-[250px]
                           max-w-[90%]
                           border-2 border-white/90 rounded-md"
              />
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6 p-4 bg-black">
              <button
                className="rounded-full p-3 bg-red-600 text-white"
                onClick={() => setModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <button
                className="rounded-full p-3  bg-white"
                onClick={capturePhoto}
              >
                <Camera className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
