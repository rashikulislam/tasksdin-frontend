"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Camera, CheckCircle, X, Loader2, Smile, ArrowLeftRight } from "lucide-react";
import Image from "next/image";

type UIState =
  | "loading"
  | "no_face"
  | "ready"
  | "head_turning"
  | "smile_hold"
  | "capturing"
  | "done";

const STATUS: Record<UIState, { msg: string; color: string }> = {
  loading:      { msg: "Loading face detection…",                    color: "text-blue-400"   },
  no_face:      { msg: "Position your face inside the oval",         color: "text-yellow-400" },
  ready:        { msg: "Smile 😊  or  slowly turn head left ↔ right", color: "text-white"     },
  head_turning: { msg: "Keep moving… almost there!",                 color: "text-blue-300"   },
  smile_hold:   { msg: "Great smile! Capturing…",                    color: "text-green-400"  },
  capturing:    { msg: "Capturing photo…",                           color: "text-green-400"  },
  done:         { msg: "Photo captured successfully!",               color: "text-green-400"  },
};

function ovalClass(s: UIState): string {
  if (s === "done" || s === "smile_hold" || s === "capturing")
    return "border-green-400 shadow-[0_0_28px_rgba(74,222,128,0.55)]";
  if (s === "head_turning")
    return "border-blue-400 shadow-[0_0_28px_rgba(96,165,250,0.55)]";
  if (s === "no_face") return "border-yellow-400";
  return "border-white/70";
}

interface LiveSelfieCaptureProps {
  onCapture: (file: File) => void;
  preview: string | null;
}

export const LiveSelfieCapture = ({ onCapture, preview }: LiveSelfieCaptureProps) => {
  const [isOpen, setIsOpen]   = useState(false);
  const [uiState, setUiState] = useState<UIState>("loading");

  const webcamRef  = useRef<Webcam>(null);
  const rafRef     = useRef<number>(0);
  const capRef     = useRef(false);
  const smileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track nose x-offset range within a 3-second window to detect head turn
  const headMov    = useRef({ min: 0, max: 0, ts: 0 });

  // ── Capture ──────────────────────────────────────────────────────────────
  const doCapture = useCallback(() => {
    if (capRef.current) return;
    capRef.current = true;
    cancelAnimationFrame(rafRef.current);
    if (smileTimer.current) { clearTimeout(smileTimer.current); smileTimer.current = null; }
    setUiState("capturing");

    const video = webcamRef.current?.video;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror the draw to match the mirrored preview the user saw
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onCapture(new File([blob], "live_selfie.jpg", { type: "image/jpeg" }));
        setUiState("done");
        setTimeout(() => setIsOpen(false), 1400);
      },
      "image/jpeg",
      0.92,
    );
  }, [onCapture]);

  // ── Main effect: load models → run detection loop ─────────────────────────
  useEffect(() => {
    if (!isOpen) {
      // Reset on close
      capRef.current   = false;
      headMov.current  = { min: 0, max: 0, ts: 0 };
      if (smileTimer.current) { clearTimeout(smileTimer.current); smileTimer.current = null; }
      setUiState("loading");
      return;
    }

    let active    = true;
    let detecting = false;

    const loop = async () => {
      if (!active || capRef.current || detecting) {
        if (active && !capRef.current) rafRef.current = requestAnimationFrame(loop);
        return;
      }
      detecting = true;

      const video = webcamRef.current?.video;
      if (!video || video.readyState < 2) {
        detecting = false;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      try {
        const det = await faceapi
          .detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }),
          )
          .withFaceLandmarks(true)   // tiny 68-point model
          .withFaceExpressions();

        if (!active || capRef.current) { detecting = false; return; }

        if (!det) {
          setUiState("no_face");
          headMov.current = { min: 0, max: 0, ts: 0 };
          if (smileTimer.current) { clearTimeout(smileTimer.current); smileTimer.current = null; }
        } else {
          // ── Head-turn detection via nose-tip x-offset ──
          const box    = det.detection.box;
          const nose   = det.landmarks.positions[30]; // landmark 30 = nose tip (68-pt model)
          const offset = (nose.x - (box.x + box.width / 2)) / box.width;
          const now    = Date.now();

          // Reset tracking window after 3 s of inactivity
          if (now - headMov.current.ts > 3000) {
            headMov.current = { min: offset, max: offset, ts: now };
          } else {
            headMov.current.min = Math.min(headMov.current.min, offset);
            headMov.current.max = Math.max(headMov.current.max, offset);
            headMov.current.ts  = now;
          }

          const headRange = headMov.current.max - headMov.current.min;

          // Sufficient head movement → capture
          if (headRange > 0.26) {
            detecting = false;
            doCapture();
            return;
          }

          // ── Smile detection ──
          const happy = det.expressions.happy ?? 0;
          if (happy > 0.85) {
            if (!smileTimer.current) {
              setUiState("smile_hold");
              smileTimer.current = setTimeout(() => {
                smileTimer.current = null;
                doCapture();
              }, 600);
            }
          } else {
            if (smileTimer.current) { clearTimeout(smileTimer.current); smileTimer.current = null; }
            // Progress feedback for partial head movement
            if (headRange > 0.10) setUiState("head_turning");
            else setUiState("ready");
          }
        }
      } catch {
        // Ignore individual detection errors; keep looping
      }

      detecting = false;
      if (active && !capRef.current) rafRef.current = requestAnimationFrame(loop);
    };

    // Load models (no-op if already cached), then start loop
    const { tinyFaceDetector, faceLandmark68TinyNet, faceExpressionNet } = faceapi.nets;
    Promise.all([
      tinyFaceDetector.isLoaded      ? Promise.resolve() : tinyFaceDetector.loadFromUri("/models"),
      faceLandmark68TinyNet.isLoaded ? Promise.resolve() : faceLandmark68TinyNet.loadFromUri("/models"),
      faceExpressionNet.isLoaded     ? Promise.resolve() : faceExpressionNet.loadFromUri("/models"),
    ])
      .then(() => {
        if (!active) return;
        setUiState("no_face");
        rafRef.current = requestAnimationFrame(loop);
      })
      .catch(console.error);

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, doCapture]);

  const { msg, color } = STATUS[uiState];

  return (
    <>
      {/* ── Trigger / preview box ── */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-36 flex flex-col items-center justify-center overflow-hidden relative hover:border-blue-400 transition-colors"
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Live selfie"
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <span className="text-white text-xs font-medium">Retake photo</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Camera className="h-8 w-8" />
            <span className="text-xs text-center px-2">Click to take live selfie</span>
          </div>
        )}
      </div>

      {/* ── Full-screen camera modal ── */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
          {/* Live webcam feed — mirrored so it feels like a mirror */}
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            mirrored
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Oval face guide */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingBottom: 100 }}
          >
            <div
              className={`border-4 rounded-full transition-all duration-300 ${ovalClass(uiState)}`}
              style={{ width: 200, height: 260 }}
            />
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 z-10 bg-black/50 rounded-full p-2.5 text-white hover:bg-black/70 transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Status bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-6 py-5 flex flex-col items-center gap-1.5">
            <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
              {uiState === "loading" || uiState === "capturing" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : uiState === "done" ? (
                <CheckCircle className="h-4 w-4" />
              ) : uiState === "head_turning" ? (
                <ArrowLeftRight className="h-4 w-4" />
              ) : (
                <Smile className="h-4 w-4" />
              )}
              <span>{msg}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Photo is captured automatically — no manual upload
            </p>
          </div>
        </div>
      )}
    </>
  );
};
