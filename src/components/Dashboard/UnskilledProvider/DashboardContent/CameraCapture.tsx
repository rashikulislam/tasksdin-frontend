"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as faceapi from "face-api.js";
import { useVerificationInfoStore, VerificationState } from "@/zustand/slice";
import modifyVerificationData from "@/utils/modifyVerificationData";
import { useApplyVerificationMutation } from "@/redux/features/verification.fearture";

export const CameraCapturePage = () => {
  const { data } = useVerificationInfoStore();
  const [mutateAsync, { isLoading }] = useApplyVerificationMutation();
  const webcamRef = useRef<Webcam>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [blinkCount, setBlinkCount] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const MAX_BLINKS = 3;
  const EAR_THRESHOLD = 0.22; // Slightly lowered for better accuracy
  const blinkRef = useRef(0);

  // 1. Load Models Correctly
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {}
    };
    loadModels();
  }, []);

  // 2. Capture Photo Logic
  const capturePhoto = useCallback(() => {
    if (!webcamRef.current || isCapturing) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setIsCapturing(true);
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "face.jpg", { type: "image/jpeg" });
        setCapturedFile(file);
        setPreview(URL.createObjectURL(file));
        setIsCapturing(false);
      });
  }, [isCapturing]);

  // 3. Blink Detection Logic
  const detectBlink = useCallback(async () => {
    if (!webcamRef.current || !modelsLoaded || capturedFile || isCapturing)
      return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) return;

    // Use TinyFaceDetector specifically
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true); // true here uses the Tiny Landmarks loaded earlier

    if (detection) {
      const leftEye = detection.landmarks.getLeftEye();
      const rightEye = detection.landmarks.getRightEye();

      const getEAR = (eye: faceapi.Point[]) => {
        const A = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
        const B = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
        const C = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
        return (A + B) / (2.0 * C);
      };

      const avgEAR = (getEAR(leftEye) + getEAR(rightEye)) / 2;

      if (avgEAR < EAR_THRESHOLD) {
        blinkRef.current += 1;
      } else {
        if (blinkRef.current >= 1) {
          setBlinkCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= MAX_BLINKS) {
              setTimeout(capturePhoto, 100); // Small delay to allow eye to reopen
              return 0;
            }
            return newCount;
          });
        }
        blinkRef.current = 0;
      }
    }
  }, [modelsLoaded, capturedFile, isCapturing, capturePhoto]);

  useEffect(() => {
    const interval = setInterval(detectBlink, 100);
    return () => clearInterval(interval);
  }, [detectBlink]);

  const handleRetake = () => {
    setCapturedFile(null);
    setPreview("");
    setBlinkCount(0);
  };

  const borderPercent = (blinkCount / MAX_BLINKS) * 100;

  const handleSubmit = async () => {
    data.live_image = capturedFile;
    const formData = modifyVerificationData(data as VerificationState);
    try {
      const result = await mutateAsync(formData);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      {/* Instructions */}
      <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border border-pink-100 mb-8">
        <h2 className="text-pink-600 font-bold mb-2">ছবি তোলার নিয়মাবলী:</h2>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>সরাসরি ক্যামেরার দিকে তাকান।</li>
          <li>চশমা থাকলে খুলে ফেলুন বা স্বচ্ছ চশমা পরুন।</li>
          <li>পেছনের ব্যাকগ্রাউন্ড পরিষ্কার রাখুন।</li>
          <li className="font-semibold text-blue-600">
            ৩ বার চোখ মিটমিট করলে অটোমেটিক ছবি উঠবে।
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Camera/Preview Circle */}
        <div
          className="relative w-72 h-72 rounded-full overflow-hidden transition-all duration-300"
          style={{
            background: `conic-gradient(rgb(59, 130, 246) ${
              borderPercent * 3.6
            }deg, transparent 0deg)`,
            padding: "8px",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            {!preview ? (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 720,
                  height: 720,
                  facingMode: "user",
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={preview}
                  alt="Captured"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>

        {/* Status & Controls */}
        {!preview ? (
          <div className="text-center">
            <div className="bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-4">
              Blinks: {blinkCount} / {MAX_BLINKS}
            </div>
            {/* <Button
              onClick={capturePhoto}
              disabled={!modelsLoaded}
              className="rounded-full px-8"
            >
              <Camera className="mr-2 h-4 w-4" /> Manual Capture
            </Button> */}
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="rounded-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Retake
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-green-600 hover:bg-green-700 px-8"
            >
              Submit Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
