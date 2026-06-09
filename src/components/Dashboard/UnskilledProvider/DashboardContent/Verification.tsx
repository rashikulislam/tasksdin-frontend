"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import VerificationStageOne from "./VerificationStageOne";
import { CameraCapturePage } from "./CameraCapture";

const UnskilledProviderVerification = () => {
  const router = useRouter();
  const [verificationStage, setVerificationStage] = useState(1);

  const onBack = () => {
    console.log("Back button clicked!");
    router.back();
  };

  let content;

  switch (verificationStage) {
    case 1:
      content = (
        <VerificationStageOne
          onBack={onBack}
          setVerificationStage={setVerificationStage}
        />
      );
      break;
    case 2:
      content = <CameraCapturePage />;
      break;
    default:
      break;
  }
  return <div>{content}</div>;
};

export default UnskilledProviderVerification;
