"use client";

// import LocalTaskOfferSlider from "./LocalTaskOfferSlider";
import HeroSection from "./HeroSection";
import PopularServices from "./PopularServices";

const LocalTasksContent = ({ openPostTask }: { openPostTask: () => void }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* <LocalTaskOfferSlider /> */}
      <HeroSection openPostTask={openPostTask} />
      <PopularServices />
    </div>
  );
};

export default LocalTasksContent;
