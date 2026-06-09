import BecomeProvider from "@/components/Pages/LocalWork/BecomeProvider";
import HowItWork from "@/components/Pages/LocalWork/HowItWork";
import LocalWorkBanner from "@/components/Pages/LocalWork/LocalWorkBanner";
import React from "react";

const LocalWork = () => {
  return (
    <div className="pt-[75px]">
      <LocalWorkBanner />
      <HowItWork />
      <BecomeProvider />
    </div>
  );
};

export default LocalWork;
