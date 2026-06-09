'use client';

import { Construction, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Freelancer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 85 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center space-y-12 animate-fade-in">
          {/* Construction Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary to-blue-500 p-12 rounded-full shadow-[var(--shadow-soft)]">
                <Construction className="w-20 h-20 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-primary">
              Under Construction
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/80 font-light">
              আমরা কিছু অসাধারণ তৈরি করছি
            </p>
            <p className="text-lg text-muted-foreground">
              শীঘ্রই আসছে নতুন কিছু
            </p>
          </div>

          {/* Progress Section */}
          <div className="max-w-lg mx-auto space-y-4 pt-8">
            <div className="flex items-center justify-center gap-3 text-primary">
              <Wrench className="w-5 h-5 animate-pulse" strokeWidth={2} />
              <span className="text-lg font-medium">Progress: {progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer with Back to Home Link */}
          <div className="pt-12 text-muted-foreground space-y-4">
            <p className="text-sm">Thank you for your patience</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </>
  );
}