import HomeBanner from "@/components/Pages/Home/HomeBanner";
import OurServices from "@/components/Pages/Home/OurServices";
import ReadyToStart from "@/components/Pages/Home/ReadyToStart";

const HomePage = async () => {
  return (
    <div className="pt-[75px]">
      <HomeBanner />
      <OurServices />
      <ReadyToStart />
    </div>
  );
};

export default HomePage;
